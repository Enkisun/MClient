import React, { useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { register } from "../../reducers/authSlice";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

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

const RegisterPage = () => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirm !== password) {
      setError("Password mismatch");
      return setPasswordError(true);
    }

    try {
      unwrapResult(await dispatch(register({ email, password })));
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

  const handleConfirm = (e) => {
    setConfirm(e.target.value);
    setPasswordError("");
    setError("");
  };

  return (
    <Grid>
      <Paper elevation={10} className={styles.paper}>
        <Grid align="center">
          <Box className={styles.title}>
            <h2>Sign up</h2>
            <Avatar className={styles.avatar}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
          </Box>
          <Box marginBottom={2}>
            <Typography variant="caption">
              Please fill this form to create an account
            </Typography>
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
              className={styles.field}
              type="password"
              fullWidth
              required
            />
            <TextField
              id="confirm"
              name="confirm"
              value={confirm}
              onChange={handleConfirm}
              error={!!passwordError}
              label="Confirm password"
              placeholder="Enter your password"
              variant="outlined"
              className={styles.field}
              type="password"
              fullWidth
              required
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={styles.submit}
              fullWidth
            >
              Sign up
            </Button>
          </form>
          <Typography>
            Do you have an account?
            <Link href="/login">{` Sign in`}</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default RegisterPage;
