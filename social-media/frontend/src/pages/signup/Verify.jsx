import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const { uuid } = useParams();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const backendUrl = 'http://localhost:8000'; // Gerçek backend URL'sini buraya yazın

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/auth/verify/${uuid}/`, {
        verification_code: code
      });

      if (response.status === 200) {
        console.log('Kullanıcı başarıyla doğrulandı!');
        navigate('/login');
      } else {
        setError('Verification failed');
      }
    } catch (err) {
      setError('Verification failed: ' + err.message);
    }
  };

  return (
    <div className="verify">
      <div className="card">
        <h2>Hesap Doğrulama</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Doğrulama Kodu"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn">Doğrula</button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
