import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Header from "./components/Header";
import Progress from "./components/Progress";

const AuthApp = lazy(() => import("./components/AuthApp"));
const MarketingApp = lazy(() => import("./components/MarketingApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  const [isSignedIn, setSignedIn] = useState(false);
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            signedIn={isSignedIn}
            onSignOut={() => {
              setSignedIn(false);
            }}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthApp onSignIn={() => setSignedIn(true)} />
              </Route>
              <Route path="/">
                <MarketingApp isSignedIn={isSignedIn} />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
