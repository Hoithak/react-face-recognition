import React from 'react';
import './Logo.css'
import logo from './Logo.svg'

const Logo = () => {
    return (
        <div>
            <img src={logo} alt="logo" />
        </div>
    );
}

export default Logo;