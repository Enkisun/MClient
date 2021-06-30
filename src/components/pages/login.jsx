import React, { useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/authSlice";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 300,
    margin: theme.spacing(1, "auto"),
    padding: theme.spacing(1),
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    padding: "0 30px",
  },
  avatar: {
    backgroundColor: "#f9b934",
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(1, 0),
  },
}));

const LoginPage = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      unwrapResult(await dispatch(login({ email, password })));
    } catch (errData) {
      if (!errData.errors) {
        return setError(errData.message);
      }

      if (errData.errors[0].param === "email") {
        setEmailError(errData.errors[0].msg);
      } else setPasswordError(errData.errors[0].msg);

      errData.errors[1] && setPasswordError(errData.errors[1].msg);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    setError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
    setError("");
  };

  return (
    <Grid>
      <Paper elevation={10} className={styles.paper}>
        <Grid align="center">
          <Box className={styles.title}>
            <h2>Sign in</h2>
            <Avatar className={styles.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          </Box>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              id="email"
              name="email"
              value={email}
              onChange={handleEmail}
              error={!!emailError}
              helperText={emailError}
              label="Email"
              placeholder="Enter your email"
              variant="outlined"
              className={styles.field}
              autoFocus
              fullWidth
              required
            />
            <TextField
              id="password"
              name="password"
              value={password}
              onChange={handlePassword}
              error={!!passwordError}
              helperText={passwordError}
              label="Password"
              placeholder="Enter your password"
              variant="outlined"
              type="password"
              className={styles.field}
              fullWidth
              required
            />
            {/* <FormControlLabel
              align="left"
              control={<Checkbox name="remember" color="primary" />}
              label="Remember me"
            /> */}
            {error && <Typography color="error">{error}</Typography>}
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={styles.submit}
              fullWidth
            >
              Sign in
            </Button>
          </form>
          <Typography>
            <Link href="#">Forgot password?</Link>
          </Typography>
          <Typography>
            Don't have an account?
            <Link href="/register">{` Sign Up Now`}</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default LoginPage;
