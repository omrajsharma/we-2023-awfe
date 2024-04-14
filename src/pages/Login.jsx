import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import snackbar from "../utility/snackbar";
import { UserContext } from "../context/UserContext";
import { validateLoggedInUser } from "../utility/protectRoutes";

const Login = () => {
  validateLoggedInUser();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {setUserInfo} = useContext(UserContext);

  const submit = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password}),
      credentials: 'include'
    })
    const data = await response.json();
    if (response.status == 200) {
      setUserInfo(data?.userInfo);
      snackbar('success', data.message)
      resetForm()
    } else {
      snackbar('error', data.error)
    }
  }

  const resetForm = () => {
    setUsername('')
    setPassword('')
  }

  return (
    <div className="login-container">
      <Box
        maxWidth={"400px"}
        sx={{
          border: "1px solid #cecece",
          padding: "16px",
          borderRadius: "12px",
        }}
      >
        <h1 style={{marginBottom: '8px'}}>Login</h1>
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
        >Login</Button>
      </Box>
    </div>
  )
}

export default Login
