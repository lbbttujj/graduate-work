import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './RegistrateMenu.css'

const RegistrateMenu = ({active, closeRegistrateMenu, passwordValue, setLoginValue, loginValue,setPasswordValue,registrating})=>{

    const [isPasswordCoincidense,setIsPasswordCoincidense] = useState(false)

    const changeLoginValue = (oEvent)=>{
        setLoginValue(oEvent.target.value)
    }
    const changePasswordValue = (oEvent)=>{
        setPasswordValue(oEvent.target.value)
    }
    const checkRepeat = (oEvent)=>{
        if(oEvent.target.value === passwordValue){
            setIsPasswordCoincidense(true)
        }else{
            setIsPasswordCoincidense(false)
        }
    }
    const checkRegistrateAbility = ()=>{
        debugger
        if(isPasswordCoincidense){
           registrating()
        }else{
            alert('Пароли не совпадают')
        }
        

    }
    return(
        <>
          {active &&
        <div className='backDrop'>
         <div id='mainRegistrateMenu'>
             <h2 style={{'marginBottom':'5%'}}>Регистрация</h2>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch',bgcolor:'#909090' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  value={loginValue}
                  onChange={changeLoginValue}
                  label="Логин"
                  />
                <TextField
                  label="Пароль"
                  value={passwordValue}
                  onChange={changePasswordValue}
                  type="password"
                  />
                <TextField
                  error={!isPasswordCoincidense}
                  label="Повтор пароля"
                  onChange={checkRepeat}
                  type="password"
                  />
              </div>
              <div style={{'display':'flex',"width":'75%','justifyContent':'space-evenly','marginTop':'10%','marginLeft':'13%'}}>
              <Button onClick={checkRegistrateAbility} variant="contained">Зарегистрироваться</Button>
              <Button onClick={closeRegistrateMenu} color="error" variant="contained">Отменить</Button>
              </div>
            </Box>
        </div>
    </div>
    }
        </>
    )
}

export default RegistrateMenu