import { useState, useEffect } from "react";
import axios from "axios"; // Cria conexao HTTP
import { useForm } from "react-hook-form"; // cria formulário personalizado
import Swal from "sweetalert2"; // cria alertas personalizado

//Imagem
import People from "../images/People.jpg";

//CSS
import "./Home.css";

const Home = () => {
  const { register,handleSubmit, reset} = useForm();
  const [users, setUsers] = useState([]);
  const url = "https://my-json-server.typicode.com/BrunoSapalacio/MITTMotos/users";

  useEffect(() => {
    // faz a solicitação do servidor assíncrono e preenche o formulário
    setTimeout(() => {
      async function getData() {
        const response = await axios.get(url);
        setUsers(response.data);
      }
      getData();
      reset({
        user: users.user,
        pass: users.pass
      });
    },0);
  }, [reset, users.pass, users.user]);

  const onSubmit = async (userData) => {
    console.log(userData)
    //e.preventDefault()
    if (userData.user === users.user && userData.pass === users.pass) {
      Swal.fire({
        title: "Logado com sucesso!",
        icon: "success",
        showConfirmButton: false,
      });
      setTimeout(() => panelScreen(), 2000);
    } else {
      Swal.fire({
        title: "MITT Motos",
        text: "Usuário ou senha incorreta!",
        icon: "error",
        showConfirmButton: true,
        confirmButtonColor: "#6393E8",
      });
    }
  };

  const panelScreen = async () => {// Muda para a tela de painel
    try {
      axios.patch(url, { login: true });
      document.location.reload(true);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="content">
      {/* Imagem home */}
      <div className="image">
        <img src={People} alt="Pessoa" />
      </div>
      {/* Login */}
        <div className="login">
          <div>
            <h1>MITT Motos</h1>
            <div className="info-login">
              <h3>Informações de acesso</h3>
              <p>Usuário: {users.user}</p>
              <p>Senha: {users.pass}</p>
              </div>
            <h2>Login</h2>
            <div className="content-login">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="input-icon-user">
                  <div></div>
                  <input
                  type="text"
                  placeholder="Digite o usuário"
                  {...register("user")}/>
                </label>
                <label className="input-icon-pass">
                  <div></div>
                  <input
                  type="password"
                  placeholder="Digite a senha"
                  {...register("pass")}/>
                </label>
                <input type="submit" className="BoxInput-2" value="LOGAR" />
              </form>
            </div>
          </div>
          <p>© Bruno Sapalacio</p>
        </div>
    </div>
  );
};

export default Home;
