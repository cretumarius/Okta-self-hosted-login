import { useOktaAuth } from "@okta/okta-react";

function Header() {
  const { authState, oktaAuth } = useOktaAuth();
  const loginWithRedirect = () =>
    oktaAuth.signInWithRedirect({ originalUri: "/dashboard" });
  const logOut = () => oktaAuth.signOut();

  const buttonText = authState?.isAuthenticated ? "Logout" : "Login";
  const btnLogic = authState?.isAuthenticated ? logOut : loginWithRedirect;

  return (
    <>
      <div>Okta React</div>
      <button onClick={btnLogic}>{buttonText}</button>
    </>
  );
}

export { Header };
