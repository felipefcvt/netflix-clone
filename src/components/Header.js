import React from "react";
import './Header.css';

const Header = ( { black }) => {
    return(
        <header className = {black ? 'black' : ''}>
            <div className="header-logo">
                <a href="/">
                    <img src="/image/logo-netflix.png" alt="logo netflix" />
                </a>
            </div>
        </header>
    )
}

export default Header;