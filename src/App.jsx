import { useEffect,React } from 'react';
import { Header } from './components/Header';
import { GamePage } from './components/games/GamePage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { AuthForm } from './components/authentication/AuthForm';
import { Home } from './components/pages/Home';
import { GameList } from './components/list/GameList';
import { UserList } from './components/list/UserList';
import { UserProvider } from './components/context/UserProvider';
import { ListFrame } from './components/list/ListFrame';
import { Profile } from './components/pages/Profile';
import { TestList } from './components/list/TestList';

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
          <Route path="/games" element={
              <ListFrame parameter={<GameList/>}/>
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
            <ListFrame parameter={<TestList/>}/> 
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