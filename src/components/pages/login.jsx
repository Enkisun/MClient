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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    title: {
      marginBottom: theme.spacing(3),
      padding: theme.spacing(0, 4),
    },
    formData: {
      marginBottom: theme.spacing(5),
    },
    field: {
      marginBottom: theme.spacing(2),
      "&:nth-of-type(2)": {
        marginBottom: (props) => theme.spacing(props.error ? 2 : 0),
      },
    },
    submitWrapper: {
      width: "100%",
    },
    submit: {
      height: 42,
    },
    forgot: {
      marginBottom: theme.spacing(2),
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

  const dispatch = useDispatch();
  const { isLoading, token } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const styles = useStyles({ error: !!error });

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

      if (errData.errors[1]) {
        return setPasswordError(errData.errors[1].msg);
      }
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
      <form onSubmit={handleSubmit} noValidate>
        <Box>
          <Box className={styles.title}>
            <Typography variant="h4">Sign in</Typography>
          </Box>
          <Box className={styles.formData}>
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
        </Box>
        <Box className={styles.submitWrapper}>
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
          <Typography className={styles.forgot}>
            <Button className={styles.link} href="/login" component={Link}>
              Forgot password?
            </Button>
          </Typography>
          <Typography>
            Don&apos;t have an account?
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
