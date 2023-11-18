import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAndRegister from './components/LoginAndRegister';
import Dashboard from './components/DashBoard';
import './App.css'

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<LoginAndRegister />}
				/>
				<Route
					path='/dashboard'
					element={<Dashboard />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
