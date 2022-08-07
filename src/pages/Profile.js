import { useEffect } from "react";
import { useForm } from "react-hook-form"; // cria formulário personalizado
//import Swal from "sweetalert2"; // cria alertas personalizado
import * as yup from "yup"; // cria validações para formulário
import { yupResolver } from "@hookform/resolvers/yup"; // aplica as validações no formulário
import { getAuth, updateProfile, updatePassword } from "firebase/auth";

import useAuth from "../hooks/useAuth";

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
      .min(3, "Insira pelo menos 3 caracteres/números")
      .required("A senha é obrigatório"),
    phone: yup
      .string()
      .required("O Telefone/Celular é obrigatório")
      .min(11, "Insira pelo menos 11 números"),
  })
  .required();

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { user } = useAuth();

  useEffect(() => {
    // faz a solicitação do servidor assíncrono e preenche o formulário
    setTimeout(() => {
      reset({
        name: user.name,
        email: user.email,
        pass: user.pass,
      });
    }, 0);
  }, [reset, user]);

  const onSubmit = (userData) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: userData.name,
      email: userData.email,
    })
      .then(() => {
        // Profile updated!
        console.log("Sucesso!");
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ...
      });
    updatePassword(auth.currentUser, userData.pass)
      .then(() => {
        // Update successful.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

  return (
    <div className="profile-container">
      <div className="panel">
        <div className="header">
          <Header></Header>
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
                    {user.name}
                    <p className="font-regular">{user.userType}</p>
                  </span>
                  <hr />
                  <p className="font-bold">ID</p>
                  <p>{user.id}</p>
                  <p className="font-bold">Email</p>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="profile-card-2">
                <h1>Meu perfil</h1>
                <form
                  className="profile-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <label>
                    <p>Nome:</p>
                    <input
                      type="text"
                      placeholder="Nome do administrador"
                      {...register("name", { required: true })}
                    />
                    {/*Joga os dados da input no objeto 'name'*/}
                    {errors.name && <span>{errors.name?.message}</span>}
                  </label>
                  <label>
                    <p>Email:</p>
                    <input
                      type="text"
                      placeholder="Email do administrador"
                      {...register("email", { required: true })}
                    />{" "}
                    {/*Joga os dados da input no objeto 'name'*/}
                    {errors.email && <span>{errors.email?.message}</span>}
                  </label>
                  <label>
                    <p>Senha:</p>
                    <input
                      type="text"
                      placeholder="Nome do proprietário"
                      {...register("pass", { required: true })}
                    />{" "}
                    {/*Joga os dados da input no objeto 'name'*/}
                    {errors.pass && <span>{errors.pass?.message}</span>}
                  </label>
                  <button className="client-info button-profile font-bold">
                    ATUALIZAR
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
