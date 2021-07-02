import React from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Link,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as LogoIcon } from "../assets/logo.svg";

const useStyles = makeStyles(
  (theme) => ({
    headerWrapper: {
      position: "fixed",
      flexGrow: 1,
      padding: 0,
    },
    toolbar: {
      justifyContent: "center",
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    logoWrapper: {
      marginRight: theme.spacing(1),
      padding: 0,
      minWidth: 30,
      width: 30,
      height: 30,
    },
    logo: {
      width: "100%",
      height: "100%",
    },
  }),
  {
    name: "headerStyle",
  }
);

const Header = () => {
  const styles = useStyles();
  return (
    <Container className={styles.headerWrapper}>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <Button className={styles.logoWrapper} href="/" component={Link}>
            <SvgIcon className={styles.logo}>
              <LogoIcon />
            </SvgIcon>
          </Button>
          <Typography variant="h6">MTracker</Typography>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
