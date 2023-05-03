
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Mfa from './mfa';
import $ from "jquery";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
})

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        setMsg("");
    }, []);

    const closeLogin = () => {
        setUsername("");
        setPassword("")
    }

    const submitLogin = async (e: any) =>{
        e.preventDefault();
        const data =JSON.stringify({
            username: username,
            password: password});
        await api.post('/api/signin/', data)
            .then(res => {
                if (res.data.statuscode === 200) {
                    setMsg(res.data.message);
                    if (res.data.qrcodeurl === null) {
                        sessionStorage.setItem('USERID', res.data.userid)
                        sessionStorage.setItem('USERNAME', res.data.username)
                        sessionStorage.setItem('TOKEN', res.data.token)
                        sessionStorage.setItem('USERPIC', res.data.picture)
                        sessionStorage.setItem('USERMAIL', res.data.email)
                        sessionStorage.setItem('USERFULLNAME', res.data.firstname + " " + res.data.lastname)
                        window.setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    } else {
                        $(document).ready(function(){
                            setMsg("");
                            $('#modalx')[0].click(); 
                            $('#otp')[0].click(); 
                        });
                        sessionStorage.setItem('USERID', res.data.userid)
                        sessionStorage.setItem('TOKEN', res.data.token)
                        sessionStorage.setItem('USERPIC', res.data.picture)
                        sessionStorage.setItem('USERMAIL', res.data.email)
                        sessionStorage.setItem('USERFULLNAME', res.data.firstname + " " + res.data.lastname)
                    }

                } else {
                    setMsg(res.data.message);
                    window.setTimeout(() => {
                        setMsg("");
                    }, 3000);
                }
            }, (error: any) => {
               setMsg(error.message);
            });                
    }

    return (
        <>
        <Mfa/>
        <div className="modal fade" id="loginBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="loginBackdropLabel" aria-hidden="true">
         <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header bg-danger">
                <h1 className="modal-title fs-5 text-white" id="loginBackdropLabel">User's Login</h1>
                <button onClick={closeLogin} id="modalx" type="button" className="btn-close btn-close-white"  data-bs-dismiss="modal" aria-label="Close"/>
            </div>
            <div className="modal-body">
    
                <form onSubmit={submitLogin}>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="enter username" value={username} onChange={e => setUsername(e.target.value)}  autoComplete="off" required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="enter password" value={password} onChange={e => setPassword(e.target.value)}  autoComplete="off" required />
                    </div>
                    <button type="submit" className="btn btn-danger">login</button>
                </form>
                
            </div>
            <div className="modal-footer">
                <div id="msg" className="w-100 text-center msg-fsize text-danger msg">{ msg }</div>
            </div>
            <button id="otp" type="button" className="btn btn-hide" data-bs-toggle="modal" data-bs-target="#mfaBackdrop"/>
    
            </div>
         </div>
        </div>
        </>
    );
}