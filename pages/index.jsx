// import React from "react";
import { helloWorld } from "../client/actions/api";
import Axios from "axios";
// import { Login } from '../pages/login.jsx';
import React, { useEffect } from "react";
import Router from 'next/router'


const HomePage = () => {
  const [payload, setPayload] = React.useState("");

  React.useEffect(() => {
    // Example how to create page without ssr
    // helloWorld().then(resp => {
    //   setPayload(resp);
    // });
    const {pathname} = Router
    if(pathname == '/' ){
       Router.push('/login')
    }




    // Testing to see current user
    // const getUser = async () => {
    //   // const currentUser = await Axios.get('/api/user')
    //   const currentUser = {
    //     BGCMA_email: "sahya",
    //     password: '$2a$10$/NYjx/SvECs8YZEYfS4HMOkfZvrYcO5hqERWOyYAEka5vTsgQOZgS',
    //     type: "BusDriver",
    //     club: "All"
    //   }
    //   console.log(currentUser)
    // }
    // getUser();



  }, []);

  return (

    <>
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
