import React, { useEffect } from 'react'
const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

async function loginUser() {

  return fetch('http://localhost:5000/login', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(data => data.json())
    .then(data => 
      data.token
    )
 }


function Login({ setToken }) {

    
const handleSubmit = async e => {
  e.preventDefault();
  const token = await loginUser()
  setToken(token)
}

useEffect( () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  async function getAccessToken() {
    await fetch("http://localhost:5000/getAccessToken/?code="+ codeParam, {
      method: "GET"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if(data.access_token) {
        localStorage.setItem("accessToken", data.access_token);
        setToken(data.access_token)
      }

    })
  }

  getAccessToken();
}, [])



  //forward the user to github login screen
  function loginWithGithub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
  }

  return (
    <button onClick={loginWithGithub}>
      Login with Github
    </button>
  )
}

export default Login