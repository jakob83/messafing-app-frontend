import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  margin-top: 10%;
  padding: 20px;
  border: 1px solid var(--moonstone);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f3ebeb;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
`;

const FormGroup = styled.div``;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #242424;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  align-self: center;
  padding: 10px 15px;
  background-color: var(--paynes-gray);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        return setError(errorData.error);
      }
      const token = await res.json();
      if (!token) {
        setError('Login failed. Please try again.');
        return;
      }
      localStorage.setItem('token', token);
    } catch (error) {
      return setError('An error occurred');
    }

    navigate('/');
  };

  return (
    <>
      <Header />
      <RegisterContainer>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <Button type="submit">Login</Button>
        </Form>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </RegisterContainer>
    </>
  );
};

export default Login;
