import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"; // cria formulário personalizado
import * as yup from "yup"; // cria validações para formulário
import { yupResolver } from "@hookform/resolvers/yup"; // aplica as validações no formulário
import Swal from "sweetalert2"; // cria alertas personalizado
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";

//CSS
import "../pages/Home.css";

const schema = yup
  .object({
    user: yup.string("Digite um nome válido").required("O nome é obrigatório"),
    mail: yup
      .string()
      .required("O email é obrigatório")
      .email("Digite um email valido"),
    pass: yup
      .string()
      .min(6, "Insira pelo menos 6 caracteres")
      .required("A senha é obrigatório"),
    passConfirm: yup
      .string()
      .oneOf([yup.ref("pass"), null], "As senhas não são iguais"),
  })
  .required();

const Register = ({ state }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (userData) => {
    let errorMessageAuth;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userData.mail, userData.pass)
      .then((userCredential) => {
        // Signed in
        updateProfile(auth.currentUser, {
          displayName: userData.user,
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
        Swal.fire({
          title: "MITT Motos",
          text: "A Conta foi cadastrada com sucesso.",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#6393E8",
        }).then((result) => {
          if (result.isConfirmed) {
            const auth = getAuth();
            signOut(auth)
              .then(() => {
              })
              .catch((error) => {
                console.log(error);
              });
            state(); 
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === "auth/email-already-in-use") {
          errorMessageAuth = "O Email já está em uso.";
        }
        if (errorCode) {
          Swal.fire({
            title: "MITT Motos",
            text: errorMessageAuth,
            icon: "error",
            showConfirmButton: true,
            confirmButtonColor: "#6393E8",
          });
        }
        // ..
      });
  };

  return (
    <div>
      <h5>Seja bem vindo ao</h5>
      <h1>MITT Motos</h1>
      <h2 className="title-home">CADASTRO</h2>
      <div className="content-login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label-home">
            <div className="input-home">
              <div className="icon-user"></div>
              <input
                type="text"
                placeholder="Digite o usuário"
                autoComplete="off"
                {...register("user")}
              />
            </div>
            {/*Joga os dados da input no objeto */}
            {errors.user && <span>{errors.user?.message}</span>}
          </label>
          <label className="label-home">
            <div className="input-home">
              <div className="icon-mail"></div>
              <input
                type="text"
                placeholder="Digite o email"
                autoComplete="off"
                {...register("mail")}
              />
            </div>
            {errors.mail && <span>{errors.mail?.message}</span>}
          </label>
          <label className="label-home">
            <div className="input-home">
              <div className="icon-pass"></div>
              <input
                type="password"
                placeholder="Digite a senha"
                autoComplete="off"
                {...register("pass")}
              />
            </div>
            {errors.pass && <span>{errors.pass?.message}</span>}
          </label>
          <label className="label-home">
            <div className="input-home">
              <div className="icon-pass"></div>
              <input
                type="password"
                placeholder="Confirme a sua senha"
                autoComplete="off"
                {...register("passConfirm")}
              />
            </div>
            {errors.passConfirm && <span>{errors.passConfirm?.message}</span>}
          </label>
          <input type="submit" className="BoxInput-1" value="CRIAR CONTA" />
        </form>
        <div>
          <p>Já tem uma conta?</p>
          <Link to="" onClick={state}>
            LOGAR
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
