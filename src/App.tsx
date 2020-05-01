import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Character } from "./components/Character/Character";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";

import store from "./redux/store";
import theme from "./theme";

const useStyles = makeStyles({
  layout: {
    height: "100vh",
    display: "grid",
    gridTemplateRows: "auto 1fr",
  },
  container: {
    padding: "8px",
  },
});

export const App: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className={classes.layout}>
            <Header />
            <Container maxWidth="sm" className={classes.container}>
              <Router>
                <Switch>
                  <Route path="/:characterId">
                    <Character />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </Router>
            </Container>
          </div>
        </ThemeProvider>
      </Provider>
    </>
  );
};
