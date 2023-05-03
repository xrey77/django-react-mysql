from django.urls import path
from . import views

urlpatterns = [
    path('api/signin/', views.userLogin, name="userlogin"),
    path('api/signup/', views.userRegistration, name="userregistration"),
    path('api/getusers/', views.getUsers, name="getusers"),  
    path('api/getuserbyid/', views.getUserbyid, name="getuserbyid"),          
    path('api/updateuserpassword/', views.updateUserpassword, name="updateuserpassword"),
    path('api/deleteuser/', views.deleteUser, name="deleteuser"),      
    path('api/uploaduserpicture/', views.uploadUserpicture, name="uploaduserpicture"),
    path('api/activateotp/', views.activateTOTP, name="activateotp"),
    path('api/validateotpcode/', views.validateTOTP, name="validateotpcode"),
]