import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate  = useNavigate()

  useEffect(() => {
    const auth  = localStorage.getItem('user');
      if (auth) {
        navigate('/')
      }
    })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchLogindata = async () => {
    const data = await fetch('http://localhost:3500/login',{
      method :'post',
      body: JSON.stringify(formData),
      headers: {'Content-Type':'application/json'}
    })
    const result = await data.json()
    if(result.name){
        console.log(result)
        localStorage.setItem('user',JSON.stringify(result))
        navigate('/')
    }else{
        alert('invalid user, Please enter correct details')
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your signup logic here
    fetchLogindata()
    setFormData({
      name: '',
      email: '',
      password: '',
    });
    navigate('/');
  };

  return (
    <div className="loign-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

// CSS
const styles = {
  'signup-container': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Center vertically
    height: '100vh', // Set to viewport height for vertical centering
    width: '300px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
  },
  'signup-form': {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  'form-group': {
    marginBottom: '10px',
  },
  'input': {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
  },
  'button': {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
