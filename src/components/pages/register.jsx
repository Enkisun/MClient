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
import { register } from "../../slices/authSlice";
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
      marginBottom: theme.spacing(1),
      padding: theme.spacing(0, 4),
    },
    formData: {
      marginBottom: theme.spacing(5),
    },
    field: {
      marginBottom: theme.spacing(2),
      "&:nth-of-type(3)": {
        marginBottom: (props) => theme.spacing(props.error ? 2 : 0),
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
    name: "registerStyle",
  }
);

const RegisterPage = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { isLoading, token } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirm, setConfirm] = useState("");

  const styles = useStyles({ error: !!error });

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirm !== password) {
      setError("Password mismatch");
      return setPasswordError(true);
    }

    try {
      unwrapResult(await dispatch(register({ email, password })));
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

  const handleConfirm = (e) => {
    setConfirm(e.target.value);
    setPasswordError("");
    setError("");
  };

  return (
    <Grid className={styles.grid} align="center">
      <form onSubmit={handleSubmit} noValidate>
        <Box>
          <Box className={styles.title}>
            <Typography variant="h4">Sign up</Typography>
          </Box>
          <Box marginBottom={2}>
            <Typography variant="caption">
              Please fill this form to create an account
            </Typography>
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
              autoComplete="false"
              fullWidth
              required
            />
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Box>
        <Box className={styles.submitWrapper}>
          <Button
            className={styles.submit}
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
          >
            {isLoading ? <Loader /> : `Sign up`}
          </Button>
          <Typography>
            Do you have an account?
            <Button className={styles.link} href="/login" component={Link}>
              {` Sign in`}
            </Button>
          </Typography>
        </Box>
      </form>
    </Grid>
  );
};

export default RegisterPage;
