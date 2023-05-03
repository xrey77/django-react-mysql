import React, { useState } from "react";
import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
});

export default function Mfa() {
    let idno = sessionStorage.getItem('USERID')
    let mail = sessionStorage.getItem('USERMAIL')

    const [otp, setOtp] = useState("");
    const [msg, setMsg] = useState("");

    const submitOtp = async (e: any) => {
        e.preventDefault();
        const data =JSON.stringify({id: idno, otpcode: otp, email: mail});
        await api.post('/api/validateotpcode/', data)
            .then(res => {
                if (res.data.statuscode === 200) {
                    setMsg(res.data.message);
                    sessionStorage.setItem('USERNAME', res.data.username)                 
                    window.setTimeout(() => {
                        window.location.reload();
                    }, 3000);

                } else {
                    setMsg(res.data.message);
                    window.setTimeout(() => {
                        setOtp("");
                        setMsg("");
                    }, 3000);
                }
            }, (error) => {
               setMsg(error.message);
            });                
    }

    const closeModal = (e: any) => {
        e.preventDefault();
        sessionStorage.removeItem('USERID');
        sessionStorage.removeItem('USERNAME');
        sessionStorage.removeItem('TOKEN');
        sessionStorage.removeItem('USERPIC');        
    }
    return (
        <div className="modal" id="mfaBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="mfaBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header bg-warning">
                <h1 className="modal-title fs-5 text-white" id="mfaBackdropLabel">2-Factor Authentication</h1>
                <button onClick={closeModal} type="button" className="btn-close btn-close-white"  data-bs-dismiss="modal" aria-label="Close"/>
            </div>
            <div className="modal-body">
    
                <form onSubmit={submitOtp}>
                    <div className="mb-3">
                        <input type="number" className="form-control" placeholder="enter 6 digits OTP Code" value={otp} onChange={e => setOtp(e.target.value)} autoComplete="off" required />
                    </div>
                    <button type="submit" className="btn btn-warning text-white">submit</button>
                </form>
                
            </div>
            <div className="modal-footer">
                <div id="msg" className="w-100 text-center msg-fsize text-danger">{ msg }</div>
            </div>
            </div>
        </div>
        </div> 
    );
}