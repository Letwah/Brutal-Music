import { getAccessToken } from "../../auth";
import { useState, useEffect, useCallback } from "react";
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

  // console.log(token);

  const getToken = useCallback(async () => {
    if (code) {
      const accessToken = await getAccessToken(clientId, code);
      setToken(accessToken);
    }
  }, [code, clientId]);

  //create request
  const getUserInfo = useCallback(async () => {
    if (token) {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProfile(data.images[0].url);
    }
  }, [token]);

  useEffect(() => {
    if (code && !token) {
      getToken();
    } else if (token) {
      getUserInfo();
    }
  }, [code, token, getToken, getUserInfo]);

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
