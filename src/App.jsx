import React from 'react';
import { Header } from './components/Header';
import { GamePage } from './components/pages/GamePage';
import { GameList } from './components/pages/GameList';
import { UserList } from './components/UserList';
import { UserProvider } from './components/authentication/UserProvider';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Profile } from './components/authentication/Profile';
import { AuthForm } from './components/authentication/AuthForm';
import { useEffect } from 'react';
import { ListFrame } from './components/cards/ListFrame';
import { Home } from './components/pages/Home';

export function App() {
  useEffect(()=>{
    console.log('rendered')
  }
  )
  return (
    <Router>
      <UserProvider >
        <Header/>
        <Routes>
        <Route path="/" element={
            <Home/> 
          }/>
        <Route path="/users" element={
              <ListFrame parameter={<UserList/>}/>
          }/>
          <Route path="/capacitaciones" element={
              <h1>Pronto</h1>
          }/>
          <Route path="/login" element={
              <AuthForm/>
          }/>
          <Route path="/register" element={
            <AuthForm/>
          }/>
          <Route path="/profile" element={
              <Profile/>
          }/>
          <Route path="/game" element={
            <ListFrame parameter={<GameList/>}/> 
          }/>
          <Route path="/game/:gameName" element={
              <GamePage/>
          }/> 
          <Route path="/*" element={
            <h1>404 not found</h1>
        }/>
        </Routes>    
      </UserProvider>
    </Router>
  );
}