import React, { useState } from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { MdKey } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import {  useNavigate } from 'react-router-dom';

const Main = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    });

    const Navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    // Email validation
    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    // Validation for inputs
    const validate = () => {
        const newErrors = { username: '', email: '', password: '' };

        if(username===''){
            newErrors.username = 'Username must be filled';
        }
        if(password===''){
            newErrors.password = 'Password must be filled';
        }
        if (username!=="" && username !== 'emilys') {
            newErrors.username = 'Username must be "emilys"';
        }
        if (email && !isValidEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing
       
        if (!validate()) return;  // First, validate the fields before making the API call

        const userData = {
            username: username,
            password: password,
            email: email,
            expiresInMins: 30,
        };

        try {
            // Send credentials to the API
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials or login failed');
            }

            const data = await response.json();
            console.log('Login response data:', data);

            // Store the authentication token and user data
            localStorage.setItem('authToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('user', JSON.stringify(data));

            Navigate('/home');
        } catch (error) {
            console.error('Error during login:', error);
            setErrors((prev) => ({ ...prev, password: 'cridentials are wrong ' }));
        }
    };

    const loginType = [
        { logo: './google.svg', name: 'Login with Google' },
        { logo: '/facebook.svg', name: 'Login with Facebook' }
    ]

    const InputType = [
        { logo: <IoPersonCircleOutline fontSize={28} />, placeholder:"User name", text: 'Username', type: 'text', value:username, setter: setUsername},
        { logo: <IoMdMail fontSize={28} />, text: 'Email', placeholder:"Email", type: 'mail',value:email, setter: setEmail },
        { logo: <MdKey fontSize={28} />, text: 'Password', type: 'password',placeholder:"password", value:password, setter: setPassword },

    ]

    return (
        <div className='authLayout'>
            <div className='authLeft'>
                <div className='leftImg'>
                    <img src='./login.svg' alt="Login Illustration" />
                </div>
            </div>
            <div className='authRight'>
                <div className='rightCard flexCol'>
                    <div className=' flexCol heading'>
                    <span className='font36 pdngHXXS'>Welcome to</span>
                    <span className='unstop font46 pdngHXXS'>Unstop</span>
                    </div>

                    {loginType.map((item, index) =>
                        <div className='pdng8 alignItems' key={index}>
                            <div className='pdng8 loginType'>
                                <span className='imgAvatarXS'>
                                    <img src={item.logo} />
                                </span>
                                <span className='pdngHXS'>
                                    {item.name}
                                </span>
                            </div>
                        </div>)}
                    <div className='ortext'>
                        <hr />
                        <span>OR</span>
                    </div>

                    {InputType.map((itemV, index) => (
                        <div className="pdngHXXS" key={index}>
                            <div className="flexRow inputText">
                                <span className="flexAutoRow pdng8 alignItems">
                                    {itemV.logo}
                                </span>
                                <div className="flexMinWidthCol">
                                    <span className="pdng8">{itemV.text}</span>
                                    <div className="pdng8 inputField">
                                        <input
                                            type={showPassword && itemV.type === 'password' ? 'text' : itemV.type}
                                            placeholder={itemV.placeholder}
                                            value={itemV.value}
                                            onChange={(e) => itemV.setter(e.target.value)}
                                        />
                                    </div>
                                   
                                </div>

                                {itemV.type === 'password' && (
                                    <span
                                        className="flexAutoRow pdng8 alignItems"
                                        onClick={togglePassword}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {showPassword ? <IoMdEyeOff fontSize={24} /> : <IoMdEye fontSize={24} />}
                                    </span>
                                )}
                            </div>
                            {console.log("..........err",errors,"ksamlkns",itemV.text.toLowerCase())}
                            {errors[itemV.text.toLowerCase()] && (
                                        <div className="error-text">{errors[itemV.text.toLowerCase()]}</div>
                                    )}
                        </div>
                        
                    ))}
                    

                    <div className="heading resColRow alignItems">
                        <div className="flexMinWidthRow">
                            <input type="checkbox" id="rember" name="vehicle1" />
                            <span className="pdngHXS flexAutoRow">Remember me</span>
                        </div>
                        <span className="forgot">Forgot Password?</span>
                    </div>

                    <div className="flexRow loginBtn pdng8">
                        <button onClick={handleLogin}>Login</button>
                    </div>

                    <div className="flexInline pdng8 heading loginBtn">
                        <span>Don’t have an account?</span>
                        <span className="regPdng">Register</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
