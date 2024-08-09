import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Push the form submission event to Google Tag Manager
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'submit_click',
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
    });
  
    console.log('Form submitted', formData);
  
   // Send the form data to Zapier
try {
  const response = await axios.post('https://cors-anywhere.herokuapp.com/https://hooks.zapier.com/hooks/catch/19675728/2u78eh7/', formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 200) {
    console.log('Data sent to Zapier successfully.');
  } else {
    console.error('Failed to send data to Zapier.');
  }
} catch (error) {
  console.error('Failed to send data to Zapier:', error);
}
}

  return (
    <div className="App">
      
      <form onSubmit={handleSubmit}>
      <h1>Contact us</h1>
        <label>
          <input
            placeholder='First name'
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <input
            placeholder='Last name'
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
        
          <input
            placeholder='Email'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <input
            placeholder='Phone'
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className="submit" type="submit"><div className="button-text">Submit</div></button>
      </form>
    </div>
  );
}

export default App;
