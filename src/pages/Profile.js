import { useEffect } from "react";
import { useForm } from "react-hook-form"; // cria formulário personalizado
import axios from "axios"; // Cria conexao HTTP
import Swal from "sweetalert2"; // cria alertas personalizado
import * as yup from "yup"; // cria validações para formulário
import { yupResolver } from "@hookform/resolvers/yup"; // aplica as validações no formulário
import { useMask, presets } from "mask-hooks"; // cria mascara personalizada

// Componentes
import Header from "../components/Header";

// CSS
import "./Profile.css";

// Imagens
import profile from "../images/user.jpg";

const schema = yup
  .object({
    name: yup.string("Digite um nome válido").required("O nome é obrigatório"),
    mail: yup
      .string()
      .required("O email é obrigatório")
      .email("Digite um email valido"),
    pass: yup
      .string()
      .min(3, 'Insira pelo menos 3 caracteres/números')
      .required("A senha é obrigatório"),
    phone: yup
      .string()
      .required("O Telefone/Celular é obrigatório")
      .min(11, 'Insira pelo menos 11 números'),
  })
  .required();

const Profile = ({ users, homeScreen }) => {
  const { register,handleSubmit,formState: { errors }, reset} = useForm({
    resolver: yupResolver(schema),
  });
  const phone = useMask(presets.PHONE_BR); // transforma a string para o formato do telefone/celular
  const url = "http://localhost:3000/users";

  useEffect(() => {
    // faz a solicitação do servidor assíncrono e preenche o formulário
    setTimeout(() => {
      reset({
        user: "admin",
        name: users.name,
        mail: users.mail,
        pass: users.pass,
        phone: users.phone,
        login: users.login
      });
    },0);
  }, [reset, users]);

  const onSubmit = (userData) => {
    console.log(userData);
    Swal.fire({
      title: "MITT Motos",
      text: "Você deseja alterar os dados do usuário?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#65B553",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "MITT Motos",
          text: "O usuário administrador foi atualizado com sucesso.",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#6393E8",
        }).then((result) => {
          if (result.isConfirmed) {
            axios.post(url, userData);
            document.location.reload(true);
          }
        });
      }
    });
  };

  return (
    <div className="profile-container">
      <div className="panel">
        <div className="header">
          <Header homeScreen={homeScreen}></Header>
        </div>
        <div className="profile-box">
        <div className="profile-content">
          <div className="profile-grid">
            <div className="profile-card-1">
              <div className="profile-img">
                <img src={profile} alt="" />
              </div>
              <div className="profile-info">
                <span className="font-bold">
                  {users.name}<p className="font-regular">Administrador</p>
                </span>
                <hr />
                <p className="font-bold">Email</p>
                <p>{users.mail}</p>
                <p className="font-bold">Senha</p>
                <p>{users.pass}</p>
                <p className="font-bold">Telefone</p>
                <p>{phone(users.phone)}</p>
              </div>
            </div>
            <div className="profile-card-2">
              <h1>Meu perfil</h1>
              <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
                <label>
                <p>Nome:</p>
                <input
                  type="text"
                  placeholder="Nome do administrador"
                  {...register("name", { required: true })}
                />{" "}
                {/*Joga os dados da input no objeto 'name'*/}
                {errors.name && (
                  <span>{errors.name?.message}</span>
                )}
                </label>
                <label>
                <p>Email:</p>
                <input
                  type="text"
                  placeholder="Email do administrador"
                  {...register("mail", { required: true })}
                />{" "}
                {/*Joga os dados da input no objeto 'name'*/}
                {errors.mail && (
                  <span>{errors.mail?.message}</span>
                )}
                </label>
                <label>
                <p>Senha:</p>
                <input
                  type="text"
                  placeholder="Nome do proprietário"
                  {...register("pass", { required: true })}
                />{" "}
                {/*Joga os dados da input no objeto 'name'*/}
                {errors.pass && (
                  <span>{errors.pass?.message}</span>
                )}
                </label>
                <label>
                <p>Telefone:</p>
                <input
                  type="text"
                  maxLength = {11}
                  placeholder="Nome do proprietário"
                  {...register("phone", { required: true })}
                />{" "}
                {/*Joga os dados da input no objeto 'name'*/}
                {errors.phone && (
                  <span>{errors.phone?.message}</span>
                )}
                </label>
                <button
                  className="client-info button-profile font-bold"
                  >SALVAR
                </button>
              </form>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
