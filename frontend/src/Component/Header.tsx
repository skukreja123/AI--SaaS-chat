import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import { Logo } from './shared/Logo'
import { useAuth } from '../Context/AuthContext'
import { Navigate } from './shared/Navigate'

export const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{bgcolor:"transparent",position:"static", boxShadow:"none"}}>
        <Toolbar sx={{display:"flex"}}>
            <Logo/>
            <div>
              {auth?.isLoggedIn ? <> 
              <Navigate bg='#00fffc' to='/chat' text='Go to chat' textColor='black'/>
              <Navigate bg='#51538f' textColor='white' to='/' text='Logout' onClick={auth.logout}/>
              </> : 
              <>
              <Navigate bg='#00fffc' to='/login' text='Login' textColor='black'/>
              <Navigate bg='#51538f' textColor='white' to='/signup' text='SignUp' />
              </> }
            </div>
        </Toolbar>
    </AppBar>
  )
}
