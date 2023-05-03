# from imaplib import _Authenticator
import os
from email import utils
from django.utils import timezone
from django.db import IntegrityError
from PIL import Image
import qrcode
import base64
import pyotp
import time
# from users.models import Users
from profiles.models import Profiles
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password, check_password
from knox.models import AuthToken
from django.contrib.auth import get_user_model
from rest_framework import generics, authentication, permissions


# @api_view(['POST'])
# def userLogin(request):
#     try:
#         usrname = request.data.get('username')    
#         user = Profile.objects.get(username=usrname);
#         if (user.username != None):        
#             plain = request.data.get('password')            
#             hash =  user.password
#             if check_password(plain, hash, setter=None, preferred='default'):
#                 return Response({'statuscode': 200, 'message': 'test Ok.'})            
#             else:                
#                 return Response({'statuscode': 404, 'message': 'Invalid Password.'})              
#     except Exception as e:
#             return Response({'statuscode': 404, 'message': 'Username not found, please register first.'})

@api_view(['POST'])
def userLogin(request):    
    try:
        usrname = request.data.get('username')
        pwd = request.data.get('password')
        user = User.objects.get(username=usrname)        
        if (user.username is not None):
            if user.is_active:
                hash =  user.password            
                if check_password(pwd, hash):
                    user.last_login = time = timezone.now()
                    user.save(update_fields=['last_login'])

                    token = AuthToken.objects.create(user)[1]
                    request.session["TOKEN"] = token
                    profiles = Profiles.objects.filter(email=user.email).first()                    
                    return Response({
                        'statuscode': 200,
                        'message': 'Login Successfull.',
                        'userid':user.id,
                        'username': usrname,
                        'email': user.email,
                        'firstname': user.first_name,
                        'lastname': user.last_name,
                        'picture':profiles.picture,
                        'qrcodeurl': profiles.qrcodeurl,
                        'token': token}) 
                else:                
                    return Response({'statuscode': 404, 'message': 'Invalid Password.'})
            else:
                    return Response({'statuscode': 404, 'message': 'Please activate your account first.'})                
    except Exception as e:
            return Response({'statuscode': 404, 'message': 'Username not found, please register first.'})



        
# @api_view(['POST'])
# def userRegistration(request):
#     user = Profile()    
#     user.lastname = request.data.get('lastname')
#     user.firstname = request.data.get('firstname')
#     user.email = request.data.get('email')
#     user.mobileno = request.data.get('mobileno')
#     user.username = request.data.get('username')

#     user.profilepic = 'http://127.0.0.1:8000/assets/users/user.jpg'

#     pwd = request.data.get('password')
#     hash =make_password(pwd, salt=None, hasher='default')
#     user.password = hash
#     user.save()
#     usersdata = {'statuscode': 200, 'message': 'Registration Successfull.'}
#     return Response(usersdata)

@api_view(['POST'])
def userRegistration(request):
    fname = request.data.get('firstname')
    lname = request.data.get('lastname')   
    mail = request.data.get('email')
    mobile = request.data.get('mobileno')   
    usrname = request.data.get('username')
    pwd = request.data.get('password')
    if User.objects.filter(email=mail).first() is not None:
        return Response({'statuscode':404, 'message': 'Email Address has already taken.'})
    if User.objects.filter(username=usrname).first() is not None:
        return Response({'statuscode':404, 'message': 'Username has already taken.'})
    User.objects.create_user(usrname, mail, pwd, first_name=fname, last_name=lname)
    secret = pyotp.random_base32()
    picture = 'http://127.0.0.1:8000/assets/users/user.jpg'
    profile = Profiles()
    profile.email = mail
    profile.mobileno = mobile
    profile.picture = picture
    profile.secretkey=secret
    profile.save()                                                                
    return Response({'statuscode': 200, 'message': 'Registration Successfull.'})
        
@api_view(['GET'])
def getUsers(request):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    login_token = request.session['TOKEN']
    try:
        token = request.META['HTTP_AUTHORIZATION'].split(' ', 1)
        if token[1] == login_token:
            User = get_user_model()
            users = User.objects.values()
            return Response(users)        
        else:
            return Response({'statuscode': 401, 'message': 'Un-Authroized Access.'})        
    except Exception as e:
        return Response({'statuscode': 401, 'message': 'Access Forbidden.'})                
        
        
@api_view(['GET'])
def getUserbyid(request):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    login_token = request.session['TOKEN']
    try:
        token = request.META['HTTP_AUTHORIZATION'].split(' ', 1)
        if token[1] == login_token:        
            idno = request.query_params.get('id')
            User = get_user_model()
            
            users = User.objects.filter(id=idno).values()
            if users:
                profile = Profiles.objects.get(email=users[0]['email'])
                data = {'userid': users[0]['id'],'firstname': users[0]['first_name'],
                        'lastname': users[0]['last_name'],'email': users[0]['email'],
                        'picture': profile.picture,'mobileno': profile.mobileno,
                        'qrcodeurl': profile.qrcodeurl,'statuscode': 200}
                return Response(data)        
            else:
                return Response({'statuscode': 404, 'message': 'User ID not found.'}) 
    except Exception as e:
        return Response({'statuscode': 401, 'message': 'Access Forbidden.'})                
            
        
@api_view(['PUT'])
def updateUserpassword(request):
    idno = request.data.get('id')    
    fname = request.data.get('firstname')
    lname = request.data.get('lastname')
    email = request.data.get('email')
    mobile = request.data.get('mobileno')
    pwd = request.data.get('password')

    try:
        user = User.objects.get(id=idno)
        if user:
            if pwd != "": 
                user.set_password(pwd)
            user.last_name = lname
            user.first_name = fname
            user.save()
            profile = Profiles.objects.get(email=email)
            profile.mobileno = mobile
            profile.save()
            return Response({'statuscode': 200, 'message': 'Profile has been updated.'})
    except Exception as e:
            return Response({'statuscode': 404, 'message': e}) 
            
@api_view(['DELETE'])
def deleteUser(request):
    usrname = request.data.get('username')
    try:
        user = User.objects.get(username=usrname)
        if user:
            user.delete()
            return Response({'statuscode': 200, 'message': 'User ' + usrname + ' has been deleted.'})
    except Exception as e:
            return Response({'statuscode': 404, 'message': 'Username not found.'}) 
    
@api_view(['PUT'])
def uploadUserpicture(request):
    # idno = request.query_params.get('id')
    idno = request.data['id']
    file = request.data['file']
    ext = request.data['ext']
    email = request.data['usermail']
    
    # os.remove("assets/qrcodes/00"+idno+".png")

    img = Image.open(file)
    MAX_SIZE = (100, 100) 
    img.thumbnail(MAX_SIZE)
    path =  "assets/users/"
    newfile = "00"+idno + ext
    final_filepath = os.path.join(path, newfile)
    img.save(final_filepath)
    urlimg = "http://127.0.0.1:8000/assets/users/"+newfile
    profile = Profiles.objects.get(email=email)
    profile.picture=urlimg
    profile.save()    
    return Response({'statuscode': 200, 'message': 'ok.'})
    
@api_view(['PUT'])
def activateTOTP(request):
    idno = request.data.get('id') 
    email = request.data.get('email')
    isactivated = request.data.get('isactivated') 
    fullname = request.data.get('fullname')
    if isactivated == 'Y':
        # key = b"ForGodSoLovedtheworldthathegavedHisOnlySonThatWhoEverBelievesInHimWillHaveEternalLifeJohn3:16"
        # key=b"123123123djwkdhawjdk"
        # key = b"jesuslovesyoutsomuch"
        profile = Profiles.objects.get(email=email)
        if profile.secretkey is not None:
            TOTPSECRETKEY = profile.secretkey
            print("SECRET KEY:", TOTPSECRETKEY)
            # token = base64.b32encode(key)
            # qr_string = "otpauth://totp/DOHA BANK:" +  email  + "?secret=" + token.decode("utf-8") +"&issuer=DOHA BANK&algorithm=SHA1&digits=6&period=30"
            # img = qrcode.make(qr_string)
            # image_path = "assets/qrcodes/00"+idno+".png"
            # img.save(image_path)
            # urlqrcode="http://127.0.0.1:8000/assets/qrcodes/00"+idno + ".png"

            qrcode = pyotp.totp.TOTP(TOTPSECRETKEY).provisioning_uri(name=fullname, issuer_name="DOHA BANK")          
            profile.qrcodeurl = qrcode
            profile.save()    
            return Response({'statuscode': 200, 'message': 'enabled.'})
    else:
        # os.remove("assets/qrcodes/00"+idno+".png")
        profile = Profiles.objects.get(email=email)
        profile.qrcodeurl = None
        profile.save()    
        return Response({'statuscode': 200, 'message': 'disabled.'})
        
@api_view(['POST'])
def validateTOTP(request):    
    otpcode = request.data.get('otpcode')
    mail = request.data.get('email')
    user = User.objects.filter(email=mail).first()    
    profile = Profiles.objects.filter(email=mail).first()
    if profile.secretkey is not None:
        token = int(otpcode)
        totp = pyotp.TOTP(profile.secretkey)
        isOk = totp.verify(token)        
        if isOk:
            return Response({'statuscode': 200, 'message': 'OTP Code valid.','username': user.username})
        else:        
            return Response({'statuscode': 404, 'message': 'OTP Code not valid.'})
