import { Box, Stack } from "@mui/material";
import { useOktaAuth } from "@okta/okta-react";
import React from "react";

function SignIn() {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = React.useState<string | null>(null);

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = event.currentTarget.elements.namedItem(
      "username"
    ) as HTMLInputElement;
    const password = event.currentTarget.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    const data = {
      username: username.value,
      password: password.value,
    };

    oktaAuth
      .signInWithCredentials(data)
      .then((res) => {
        const sessionToken = res.sessionToken;
        if (!sessionToken) {
          throw new Error("authentication process failed");
        }

        setSessionToken(sessionToken);
        oktaAuth.signInWithRedirect({
          originalUri: "/dashboard",
          sessionToken: sessionToken,
        });
      })
      .catch((err) => console.log(err));
  };

  if (sessionToken) return <div />;

  return (
    <Box display="flex" flex={1} justifyContent="center" alignItems="center">
      <Stack maxWidth="xl" component="form" spacing={2} onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" autoComplete="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" autoComplete="current-password" />
        <button type="submit">SignIn</button>
      </Stack>
    </Box>
  );
}
export { SignIn };
