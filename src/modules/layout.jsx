import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Header from "./header";

const useStyles = makeStyles(
  (theme) => ({
    main: {
      minHeight: "100vh",
      height: "100%",
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(7, 2, 2),
    },
  }),
  {
    name: "layoutStyle",
  }
);

const Layout = ({ children }) => {
  const styles = useStyles();
  return (
    <>
      <Header />
      <Container component="main" className={styles.main}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
