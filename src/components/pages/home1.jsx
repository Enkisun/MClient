import React from "react";
import { useDispatch } from "react-redux";
import { Box, Button } from "@material-ui/core";
import { logout } from "../../slices/authSlice";
import { withRouter } from "react-router";

const HomePage1 = () => {
  const dispatch = useDispatch();

  const handleLoggedOut = () => {
    dispatch(logout());
  };

  return (
    <Box>
      <Button onClick={handleLoggedOut}>Logout</Button>
    </Box>
  );
};
export default withRouter(HomePage1);
