import React from 'react';
import './App.css';
import {BrowserRouter,Switch, Route, Redirect} from 'react-router-dom';
import  {Home}  from './pages/Home/Home';
import { Navigation } from './Components/shared/Navigation/Navigation';
import { Authenticate } from './pages/Authenticate/Authenticate';
import { Activate } from './pages/Activate/Activate';
import { Rooms } from './pages/Rooms/Rooms';

const isAuth = false;
const user = {
  activated: false}

function App() {
  return (
    <BrowserRouter>
    <Navigation/>
    <Switch>
            
            <GuestRoute path="/authenticate" >
              <Authenticate/>
            </GuestRoute>
            <SemiProtectedRoute path = "/activate">
                <Activate/>
            </SemiProtectedRoute>
            <ProtectedRoute path = "/rooms">
              <Rooms/>
            </ProtectedRoute>
            <GuestRoute path="/" exact>
                <Home/>
            </GuestRoute>
        </Switch>
    </BrowserRouter>
  );
}

const GuestRoute = ({children, ...rest}) => {
  return (
    <Route {...rest}
      render={({location})=>{
      return (isAuth ? 
          (<Redirect to={
              {
                pathname: '/rooms',
                state: {from: location}
              }
            }/>
          ) :
          (children)
        )
      }}>
    </Route>
  );
}
const SemiProtectedRoute = ({children, ...rest}) => {
 return(
   <Route {...rest}
   render = {({location})=>{
    return (
      !isAuth ? (
        <Redirect to={{
          pathname:'/',
          state:{from : location}
        }}>
        </Redirect>
      ):(
        isAuth && !user.activated ? (
          children
        ) : (
          <Redirect
          to={{
            pathname:'/rooms',
            state:{from : location}
          }}></Redirect>
        )
      )
    )
   }}
   
   ></Route>
 )
}

const ProtectedRoute = ({children, ...rest}) => {
  return(
    <Route {...rest}
    render = {({location})=>{
     return (
       !isAuth ? (
         <Redirect to={{
           pathname:'/',
           state:{from : location}
         }}>
 
         </Redirect>
 
       ):(
         isAuth && !user.activated ? (
          <Redirect
          to={{
            pathname:'/activate',
            state:{from : location}
          }}></Redirect>
         ) : (
           children
         )
 
       )
     )
    }}
    
    ></Route>
  )
 }
export default App;
