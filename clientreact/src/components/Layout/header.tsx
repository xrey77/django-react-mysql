import React from 'react';  
import { Link } from 'react-router-dom';
import Login from '../login';
import Register from '../register';

export default function Header() {
    let username = sessionStorage.getItem('USERNAME');

    const logout = (e: any) => {
        sessionStorage.removeItem('USERID');
        sessionStorage.removeItem('USERNAME');
        sessionStorage.removeItem('TOKEN');
        sessionStorage.removeItem('USERPIC');        
        window.location.href = "/";
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">            
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img className="logo" src="http://127.0.0.1:8000/assets/images/doha_logo.png" alt='' />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon text"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/about">About Us</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a href='#/' className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Services
                        </a>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="#">ATM Monintoring</Link></li>
                        <li><Link className="dropdown-item" to="#">ATM Support 24/7</Link></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><Link className="dropdown-item" to="#">Software Banking Solutions</Link></li>
                    </ul>
                    </li>
                    <li className="nav-item dropdown">
                    <a href='#/' className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Products
                    </a>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/productlist">Self Service Terminals</Link></li>
                        <li><Link className="dropdown-item" to="/ats">Automated Teller Safe</Link></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><Link className="dropdown-item" to="/atmparts">ATM Parts</Link></li>
                    </ul>
                    </li>
                    <li className="nav-item">
                    <Link to="/contact" className="nav-link">Contact Us</Link>
                    </li>
                </ul>
                <ul className="navbar-nav mr-auto">
                {
                   username === null ? 
                   <> 
                    <li className="nav-item">
                        <a href="#/" className="nav-link" data-bs-toggle="modal" data-bs-target="#loginBackdrop">LogIn</a>
                    </li>
                    <li className="nav-item">
                        <a href="#/" className="nav-link" data-bs-toggle="modal" data-bs-target="#registerBackdrop">Register</a>
                    </li>
                    </>
                : 
                    <li className="nav-item dropdown">
                    <a href='#/' className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {username}
                    </a>
                    <ul className="dropdown-menu">
                        <li><a onClick={logout} className="dropdown-item" href="#/">LogOut</a></li>
                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><Link className="dropdown-item" to="#">Messenger</Link></li>
                    </ul>
                    </li>

                }  

                </ul>
                </div>
            </div>
            </nav>

{/* OFF CANVASS */}
{/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
  Toggle static offcanvas
</button> */}
{/* <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel"> */}

<div className="offcanvas offcanvas-end" data-bs-scroll="true" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
  <div className="offcanvas-header bg-primary">
    <h5 className="offcanvas-title text-white" id="staticBackdropLabel">DRAWER MENU</h5>
    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">

  <nav className="nav flex-column">
    <li className="nav-item" data-bs-dismiss="offcanvas">
        <Link className="nav-link active" aria-current="page" to="/about">About Us</Link>
    </li>    
    <li className="nav-item dropdown">
    <a href='#/' className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Services
    </a>
    <ul className="dropdown-menu">
        <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" data-bs-dismiss="offcanvas" to="#">ATM Monintoring</Link></li>
        <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to="#">ATM Support 24/7</Link></li>
        <li><hr className="dropdown-divider"/></li>
        <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to="#">Software Banking Solutions</Link></li>
    </ul>
    </li>
    <li className="nav-item dropdown">
    <a href='#/' className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Products
    </a>
    <ul className="dropdown-menu">
        <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to="/productlist">Self Service Terminals</Link></li>
        <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to="/ats">Automated Teller Safe</Link></li>
        <li><hr className="dropdown-divider"/></li>
        <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to="/atmparts">ATM Parts</Link></li>
    </ul>
    </li>
    <li className="nav-item" data-bs-dismiss="offcanvas">
        <Link to="/contact" className="nav-link">Contact Us</Link>
    </li>
    {
                   username === null ? 
                   <> 
                    <li className="nav-item" data-bs-dismiss="offcanvas">
                        <a href="#/" className="nav-link" data-bs-toggle="modal" data-bs-target="#loginBackdrop">LogIn</a>
                    </li>
                    <li className="nav-item" data-bs-dismiss="offcanvas">
                        <a href="#/" className="nav-link" data-bs-toggle="modal" data-bs-target="#registerBackdrop">Register</a>
                    </li>
                    </>
                : 
                    <li className="nav-item dropdown">
                    <a href='#/' className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {username}
                    </a>
                    <ul className="dropdown-menu">
                        <li data-bs-dismiss="offcanvas"><a onClick={logout} className="dropdown-item" href="#/">LogOut</a></li>
                        <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to="/profile">Profile</Link></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to="#">Messenger</Link></li>
                    </ul>
                    </li>

                }  


  </nav>

  </div>
</div>

            <Login/>
            <Register/>   
        </>
    );
}