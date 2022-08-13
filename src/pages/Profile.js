import { useEffect } from "react";
import { useForm } from "react-hook-form"; // cria formulário personalizado
import Swal from "sweetalert2"; // cria alertas personalizado
import * as yup from "yup"; // cria validações para formulário
import { yupResolver } from "@hookform/resolvers/yup"; // aplica as validações no formulário
import {
  getAuth,
  updateProfile,
  updatePassword,
  updateEmail,
} from "firebase/auth";

// Hooks
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
    email: yup
      .string()
      .required("O email é obrigatório")
      .email("Digite um email valido"),
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
  const auth = getAuth();

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

  const onError = (errors, e) => console.log(errors, e);

  const onSubmit = (userData) => {
    console.log(auth.currentUser);
    updateProfile(auth.currentUser, {
      displayName: userData.name,
    })
      .then(() => {
        updateEmail(auth.currentUser, userData.email)
          .then(() => {
            Swal.fire({
              title: "MITT Motos",
              text: "Perfil atualizado com sucesso!",
              icon: "success",
              showConfirmButton: true,
              confirmButtonColor: "#6393E8",
            }).then((result) => {
              if (result.isConfirmed) {
                document.location.replace("/");
              }
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "MITT Motos",
              html: "Foi verificado que você já está há um tempo logado no sistema. Por questões de segurança, refaça o login para poder atualizar o <strong>EMAIL.</strong>",
              icon: "warning",
              showConfirmButton: true,
              confirmButtonColor: "#6393E8",
            });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changePass = async () => {
    const { value: password } = await Swal.fire({
      title: "MITT Motos",
      input: "password",
      inputLabel: "Nova senha:",
      inputPlaceholder: "Digite a sua nova senha",
      confirmButtonColor: "#6393E8",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      inputAttributes: {
        maxlength: 10,
        autocapitalize: "off",
        autocorrect: "off",
      },
      inputValidator: (value) => {
        if (value.length < 6) {
          return "Insira pelo menos 6 caracteres";
        }
      },
    });

    if (password) {
      updatePassword(auth.currentUser, password)
        .then(() => {
          Swal.fire({
            title: "MITT Motos",
            text: "Senha atualizada com sucesso!",
            icon: "success",
            showConfirmButton: true,
            confirmButtonColor: "#6393E8",
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "MITT Motos",
            html: "Foi verificado que você já está há um tempo logado no sistema. Por questões de segurança, refaça o login para poder alterar a <strong>SENHA.</strong>",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonColor: "#6393E8",
          });
        });
    }
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
                  <span className="font-bold">{user.name}</span>
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
                  onSubmit={handleSubmit(onSubmit, onError)}
                >
                  <label>
                    <p>Nome:</p>
                    <input
                      style={errors.name && { borderColor: "red" }}
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
                      style={errors.email && { borderColor: "red" }}
                      type="text"
                      placeholder="Email do administrador"
                      {...register("email", { required: true })}
                    />{" "}
                    {errors.email && <span>{errors.email?.message}</span>}
                  </label>
                  <input
                    type="submit"
                    className="button-profile b-black"
                    value="ATUALIZAR"
                  />
                </form>
                <button className="button-profile b-green" onClick={changePass}>
                  ALTERAR SENHA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
