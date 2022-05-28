import React from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './AuthorisationMenu.css'

const AuthorisationMenu = ({active,closeAuthoMenu,authorize,loginValue,setLoginValue,setPasswordValue,passwordValue})=>{

    const changeLoginValue = (oEvent)=>{
        setLoginValue(oEvent.target.value)
    }
    const changePasswordValue = (oEvent)=>{
        setPasswordValue(oEvent.target.value)
    }

    return(
        <>
        {active &&
        <div className='backDrop'>
         <div id='mainAthoMenu'>
             <h2 style={{'marginBottom':'5%'}} >Вход в систему</h2>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  value={loginValue}
                  sx={{'background-color':'#909090'}}
                  onChange={changeLoginValue}
                  label="Логин"
                  />
                <TextField
                  sx={{'background-color':'#909090'}}
                  label="Пароль"
                  value={passwordValue}
                  onChange={changePasswordValue}
                  type="password"
                  />
              </div>
              <div style={{'display':'flex',"width":'75%','justifyContent':'space-evenly','marginTop':'10%','marginLeft':'13%'}}>
              <Button onClick={authorize} variant="contained">Войти</Button>
              <Button onClick={closeAuthoMenu} color="error" variant="contained">Отменить</Button>
              </div>
            </Box>
        </div>
    </div>
    }
        </>
    )
}

export default AuthorisationMenu