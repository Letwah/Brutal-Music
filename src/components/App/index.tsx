import { getAccessToken } from "../../auth";
import Login from "../Login";
import TrackInfo from "../TrackInfo";
import { useState, useEffect } from "react";

const App = () => {
  const [token, setToken] = useState<string | null>(null);

  //instantiating some variables
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  useEffect(() => {
    if (code && !token) {
      getToken();
    }
  }, []);

  console.log(token);

  const getToken = async () => {
    if (code) {
      const accessToken = await getAccessToken(clientId, code);
      setToken(accessToken);
    }
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
        <TrackInfo />
      </>
    );
  }
};

export default App;
