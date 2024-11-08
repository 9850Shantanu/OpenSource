import React from "react";
import { useState } from "react";
import Login from "../src/components/account/Login"
import DataProvider from "./context/DataProvider";
import Home from "./components/account/Home";
import { Navigate, Outlet, Route,Routes } from "react-router-dom";
import CreatePost from "./components/create/CreatePost";
import Header from "./components/header/Header";
import DetailView from "./components/details/DetailView";
import Update from "./components/create/Update";

const PrivateRoute=(props)=>
{
  return props.bc?
  <>
     <Header/>
     <Outlet/>
  </>
  :<Navigate replace to='/login'/>
}


function App() {
const [bc,setbc]=useState(false);
console.log(bc);
  return (
    <div >
      <DataProvider>
    
        <div style={{marginTop:64}}>

          <Routes>

            <Route path='/login' element={<Login  setbc={setbc} bc={bc}/>} ></Route>
           
            <Route path="/" element={<PrivateRoute bc={bc} setbc={setbc}/>}>
                       <Route path="/" element={<Home />}></Route>
            </Route>
            <Route path="/create" element={<PrivateRoute bc={bc} setbc={setbc}/>}>
                       <Route path="/create" element={<CreatePost />}></Route>
            </Route>
            <Route path="/details/:id" element={<PrivateRoute bc={bc} setbc={setbc}/>}>
                       <Route path="/details/:id" element={<DetailView />}></Route>
            </Route>
            <Route path="/update/:id" element={<PrivateRoute bc={bc} setbc={setbc}/>}>
                       <Route path="/update/:id" element={<Update/>}></Route>
            </Route>
           

          </Routes>
        </div>
      </DataProvider>

    </div>
  )
}

export default App;
