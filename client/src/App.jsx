import Api from './Api';

import Logingpage from './components/Loginpage';

import Newaccoutn from './components/NewAccount';

import Home from './components/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'


function App() {


  return (
    <>
  <Routes>

     <Route path = '/Home' element={<Home/>}/>


    <Route path = '/' element={<Logingpage/>}/>



    <Route path = '/signIn' element={<Newaccoutn/>}/>

  </Routes>


    </>
  )
}

export default App
