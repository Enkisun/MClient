import React from "react";
import { Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    loaderWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
    },
    loader: {
      color: theme.palette.primary.dark,
      display: "inline-block",
      position: "relative",
      width: 30,
      height: 30,
    },
    loaderItem: {
      transformOrigin: "15px 15px",
      animation: "$loader 0.8s linear infinite",
      "&:after": {
        content: "' '",
        display: "block",
        position: "absolute",
        top: 4,
        left: "50%",
        transform: "translateX(-50%)",
        width: 8,
        height: 5,
        borderRadius: "30%",
        background: theme.palette.secondary.main,
      },
      "&:nth-of-type(1)": {
        transform: "rotate(0deg)",
        animationDelay: "-0.7s",
      },
      "&:nth-of-type(2)": {
        transform: "rotate(45deg)",
        animationDelay: "-0.6s",
      },
      "&:nth-of-type(3)": {
        transform: "rotate(90deg)",
        animationDelay: "-0.5s",
      },
      "&:nth-of-type(4)": {
        transform: "rotate(135deg)",
        animationDelay: "-0.4s",
      },
      "&:nth-of-type(5)": {
        transform: "rotate(180deg)",
        animationDelay: "-0.3s",
      },
      "&:nth-of-type(6)": {
        transform: "rotate(225deg)",
        animationDelay: "-0.2s",
      },
      "&:nth-of-type(7)": {
        transform: "rotate(270deg)",
        animationDelay: "-0.1s",
      },
      "&:nth-of-type(8)": {
        transform: "rotate(315deg)",
        animationDelay: "0s",
      },
    },
    "@keyframes loader": {
      "0%": { opacity: 1 },
      "100%": { opacity: 0 },
    },
  }),
  {
    name: "loaderStyle",
  }
);

const Loader = () => {
  const styles = useStyles();
  return (
    <Container className={styles.loaderWrapper}>
      <Box className={styles.loader}>
        <Box className={styles.loaderItem} />
        <Box className={styles.loaderItem} />
        <Box className={styles.loaderItem} />
        <Box className={styles.loaderItem} />
        <Box className={styles.loaderItem} />
        <Box className={styles.loaderItem} />
        <Box className={styles.loaderItem} />
        <Box className={styles.loaderItem} />
      </Box>
    </Container>
  );
};

export default Loader;
