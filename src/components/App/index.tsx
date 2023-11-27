import { getAccessToken } from "../../auth";
import { useState, useEffect } from "react";
import Login from "../Login";
import TrackInfo from "../TrackInfo";
import Nav from "../Nav";
import axios from "axios";

const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);

  //instantiating some variables
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  useEffect(() => {
    if (code && !token) {
      getToken();
    }
    if (token) {
      getUserInfo();
    }
  }, [token]);

  // console.log(token);

  const getToken = async () => {
    if (code) {
      const accessToken = await getAccessToken(clientId, code);
      setToken(accessToken);
    }
  };

  //create request
  const getUserInfo = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorisation: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    setProfile(data.images[0].url);
  };

  if (!token) {
    return (
      <>
        <Login />
      </>
    );
  } else {
    return (
      <>
        <Nav profile={profile} />
        <TrackInfo />
      </>
    );
  }
};

export default App;
