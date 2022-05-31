import React, {useEffect, useState} from 'react'
import { slide as Menu } from 'react-burger-menu'
import axios from "axios";
import Authrosiation from './utils/Authrosiation'
import AuthorisationMenu from './AuthorisationMenu'
import RegistrateMenu from './RegistrateMenu';
import { useDispatch, useSelector } from 'react-redux';
import { rewriteTrackMemomory } from '../store/sequencerSlice';
import { rewriteTraksFromSave } from './utils/rewriteTraksFromSave';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import deleteTrackImg from '../data/img/deleteTrack.png' 
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
import './BurgerMenu.css'

const BurgerMenu = ()=>{

  const [authoMenuActive,setAuthoMenuActive] = useState(false)
  const [registrateMenuActive,setRegistrateMenuActive] = useState(false)
  const [loginValue,setLoginValue] = useState('')
  const [username,setUsername] = useState('')
  const [passwordValue,setPasswordValue] = useState('')
  const [isAuthorise,setAuthorise] = useState(false)
  const [nameSavedTracks, setNameSavedTracks] = useState('')
  const trackMemory = useSelector(state=>state.sequencer.trackMemory)  // Все данные о всех субтреках
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch()

  const handleClick = () => {
    setOpen(!open);
  };

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


      axios.get('http://localhost:8000/getTracks',{
        headers:{
          authorisation: 'Bearer ' + token //the token is a variable which holds the token
        }
      })
      .then((serverResponse)=>{
        console.log(serverResponse)
        setNameSavedTracks(serverResponse.data)
        
      })
      .catch((error)=>{
        console.log(error)
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


  const exportTrack = async ()=>{

      const url = sessionStorage.getItem('urlBlobTrack')
      const a = document.createElement('a')
      const name = prompt('Введите название трека ')
      debugger
      a.href=url
      a.target='target="_blank"'
      a.download=`${name}.weba`
      a.click()
  } 

  const saveCurrentTrack = async ()=>{
   const trackMemoryToBD = JSON.stringify(trackMemory)
   const nameSave = prompt('Введите название записи')
    const data = {
        "name":nameSave,
        "content":trackMemoryToBD,
        "username":username
    }
    await axios.post("http://localhost:8000/saveTracks",data)
          .then((serverResponse)=>{
            console.log(serverResponse)
          })
          .catch((error)=>{
              console.log(error)
          })


  }

  const chooseSavedTrack = async (oEvent)=>{
    const nametrack = oEvent.target.textContent

    await axios.get("http://localhost:8000/currentTrack",{
      headers:{
        nametrack:nametrack
      }
    })
    .then((serverResponse)=>{
      const trackMemory = JSON.parse(serverResponse.data)
      dispatch(rewriteTrackMemomory(trackMemory))
      rewriteTraksFromSave(trackMemory)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const deleteCurrentSavedTrack = (oEvent)=>{
    debugger
  }


    return (
        <>
        <div id='burgerMenu'>
         <Menu right>
           {
            isAuthorise &&
            <>
              <h3>{username}</h3>
              <p id="home" className="menu-item" onClick={saveCurrentTrack} >Сохранить запись</p>
              {/* <p id="contact" className="menu-item" >Просмотр записей</p> */}
             {/* {
               nameSavedTracks &&
               nameSavedTracks.map((el)=>{
                return <p onClick={chooseSavedTrack} className='nameSavedTrack'>{el}</p>
               })
             } */}
             <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: '#373a47' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
       
        <ListItemText primary="Просмотр записей" />
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
               nameSavedTracks &&
               nameSavedTracks.map((el)=>{
                return <div style={{'position':'relative'}} >
                   <p onClick={chooseSavedTrack} className='nameSavedTrack'>{el}</p>
                    <img onClick={deleteCurrentSavedTrack} className='deleteImgFormSavedList' alt=''height={'20px'}  width={'20px'}  src={deleteTrackImg}></img>
                    </div>
               })
             }
        </List>
      </Collapse>
    </List>
            </>
          }
        
            <p id="about" onClick={exportTrack} className="menu-item">Экспортировать запись</p>
       
          {
            isAuthorise 
            ?<p style={{'fontSize':'20px'}} className="menu-item" onClick={exit} >Выход</p>
            
            :<>
            <p style={{'fontSize':'20px'}} className="menu-item" onClick={openAuthoMenu} >Вход в аккаунт</p> 
            <p style={{'fontSize':'20px'}} className="menu-item" onClick={openRegistrateMenu} >Регистрация</p>
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