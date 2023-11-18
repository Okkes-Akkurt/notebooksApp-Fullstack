import React, { useState } from 'react';
import './loginAndRegister.css';
import axios from 'axios';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginAndRegister = () => {
	const [errors, setErrors] = useState({});
	const [register, setRegister] = useState(true);
	const [formdata, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});

	const validationSchema = yup.object({
		username: yup.string().required('Username is a required field'),
		email: yup.string().email('Invalid email address').required('Email is a required field'),
		password: yup.string().required('Password is a required field'),
	});

	const notify = () =>
		toast.success(`User registered successfully!!\nCheck your email and activate your account.`, {
			position: 'top-center',
			autoClose: false,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: false,
			theme: 'colored',
		});

	const handleChange = (e) => {
		setFormData({
			...formdata,
			[e.target.name]: e.target.value,
		});
	};

	const HandleSubmit = async (e) => {
		e.preventDefault();
		const path= register ? 'login':'register'

		try {
			await validationSchema.validate(formdata, { abortEarly: false });

			const response = await axios.post(`http://localhost:3060/${path}`, formdata);
			if (response) {
			notify();
        setTimeout(() => {
           setRegister(true)
				}, 4000);
			}
		} catch (err) {
			if (err.inner) {
				const newErrors = {};
				err.inner.forEach((error) => {
					newErrors[error.path] = error.message;
				});
				setErrors(newErrors);
			}
		}
	};

	return (
		<div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-1'>
			<ToastContainer />
			<div className='relative py-3 md:max-w-xl md:mx-auto md:w-2/3 xl:w-3/4'>
				<div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
				<div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
					{register ? (
						<div className='max-w-md mx-auto'>
							<div>
								<h1 className='text-2xl font-semibold'>Login</h1>
								<h1
									className='font-thin mb-0 mt-5 text-lg cursor-pointer'
									onClick={() => setRegister(false)}>
									If you don't have an account,{' '}
									<span className='text-green-500 font-extralight'>Sign up</span>
								</h1>
							</div>
							<div className='divide-y divide-gray-200'>
								<div className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
									<div className='relative'>
										<input
											id='username'
											name='username'
											type='text'
											className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${
												errors.username ? 'border-red-500' : ''
											}`}
											placeholder='Username'
											onChange={handleChange}
										/>
										<label
											htmlFor='username'
											className={`absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${
												errors.username ? 'text-red-500' : ''
											}`}>
											{errors.username || 'Username'}
										</label>
									</div>
									<div className='relative'>
										<input
											id='password'
											name='password'
											type='password'
											className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${
												errors.password ? 'border-red-500' : ''
											}`}
											placeholder='Password'
											onChange={handleChange}
										/>
										<label
											htmlFor='password'
											className={`absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${
												errors.password ? 'text-red-500' : ''
											}`}>
											{errors.password || 'Password'}
										</label>
									</div>
									<div className='relative'>
										<button
											className='bg-blue-500 text-white rounded-md px-2 py-1'
											onClick={HandleSubmit}>
											Submit
										</button>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className='max-w-md mx-auto'>
							<div>
								<h1 className='text-2xl font-semibold'>Register</h1>
								<h1
									className='font-thin mb-0 mt-5 text-lg cursor-pointer'
									onClick={() => setRegister(true)}>
									If you have an account,{' '}
									<span className='text-green-500 font-extralight'>Sign in</span>
								</h1>
							</div>
							<div className='divide-y divide-gray-200'>
								<div className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
									<div className='relative'>
										<input
											id='username'
											name='username'
											type='text'
											className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${
												errors.username ? 'border-red-500' : ''
											}`}
											placeholder='Username'
											onChange={handleChange}
										/>
										<label
											htmlFor='username'
											className={`absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${
												errors.username ? 'text-red-500' : ''
											}`}>
											{errors.username || 'Username'}
										</label>
									</div>
									<div className='relative'>
										<input
											id='email'
											name='email'
											type='email'
											className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${
												errors.email ? 'border-red-500' : ''
											}`}
											placeholder='Email address'
											onChange={handleChange}
										/>
										<label
											htmlFor='email'
											className={`absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${
												errors.email ? 'text-red-500' : ''
											}`}>
											{errors.email || 'Email Address'}
										</label>
									</div>

									<div className='relative'>
										<input
											id='password'
											name='password'
											type='password'
											className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${
												errors.password ? 'border-red-500' : ''
											}`}
											placeholder='Password'
											onChange={handleChange}
										/>
										<label
											htmlFor='password'
											className={`absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${
												errors.password ? 'text-red-500' : ''
											}`}>
											{errors.password || 'Password'}
										</label>
									</div>
									<div className='relative'>
										<button
											className='bg-blue-500 text-white rounded-md px-2 py-1'
											onClick={HandleSubmit}>
											Submit
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoginAndRegister;
