import { Switch, Route } from "react-router-dom";
import { Box } from "@material-ui/core";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

const App = () => {
  return (
    <Box>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </Box>
  );
};

export default App;
