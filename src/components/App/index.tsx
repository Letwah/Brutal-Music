import Login from "../Login";
import TrackInfo from "../TrackInfo";
import { useState } from "react";

const App = () => {
  const [token, setToken] = useState<string | null>(null);

  if (!token) {
    return (
      <>
        <Login></Login>
      </>
    );
  } else {
    <TrackInfo></TrackInfo>;
  }
};

export default App;
