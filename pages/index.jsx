import React from "react";
import { helloWorld } from "../client/actions/api";
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/client";


const HomePage = () => {
  const [payload, setPayload] = React.useState("");
  const [session, loading] = useSession();
  React.useEffect(() => {
    // Example how to create page without ssr
    helloWorld().then(resp => {
      setPayload(resp);
    });
  }, []);

  return (
    <>
      {!session && (
        <>
        Not signed in <br/>
        <button onClick={signIn}>click to sign in</button>
        </>
      )}
      {session && (
        <>
        Signed in as {session.user.email} <br/>
        <button onClick = {signOut}>click to sign out</button>
        </>
      )}
      <h2>Welcome to Next.js!</h2>
      <h3>
        This page is static rendered, because all API calls are made in
        useEffect
      </h3>
      <h4>{payload}</h4>
      <p>You can tell because the text above flashes on page refresh</p>
    </>
  );
};

export default HomePage;
