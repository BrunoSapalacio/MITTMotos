import { Link } from 'react-router-dom' // Cria rotas de páginas

//CSS
import './Main.css'

// Icones
import Profile from '../images/user.jpg'
import IconProfile from '../icons/user.svg'
import IconLogoff from '../icons/logoff.svg'

const Header = ({ user, homeScreen }) => {
    //const [users, setUsers] = useState([]);
    //const userCollectionRef = collection(db, "users");

  return (
    <div className='panel-top'>
        <div className='title'>
            <Link to="/"><h1>MITT Motos</h1></Link>
        </div>
        <div className='container-nav'>
            <img className='profile' src={Profile} alt="" />
            <ul className='nav'>
              {user && user.map((getUser) => (
                <p key={getUser.id} className='font-bold'>{getUser.name}</p>
              ))}
                <Link to='/profile'><img className='icon-profile' src={IconProfile} alt=''/>Meu perfil</Link>
                <Link to="" onClick={homeScreen}><img className='icon-loggof' src={IconLogoff} alt=''></img>Sair</Link>
            </ul>
        </div>
    </div>
  )
}

export default Header