import { Link } from "react-router-dom"; // Cria rotas de páginas
import { getAuth, signOut } from "firebase/auth";

// Hooks
import useAuth from "../hooks/useAuth";

//CSS
import "../style/components/_header.scss";

// Icones
import Profile from "../images/user.jpg";
import IconProfile from "../icons/user.svg";
import IconLogoff from "../icons/logoff.svg";

const Header = () => {
  const { user } = useAuth();

  const logoff = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const returnPanel = () => {
    document.location.replace("/");
  };

  return (
    <div className="panel-top">
      <div className="title">
        <Link to="" onClick={returnPanel}>
          <h1>MITT Motos</h1>
        </Link>
      </div>
      <div className="container-nav">
        <img className="profile" src={Profile} alt="" />
        <ul className="nav">
          <p className="font-bold">{user.name}</p>
          <Link to="/profile">
            <img className="icon-profile" src={IconProfile} alt="" />
            Meu perfil
          </Link>
          <Link to="" onClick={logoff}>
            <img className="icon-loggof" src={IconLogoff} alt=""></img>Sair
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
