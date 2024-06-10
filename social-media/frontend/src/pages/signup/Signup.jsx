import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import { RegisterAPI } from '../../api/Auth';


export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();
  const emailDomain = '@posta.pau.edu.tr';

  const handleChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '');
    setPhone(numericValue);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailBlur = () => {
    if (email && !email.includes(emailDomain)) {
      setEmail(email + emailDomain);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === rePassword);
  };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }


    const response = await RegisterAPI(email, password, rePassword, name, surname, phone); 
    
    if (response.request.status === 201) {
      navigate(`/verify/${response.data.uudi}`);
    }
    else {
      console.log(response, 'RES')
      setError("An error occurred");
    }
  };

  return (
    <div className="signup">
      <div className="card">
        <div className="left">
          <h2>-<br /> SocialMedia SignUp<br />-</h2>
          <p>
            PAÜ Social Media'ya katılın! <br/>
            PAÜ.edu.tr e-posta adresinizle kaydolarak üniversite topluluğunun bir parçası olun ve özel içeriklere erişim sağlayın.
          </p>
          <span>Hesabınız var mı? </span>
          <Link to='/login'>
            <button className='btn btn-primary'>Login</button>
          </Link>
        </div>
        <form className="right" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder='email'
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          <input
            type="password"
            required
            placeholder='password'
            value={password}
            onChange={handlePasswordChange}
            style={{ borderColor: passwordMatch ? '' : 'red' }}
          />
          <input
            type="password"
            required
            placeholder='re-password'
            value={rePassword}
            onChange={handleRePasswordChange}
            style={{ borderColor: passwordMatch ? '' : 'red' }}
          />
          <input
            type="text"
            required
            placeholder='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder='surname'
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder='phone number'
            value={phone}
            onChange={handleChange}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn">Register</button>
        </form>
      </div>
    </div>
  );
}
