import React, {useEffect, useState} from 'react'
import { slide as Menu } from 'react-burger-menu'
import axios from "axios";
import Authrosiation from './utils/Authrosiation'
import AuthorisationMenu from './AuthorisationMenu'
import RegistrateMenu from './RegistrateMenu';
import './BurgerMenu.css'

const BurgerMenu = ()=>{

  const [authoMenuActive,setAuthoMenuActive] = useState(false)
  const [registrateMenuActive,setRegistrateMenuActive] = useState(false)
  const [loginValue,setLoginValue] = useState('')
  const [username,setUsername] = useState('')
  const [passwordValue,setPasswordValue] = useState('')
  const [isAuthorise,setAuthorise] = useState(false)

  useEffect(()=>{
    const token = sessionStorage.getItem('token')
    if(token){
      axios.get('http://localhost:8000/username', {
      headers: {
        authorisation: 'Bearer ' + token //the token is a variable which holds the token
   }
      }).then((serverResponse)=>{
                setUsername(serverResponse.data)
                setAuthorise(true)
             })
        .catch((error)=>{
          alert(error)
        })
    }
  },[])

const openAuthoMenu = ()=>{
  
    setAuthoMenuActive(true)
  

}
const openRegistrateMenu = ()=>{
  setRegistrateMenuActive(true)
}

const closeAuthoMenu = ()=>{
  setAuthoMenuActive(false)
}
const closeRegistrateMenu = ()=>{
  setRegistrateMenuActive(false)
}

const exit = ()=>{
  setAuthorise(false)
  setUsername('')
  sessionStorage.removeItem('token')
  //localhost
}

 const authorize= async()=>{
    const data = {"username":loginValue,"password":passwordValue}
    await axios.post("http://localhost:8000/login",data)
    .then(ServerResponse => {
      setAuthoMenuActive(false)
      setUsername(loginValue)
      setPasswordValue('')
      setLoginValue('')
      setAuthorise(true)
      //session storage
      sessionStorage.setItem('token',ServerResponse.data.token)
      
    })
    .catch(function (error) {
        alert('ошибка')
        setAuthorise(false)
        setPasswordValue('')
      setLoginValue('')
        console.log(error);
    });
  }

  const registrating = async ()=>{
    const data = {"username":loginValue,"password":passwordValue}
    await axios.post("http://localhost:8000/registration",data)
      .then(serverResponse=>{
        setRegistrateMenuActive(false);
        setUsername(loginValue)
        setPasswordValue('')
        setLoginValue('')
        setAuthorise(true)
        ///success
      })
      .catch((error)=>{
        alert('Ошибка')
        console.log(error)
        setAuthorise(false)
        setPasswordValue('')
        setLoginValue('')
      })
  }

    return (
        <>
        <div id='burgerMenu'>
         <Menu right>
           {
            isAuthorise &&
            <>
              <h3>{username}</h3>
              <a id="home" className="menu-item" href="/">Сохранить запись</a>
              <a id="contact" className="menu-item" href="/">Просмотр записей</a>
              <a className="menu-item--small" href="/">Дополнительные настройки</a>
            </>
          }
        
        <a id="about" className="menu-item" href="/">Экспортировать запись</a>
       
          {
            isAuthorise 
            ?<p style={{'cursor':'pointer','fontSize':'20px'}} onClick={exit} >Выход</p>
            
            :<>
            <p style={{'cursor':'pointer','fontSize':'20px'}} onClick={openAuthoMenu} >Вход в аккаунт</p> 
            <p style={{'cursor':'pointer','fontSize':'20px'}} onClick={openRegistrateMenu} >Регистрация</p>
            </>
          }
      </Menu>
        </div>
        <AuthorisationMenu
        active= {authoMenuActive}
        closeAuthoMenu = {closeAuthoMenu}
        authorize={authorize}
        setLoginValue = {setLoginValue}
        loginValue = {loginValue}
        passwordValue = {passwordValue}
        setPasswordValue = {setPasswordValue}
        />
        <RegistrateMenu
        active= {registrateMenuActive}
        closeRegistrateMenu = {closeRegistrateMenu}
        setLoginValue = {setLoginValue}
        loginValue = {loginValue}
        passwordValue = {passwordValue}
        registrating = {registrating}
        setPasswordValue = {setPasswordValue}
        />
        </>
    )
}   

export default BurgerMenu