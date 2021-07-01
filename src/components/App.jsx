import { Switch, Route } from "react-router-dom";
import { Box } from "@material-ui/core";
import Layout from "./elements/layout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

const App = () => {
  return (
    <Box>
      <Switch>
        <Layout>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Layout>
      </Switch>
    </Box>
  );
};

export default App;
