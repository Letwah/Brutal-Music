import { redirectToAuthCodeFlow } from "../../auth";

const Nav = () => {
  const clientId = import.meta.env.CLIENT_ID;

  const handleClick = async () => {
    await redirectToAuthCodeFlow(clientId);
  };
  return (
    <>
      <h1> Brutalist Music</h1>
      <button onClick={handleClick}>Login</button>
    </>
  );
};

export default Nav;
