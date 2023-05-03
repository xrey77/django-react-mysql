import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
})

export default function Register() {
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")

    const closeRegistration = () => {
        setFname("");
        setLname("");
        setEmail("");
        setMobile("");
        setUsername("");
        setPassword("");
    }

    const submitRegister = async (e: any) => {
        e.preventDefault();
        const data =JSON.stringify({lastname: lname,firstname: fname,email: email, mobileno: mobile, username: username, password: password});
        await api.post(`/api/signup/`, data)
            .then(res => {
                if (res.data.statuscode === 200) {
                    setMsg(res.data.message);

                } else {
                    setMsg(res.data.message);
                    window.setTimeout(() => {
                        setMsg("");
                    }, 3000);
                }
            }, (error) => {
               setMsg(error.message);
               window.setTimeout(() => {
                setMsg("");
            }, 3000);

            });                
    }

    return (
        <div className="modal fade" id="registerBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="registerBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header bg-primary">
                <h1 className="modal-title fs-5 text-white" id="registerBackdropLabel">User's Registration</h1>
                <button onClick={closeRegistration} type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
    
                <form onSubmit={submitRegister}>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <input type="text" value={fname} onChange={e => setFname(e.target.value)} className="form-control" name="firstname" placeholder="enter First Name" autoComplete="off" required />
                            </div>
    
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <input type="text" value={lname} onChange={e => setLname(e.target.value)} className="form-control" name="lastname" placeholder="enter Last Name" autoComplete="off" required />
                            </div>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" name="emailadd" placeholder="enter First Email Address" autoComplete="off" required />
                            </div>
    
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} className="form-control" name="mobileno" placeholder="enter Mobile No." autoComplete="off" required />
                            </div>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control" name="username" placeholder="enter Username" autoComplete="off" required />
                            </div>
    
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" name="password" placeholder="enter Password" autoComplete="off" required />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">register</button>
                </form>
    
            </div>
            <div className="modal-footer">
                <div id="msg" className="w-100 text-center msg-fsize text-danger msg">{ msg }</div>
            </div>
            </div>
        </div>
        </div>    
    )
}