import { redirectToAuthCodeFlow } from "../../auth";

const Nav = ({ profile }) => {
  const clientId = import.meta.env.VITE_CLIENT_ID;

  const handleClick = async () => {
    await redirectToAuthCodeFlow(clientId);
  };

  return (
    <>
      <h1> Brutalist Music</h1>
      {!profile ? (
        <button onClick={handleClick}>Login</button>
      ) : (
        <img src={profile}></img>
      )}
    </>
  );
};

export default Nav;
