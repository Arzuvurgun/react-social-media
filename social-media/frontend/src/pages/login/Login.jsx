import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { loginAPI } from '../../api/Auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(email,password);
    
    e.preventDefault();
    const response = await loginAPI(email, password);
    
    if (response.request.status === 200) {
      localStorage.setItem("token",`Token ${response.data.key}`)
      setTimeout(()=> {
        navigate('/home');
      }, 100 )
    }
  }


  return (
    <div className="login">
      <div className="card">
        <div className="left">  
          <h2>-<br/> PAU SocialMedia Login<br/>-</h2>
          <p> 
            PAÜ Social Media'ya hoş geldiniz!  <br/>
            Giriş yaparak PAÜ.edu.tr e-posta adresinizle özel içeriklere ve topluluğa erişin.
          </p>
          <span>Hesabınız yok mu? </span>
          <Link to='/signup'>
            <button className='btn btn-primary'>Register</button>
          </Link>
        </div>
        <form className="right" onSubmit={handleSubmit}> 
          <input 
            type="text" 
            required 
            placeholder='email' 
            onChange={(e) => setEmail(e.target.value)}

          />
          <input 
            type="password" 
            required 
            placeholder='password ' 
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn">Login</button>
        </form>     
      </div>
    </div>
  );
}
