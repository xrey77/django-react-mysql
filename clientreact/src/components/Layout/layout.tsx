import React from "react"
import Header from './header';
import Footer from './footer';

export default function Layout({children,}: {
    children: React.ReactNode;
}): any {
    return (
     <>
        <Header/>
            {children}
        <Footer/>
     </>
    )
}