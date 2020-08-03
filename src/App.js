import React from 'react';
import './styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { toast } from "react-toastify";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ROUTES } from "./config/routes";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { loginAction, logoutAction } from "./redux/actions/loginActions";

import BlogScreen from "./screens/BlogScreen/BlogScreen";
import PostScreen from "./screens/PostScreen/PostScreen";
import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";

const styles = "app";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const state = store.getState();
      let isLogged = false;
      if (state && state.userReducer && state.userReducer.loggedIn) {
        isLogged = true;
      }
      if (isLogged) {
        return <Component {...props} {...rest} />;
      } else {
        toast.error("Faça login!");
        return (
          <Redirect
            to={{
              pathname: ROUTES.rootUrl + ROUTES.login.info.url,
              state: { from: props.location }
            }}
          />
        );
      }
    }}
  />
);

const RestrictRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const state = store.getState();
      let isLogged = false;
      const isLoginRoute =
        props.location.pathname === `/${ROUTES.login.info.url}`;
      const isRegitrationRoute =
        props.location.pathname === `/${ROUTES.register.info.url}`;
      if (state && state.userReducer && state.userReducer.loggedIn) {
        isLogged = true;
      }
      if ((!isLogged && !isLoginRoute) || (!isLogged && !isRegitrationRoute)) {
        return <Component {...props} {...rest} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: ROUTES.rootUrl,
              state: { from: props.location }
            }}
          />
        );
      }
    }}
  />
);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      reload: false
    };
    this.retrieveData();
    store.subscribe(() => {
      this.setState({ loggedIn: store.getState().userReducer.loggedIn });
    });
  }

  retrieveData = async () => {
    try {
      const value = await localStorage.getItem("user");
      if (value !== null) {
        store.dispatch(loginAction(JSON.parse(value)));
        this.getAddress();
      }
    } catch (error) {
      console.log(error)
    }
  };

  pageChange = (url, params = null) => {
    if (url === ROUTES.rootUrl) {
      this.route.history.push(url);
    } else {
      this.route.history.push("/" + url);
    }

    if (params) {
      this.route.history.location.state = params;
    }

    this.setState({
      reload: true
    });
  };

  headerActiveButton = button => {
    if (this.route) {
      switch (button) {
        case "HOME": {
          if (this.route.history.location.pathname === ROUTES.rootUrl)
            return "active";
          break;
        }
        default:
          return "";
      }
    }
  };

  render() {
    return (
      <Provider store={store}>
        <Header
          route={this.route}
          user={store.getState().userReducer}
          logout={() => store.dispatch(logoutAction(this.pageChange))}
          pageChange={this.pageChange}
          headerActiveButton={this.headerActiveButton}
        />
        <div className={`${styles}-container`}>
          <Router ref={input => {this.route = input}} forceRefresh>
            <Switch>
              <Route
                exact
                path={ROUTES.rootUrl}
                render={() => <BlogScreen pageChange={this.pageChange} />}
              />
              <PrivateRoute
                exact
                path={ROUTES.rootUrl + ROUTES.post.info.url + "/:id"}
                render={() => <PostScreen pageChange={this.pageChange} />}
              />

              <RestrictRoute
                exact
                path={ROUTES.rootUrl + ROUTES.login.info.url}
                component={LoginScreen}
                pageChange={this.pageChange}
                route={this.route}
              />
              <RestrictRoute
                exact
                path={ROUTES.rootUrl + ROUTES.register.info.url}
                component={RegistrationScreen}
                pageChange={this.pageChange}
                route={this.route}
              />
            </Switch>
          </Router>
        </div>
        <Footer
          pageChange={this.pageChange}
        />
      </Provider>
    );
  }
}

export default App;
