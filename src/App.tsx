import { useCallback } from "react";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard";
import ErrorPage from "./ErrorPage";
import { SignIn } from "./SignIn";
import Profile from "./Profile";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CALLBACK_PATH = import.meta.env.VITE_CALLBACK_PATH;
const ISSUER = import.meta.env.VITE_ISSUER;
const HOST = import.meta.env.VITE_HOST;
const REDIRECT_URI = `${window.location.origin}${CALLBACK_PATH}`;
const SCOPES = import.meta.env.VITE_SCOPES;

if (!SCOPES || !CLIENT_ID || !CALLBACK_PATH || !ISSUER || !HOST) {
  throw new Error("All environmental variables must be set");
}

const router = createBrowserRouter([
  {
    path: "login",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: CALLBACK_PATH,
    element: <LoginCallback />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

const App = () => {
  const config = {
    issuer: ISSUER,
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    scopes: SCOPES.split(/\s+/),
  };
  const oktaAuth = new OktaAuth(config);

  const restoreOriginalUri = useCallback(
    (oktaAuth: OktaAuth, originalUri: string) => {
      location.replace(
        toRelativeUrl(originalUri || "/", window.location.origin)
      );
    },
    []
  );
  return (
    <Security restoreOriginalUri={restoreOriginalUri} oktaAuth={oktaAuth}>
      <RouterProvider router={router} />
    </Security>
  );
};

export default App;
