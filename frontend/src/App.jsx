import React from "react";

import Login from "./pages/login/Login"
import Home from "./pages/interface/Home"
import Signup from "./pages/signup/Signup"
import {Routes, Route} from 'react-router-dom'
import { Toaster } from "react-hot-toast";




function App() {

	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element = {<Home/>} />
				<Route path='/login' element = {<Login/>} />
				<Route path='/signup' element = {<Signup/>} />
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