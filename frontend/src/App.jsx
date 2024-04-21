import React from "react";
import "./App.css";
import Login from "./pages/login/Login"
import Home from "./pages/interface/Home"
import Signup from "./pages/signup/Signup"
import {Routes, Route, Navigate} from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import { userAuthContext } from "./context/AuthContext";



function App() {
	const{authUser} = userAuthContext();
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element = {authUser ? <Home/> : <Navigate to ={"/login"}/>} />
				<Route path='/login' element = {authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element = {authUser ? <Navigate to='/' /> : <Signup />} />
			</Routes>
			<Toaster/>
			
			{/* <h1> hd</h1> */}
			{/* <Login /> */}
			{/* <Home /> */}
			{/* <Signup /> */}
			{/* <h1>Hi</h1> */}

		</div>
	);
};

export default App;