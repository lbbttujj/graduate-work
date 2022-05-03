import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import './BurgerMenu.css'

const BurgerMenu = ()=>{

    return (
        <>
        <div id='burgerMenu'>
         <Menu right>
        <p>Войти</p> 
        
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a className="menu-item--small" href="">Settings</a>
      </Menu>
        </div>
        </>
    )
}   

export default BurgerMenu