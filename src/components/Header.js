import { useEffect, useState } from 'react'
import axios from 'axios'; // Cria conexao HTTP
import { Link } from 'react-router-dom' // Cria rotas de páginas

//CSS
import './Main.css'

// Icones
import Profile from '../images/user.jpg'
import IconProfile from '../icons/user.svg'
import IconLogoff from '../icons/logoff.svg'

const Header = ({ homeScreen }) => {
    const [users, setUsers] = useState([]);
    const url = "https://my-json-server.typicode.com/BrunoSapalacio/MITTMotos/users";

    useEffect(() => { // Pega os dados da API quando o state 'user' é atualizado
        async function getData() {
          const response = await axios.get(url)
            setUsers(response.data);
        }
        getData()
        console.log(users)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

  return (
    <div className='panel-top'>
        <div className='title'>
            <Link to="/"><h1>MITT Motos</h1></Link>
        </div>
        <div className='container-nav'>
            <img className='profile' src={Profile} alt="" />
            <ul className='nav'>
                <p className='font-bold'>{users.name}</p>
                <Link to='/profile'><img className='icon-profile' src={IconProfile} alt=''/>Meu perfil</Link>
                <Link to="" onClick={homeScreen}><img className='icon-loggof' src={IconLogoff} alt=''></img>Sair</Link>
            </ul>
        </div>
    </div>
  )
}

export default Header