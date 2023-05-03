import React, {ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import QRCode from 'qrcode'

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
});

export default function Profile() {
    let idno = sessionStorage.getItem("USERID");
    let token = sessionStorage.getItem("TOKEN");
    let usermail = sessionStorage.getItem("USERMAIL");
    let fullName = sessionStorage.getItem("USERFULLNAME");     
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [msg, setMsg] = useState("");
    const [newpwd, setNewpwd] = useState("");
    const [confpwd, setConfpwd] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [chgpwd, setChgpwd] = useState(false);
    const [totp, setTotp] = useState(false);
    const [qrcodeurl, setQrcodeurl] = useState("");
    const [userpic, setUserpic] = useState("");

    const activateOTP = async (e: any) => {
        e.preventDefault();
        const data =JSON.stringify({id: idno, isactivated: 'Y', email: usermail, fullname: fullName});
        await api.put('/api/activateotp/',data, {headers: {
            Authorization: `Bearer ${token}`}})
            .then(res => {
                if (res.data.statuscode === 200) {                                       
                    setMsg(res.data.message);
                } else {
                    setMsg(res.data.message);
                }
                window.setTimeout(() => {
                    window.location.reload();
                }, 3000);

            }, (error) => {
                setMsg(error);
                window.setTimeout(() => {
                    setMsg("");
                }, 3000);
            });        
    }

    const deactivateOTP = async (e: any) => {
        e.preventDefault();
        const data =JSON.stringify({id: idno, isactivated: 'N', email: usermail});
        await api.put('/api/activateotp/',data, {headers: {
            Authorization: `Bearer ${token}`}})
            .then(res => {
                if (res.data.statuscode === 200) {
                    setMsg(res.data.message);
                } else {
                    setMsg(res.data.message);
                }
                window.setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }, (error) => {
                setMsg(error);
                window.setTimeout(() => {
                    setMsg("");
                }, 3000);

            });        
    }    

    $("#chgpwdcb").change(function() {
        if ($('#chgpwdcb').is(":checked")) {
            setTotp(false);
            setChgpwd(true);
            $('#otpcb').prop('checked', false);
            $('#chgpwdcb').prop('checked', true);
        } else {
            setChgpwd(false);
            setNewpwd("");
            $('#chgpwdcb').prop('checked', false);
        }        
    });

    $("#otpcb").change(function() {
        if ($('#otpcb').is(":checked")) {
            setChgpwd(false);
            setTotp(true);
            $('#chgpwdcb').prop('checked', false);
            $('#otpcb').prop('checked', true);
        } else {
            setTotp(false);
            $('#otpcb').prop('checked', false);
        }        
    });

    useEffect(() => {
        const fetchProfile = async () => {
             await api.get(`/api/getuserbyid?id=${idno}`, {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then(async res => {
                    if (res.data.statuscode === 200) {
                        setFname(res.data.firstname);
                        setLname(res.data.lastname);
                        setEmail(res.data.email);
                        setMobile(res.data.mobileno);
                        setUserpic(res.data.picture);
                        if (res.data.qrcodeurl) {
                            QRCode.toDataURL(res.data.qrcodeurl, { errorCorrectionLevel: 'H' }, function (err, url) {
                                setQrcodeurl(url);
                              })
                        } else {
                            setQrcodeurl("");
                        }                        
                    } else {
                        setMsg(res.data.message);
                    }
            }, (error) => {
                setMsg(error);
            });        
        }        
        fetchProfile();
    },[])

    const submitProfile = async (e: any) => {
        e.preventDefault();
        const data =JSON.stringify({
            id: idno,
            lastname: lname,
            firstname: fname,
            email: usermail,
            mobileno: mobile,
            password: newpwd});

        await api.put('/api/updateuserpassword/',data, {headers: {
            Authorization: `Bearer ${token}`}})
            .then(res => {
                if (res.data.statuscode === 200) {
                    setMsg(res.data.message);
                } else {
                    setMsg(res.data.message);
                }
            }, (error) => {
                setMsg(error);
            });        
    }

    const chagePicture = async (e: any) => {
        e.preventDefault();
        $("#pic").attr('src',URL.createObjectURL(e.target.files[0]));

        let xfile = e.target.files[0].name
        let start = xfile.length;
        const lastDot = xfile.lastIndexOf('.');
        const ext = xfile.substring(start, lastDot);       
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("ext", ext);
        formData.append("id", `${idno}`);
        formData.append("usermail", `${usermail}`);        
        api.put('/api/uploaduserpicture/',formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }  
        })
            .then(res => {
                if (res.data.statuscode === 200) {
                    setMsg(res.data.message);
                } else {
                    setMsg(res.data.message);
                }
            }, (error) => {
                setMsg(error);
        });        
    }

    return (
        <>
        <div className="card profile-card">
            <div className="card-header bg-primary">
            <h5 className="text-white">User Profile ID No. { idno }</h5>
            </div>
            <div className="card-body">
                <form onSubmit={submitProfile} encType="multipart/form-data">
                <div className="row">
                    <div className="col col-9">
                        <div className="mb-3">
                            <label htmlFor="fname" className="form-label fontsize-12">First Name</label>
                            <input type="text" className="form-control" id="fname" value={fname} onChange={e => setFname(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fname" className="form-label fontsize-12">Last Name</label>
                            <input type="text" className="form-control" id="lname" value={lname} onChange={e => setLname(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="col">
                        <img id="pic" src={userpic} className="user" alt=""/>
                        <input onChange={e => chagePicture(e)} className="form-control form-control-sm file-top" id="userpic" name="userpic" type="file" accept=".jpeg,.jpg,.png,image/jpeg,image/png"/>
        
                    </div>
                </div>
        
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="fname" className="form-label fontsize-12">Email Address</label>
                            <input type="email" className="form-control" id="emailadd" value={email} onChange={e => setEmail(e.target.value)} readOnly/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="fname" className="form-label fontsize-12">Mobile No.</label>
                            <input type="text" className="form-control" id="mobileno" value={mobile} onChange={e => setMobile(e.target.value)} required/>
                        </div>
                    </div>
                </div>
        
                <div className="row">
                    <div className="col">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="chgpwdcb"/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Change Password
                            </label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="otpcb"/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                2-Factor Authenticator
                            </label>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col">
                        
                        {/* CHANGE PASSWORD */}

                        {
                          chgpwd !== false ?
                              <>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="newpwd" value={newpwd} onChange={e => setNewpwd(e.target.value)} placeholder="New Password"/>
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="confpwd" value={confpwd} onChange={e => setConfpwd(e.target.value)} placeholder="Confirm New Password"/>
                                </div>
                              </>
                            : null
                        }

                        {
                          totp !== false ? 
                            qrcodeurl != "" ?
                                <img className="qrcode1" src={qrcodeurl} alt="QRCODE"/> 
                            :
                                <img className="qrcode2" src="http://127.0.0.1:8000/assets/images/qrcode.png" alt="QRCODE"/> 
 
                          : null
                        }
                    </div>
                    <div className="col">

                    {/* 2-FACTOR AUTHENTICATION */}
                    {
                        totp !== false ?
                            <>
                            <p className="qr-fontsize">Please install Microsoft or Google Authenticator Application from your Mobile Phone, after installation, click Enable Button below and Scan QRCODE using your Authenticator Application, everytime you Log-In to this Web Application, you have to open your Mobile Authenticator and enter OTP code from your Mobile Authenticator.</p>
                            <button onClick={activateOTP} className="btn btn-success">Enable</button>
                            <button onClick={deactivateOTP} className="btn btn-secondary ml">Disable</button>
                            </>
                        : null
                    }
                    </div>
        
                </div>
        
                <button type="submit" className="btn btn-primary save">save</button>
            </form>
        </div>
        <div className="card-footer text-danger msg-fsize">{ msg }</div>
      </div>
      <br/><br/>
      </>
    );
}