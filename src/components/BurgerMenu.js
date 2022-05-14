import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import './BurgerMenu.css'

const BurgerMenu = ()=>{

    return (
        <>
        <div id='burgerMenu'>
         <Menu right>
        <p>Вход в аккаунт</p> 
        
        <a id="home" className="menu-item" href="/">Сохранить запись</a>
        <a id="about" className="menu-item" href="/about">Экспортировать запись</a>
        <a id="contact" className="menu-item" href="/contact">Просмотр записей</a>
        <a className="menu-item--small" href="">Дополнительные настройки</a>
      </Menu>
        </div>
        </>
    )
}   

export default BurgerMenu