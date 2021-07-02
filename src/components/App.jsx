import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Box, CssBaseline } from "@material-ui/core";
import theme from "../constants/theme";
import Layout from "../modules/layout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import HomePage1 from "./pages/home1";
import ProtectedRoute from "./protectedRoute";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Box height="100%">
          <CssBaseline />
          <Switch>
            <Layout>
              <ProtectedRoute path="/home" component={HomePage} />
              <ProtectedRoute path="/home1" component={HomePage1} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </Layout>
          </Switch>
        </Box>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
