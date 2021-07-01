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
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as LogoIcon } from "../../assets/logo.svg";

const useStyles = makeStyles((theme) => ({
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
}));

const Header = () => {
  const styles = useStyles();
  return (
    <Container className={styles.headerWrapper}>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          {/* <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
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
