import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import snackbar from "../utility/snackbar";
import { validateLoggedInUser } from "../utility/protectRoutes";

const Signup = () => {
  validateLoggedInUser();
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, phone, email, username, password})
    })
    const data = await response.json();
    if (response.status == 201) {
      snackbar('success', 'User created')
      resetForm()
    } else {
      snackbar('error', data.error)
    }
  }

  const resetForm = () => {
    setName('')
    setPhone('')
    setEmail('')
    setUsername('')
    setPassword('')
  }

  return (
    <div className="signup-container">
      <Box
        maxWidth={"400px"}
        sx={{
          border: "1px solid #cecece",
          padding: "16px",
          borderRadius: "12px",
        }}
      >
        <h1 style={{marginBottom: '8px'}}>Sign Up</h1>
        <TextField
          id="standard-basic"
          label="Full Name"
          variant="standard"
          sx={{marginBottom: '8px'}}
          value={name}
          onChange={e => setName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          id="standard-basic"
          label="Phone Number"
          variant="standard"
          type="number"
          sx={{marginBottom: '8px'}}
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          fullWidth
        />
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          type="email"
          sx={{marginBottom: '8px'}}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          id="standard-basic"
          label="Username"
          variant="standard"
          sx={{marginBottom: '8px'}}
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          fullWidth
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          sx={{marginBottom: '8px'}}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button 
        variant="contained" 
        sx={{marginTop: '8px'}}
        onClick={submit}
        fullWidth
        >Signup</Button>
      </Box>
    </div>
  );
};

export default Signup;
