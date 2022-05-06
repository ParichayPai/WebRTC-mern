import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Switch,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Navigation } from "./Components/shared/Navigation/Navigation";
import { Authenticate } from "./pages/Authenticate/Authenticate";
import { Activate } from "./pages/Activate/Activate";
import { Rooms } from "./pages/Rooms/Rooms";

const isAuth = false;
const user = {
  activated: false,
};

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path="/authenticate"
          render={({ location }) => {
            return isAuth ? (
              <Navigate
                to={{
                  pathname: "/authenticate",
                  state: { from: location },
                }}
              />
            ) : null;
          }}
          element={<Authenticate />}
        />
        <Route
          path="/rooms"
          render={({ location }) => {
            return !isAuth ? (
              <Navigate
                to={{
                  pathname: "/",
                  state: { from: location },
                }}
              ></Navigate>
            ) : isAuth && !user.activated ? null : (
              <Navigate
                to={{
                  pathname: "/rooms",
                  state: { from: location },
                }}
              ></Navigate>
            );
          }}
          element={<Activate />}
        />
        <Route
          path="/"
          exact
          render={({ location }) => {
            return isAuth ? (
              <Navigate
                to={{
                  pathname: "/",
                  state: { from: location },
                }}
              />
            ) : null;
          }}
          element={<Home />}
        />
        <Route
          path="/rooms"
          render={({ location }) => {
            return !isAuth ? (
              <Navigate
                to={{
                  pathname: "/",
                  state: { from: location },
                }}
              ></Navigate>
            ) : isAuth && !user.activated ? (
              <Navigate
                to={{
                  pathname: "/activate",
                  state: { from: location },
                }}
              ></Navigate>
            ) : null;
          }}
          element={<Rooms />}
        />
        {/* <GuestRoute path="/authenticate">
          <Authenticate />
        </GuestRoute> */}
        {/* <SemiProtectedRoute path="/activate">
          <Activate />
        </SemiProtectedRoute> */}
        {/* <ProtectedRoute path="/rooms">
          <Rooms />
        </ProtectedRoute> */}
        {/* <GuestRoute path="/" exact>
          <Home />
        </GuestRoute> */}
      </Routes>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          <Navigate
            to={{
              pathname: rest.path,
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );
};
const SemiProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Navigate
            to={{
              pathname: "/",
              state: { from: location },
            }}
          ></Navigate>
        ) : isAuth && !user.activated ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: "/rooms",
              state: { from: location },
            }}
          ></Navigate>
        );
      }}
    ></Route>
  );
};

const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Navigate
            to={{
              pathname: "/",
              state: { from: location },
            }}
          ></Navigate>
        ) : isAuth && !user.activated ? (
          <Navigate
            to={{
              pathname: "/activate",
              state: { from: location },
            }}
          ></Navigate>
        ) : (
          children
        );
      }}
    ></Route>
  );
};
export default App;
