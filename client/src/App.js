import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
import './App.css'; 

import { AuthProvider } from './context/auth'
import AuthRoute from './util/authRoute';
import Home from './pages/Home';

import Login from './pages/Login';

import Register from './pages/Register';
import SinglePost from './pages/SinglePost'
import MenuBar from './MenuBar';

function App() {
  return (
    <AuthProvider className="container">
    <Router>
      <Container className="container">
        <MenuBar/>
        
        <Routes>
          
          <Route exact path= "/" element = { <Home/>} />
          <Route exact path="/login" element={ 
              <AuthRoute>
                <Login />
              </AuthRoute>} />
          <Route exact path="/register" element={
              <AuthRoute>
                <Register />
              </AuthRoute>
          
          } />
          <Route exact path="/posts/:postId" element = {
             <SinglePost/>}/>
        </Routes>
      </Container>   
    </Router>
    </AuthProvider>
  );
}

export default App;
