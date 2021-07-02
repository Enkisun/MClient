import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "../../slices/authSlice";
import Loader from "../elements/loader";

const useStyles = makeStyles(
  (theme) => ({
    grid: {
      height: "100%",
      paddingTop: theme.spacing(2),
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100%",
    },
    title: {
      marginBottom: theme.spacing(2),
      padding: "0 30px",
    },
    field: {
      marginBottom: theme.spacing(2),
      "&nth-child(2)": {
        marginBottom: 50,
      },
    },
    submitWrapper: {
      width: "100%",
    },
    submit: {
      height: 42,
    },
    link: {
      color: theme.palette.secondary.main,
      textTransform: "capitalize",
      textDecoration: "underline",
    },
  }),
  {
    name: "loginStyle",
  }
);

const LoginPage = () => {
  const history = useHistory();
  const styles = useStyles();

  const dispatch = useDispatch();
  const { isLoading, token } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      unwrapResult(await dispatch(login({ email, password })));
      history.push("/home");
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
    <Grid className={styles.grid} align="center">
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Box>
          <Box className={styles.title}>
            <Typography variant="h3">Sign in</Typography>
          </Box>
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
            type="email"
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
          {!!error && error && <Typography color="error">{error}</Typography>}
        </Box>
        <Box className={styles.submitWrapper}>
          <Typography align="left">
            <Button className={styles.link} href="/login" component={Link}>
              Forgot password?
            </Button>
          </Typography>
          <Button
            className={styles.submit}
            disabled={isLoading}
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
          >
            {isLoading ? <Loader /> : `Sign in`}
          </Button>
          <Typography>
            Don't have an account?
            <Button className={styles.link} href="/register" component={Link}>
              {` Sign Up Now`}
            </Button>
          </Typography>
        </Box>
      </form>
    </Grid>
  );
};

export default LoginPage;
