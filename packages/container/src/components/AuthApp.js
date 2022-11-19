import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { mount } from "auth/AuthApp";

const AuthApp = ({ onSignIn }) => {
  const history = useHistory();
  const ref = useRef(null);
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPath }) => {
        if (history.location.pathname !== nextPath) {
          history.push(nextPath);
        }
      },
      initialPath: history.location.pathname,
      onSignIn,
    });
    history.listen(onParentNavigate);
  }, []);
  return <div ref={ref}></div>;
};
export default AuthApp;
