// import React from 'react';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './home'
import Aboutus from './about';
import ContactUs from './contact';
import Profile from './profile';
import Layout from './Layout/layout';
import SelfService from './products/self_service';
import AutomateTeller from './products/ats';
import ATMParts from './products/atm_parts';

function Xrouters() {
    return (
      <Layout>
       <Routes>
          <Route path='/' element={<Home />} />  
          <Route path='/about' element={<Aboutus />} />
           <Route path='/contact' element={<ContactUs />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/productlist' element={<SelfService />} />
          <Route path='/ats' element={<AutomateTeller />} />
          <Route path='/atmparts' element={<ATMParts />} />
        </Routes>
      </Layout>      
    );
}
export default Xrouters;