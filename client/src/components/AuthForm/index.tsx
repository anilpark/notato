import React, { useState } from "react";
import { Box, Button, Container, TextField, Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { IAuthData } from "../../api";

interface AuthFormProps {
  handleLogin: (data: IAuthData) => Promise<void>;
  handleRegister: (data: IAuthData) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ handleLogin, handleRegister }) => {
  const [tabValue, setTabValue] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const isLoginValid = username.length >= 5 && password.length >= 8;
  const isRegisterValid =
    isLoginValid && repeatPassword.length >= 8 && password === repeatPassword;

  const onLoginClick = () => {
    handleLogin({
      username,
      password,
    });
  };

  const onRegisterClick = () => {
    handleRegister({
      username,
      password,
    });
  };

  return (
    <Container maxWidth="xs">
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Login" value="login" />
            <Tab label="Register" value="register" />
          </Tabs>
        </Box>
        <TabPanel value="login">
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            data-testId="login-password-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={!isLoginValid}
            onClick={onLoginClick}
          >
            Login
          </Button>
        </TabPanel>
        <TabPanel value="register">
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Repeat Password"
            type="password"
            margin="normal"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={!isRegisterValid}
            onClick={onRegisterClick}
          >
            Register
          </Button>
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default AuthForm;
