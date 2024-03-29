import { useForm } from "react-hook-form"; // cria formulário personalizado
import * as yup from "yup"; // cria validações para formulário
import { yupResolver } from "@hookform/resolvers/yup"; // aplica as validações no formulário
import Swal from "sweetalert2"; // cria alertas personalizado
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

//CSS
import "../style/pages/_home.scss";

// Hooks
import useAuth from "../hooks/useAuth";

const schema = yup
  .object({
    email: yup
      .string()
      .required("O email é obrigatório")
      .email("Digite um email valido"),
    pass: yup.string().required("A senha é obrigatório"),
  })
  .required();

const Login = ({ state }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const auth = getAuth();
  const { setUser } = useAuth();

  const onSubmit = async (userData) => {
    let errorMessageAuth;
    await signInWithEmailAndPassword(auth, userData.email, userData.pass)
      .then((userCredential) => {
        // Signed in
        document.location.replace("/");
        const userFB = userCredential.user;
        const { uid, displayName, email } = userFB;
        return setUser({
          id: uid,
          name: displayName,
          email: email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          errorMessageAuth = "Usuário não cadastrado.";
        } else if (errorCode === "auth/wrong-password") {
          errorMessageAuth = "Senha incorreta.";
        } else if (errorCode === "auth/too-many-requests") {
          errorMessageAuth =
            "O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login com falha. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.";
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
      });
  };

  return (
    <div>
      <h5>Seja bem vindo ao</h5>
      <h1>MITT Motos</h1>
      <h2 className="title-home">LOGIN</h2>
      <div className="content-loginAndRegister">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label-home">
            <div className="input-home">
              <input
                className="icon-email"
                style={
                  errors.email && {
                    backgroundColor: "rgb(251, 236, 242)",
                    border: "1px solid red",
                  }
                }
                type="text"
                placeholder="Digite o email"
                autoComplete="off"
                {...register("email")}
              />
            </div>
            {errors.email && <span>{errors.email?.message}</span>}
          </label>
          <label className="label-home">
            <div className="input-home">
              <input
                className="icon-pass"
                style={
                  errors.pass && {
                    backgroundColor: "rgb(251, 236, 242)",
                    border: "1px solid red",
                  }
                }
                type="password"
                placeholder="Digite a senha"
                autoComplete="off"
                {...register("pass")}
              />
            </div>
            {errors.pass && <span>{errors.pass?.message}</span>}
          </label>
          <input type="submit" className="button-login" value="LOGAR" />
          <p>Não possui uma conta? Clique abaixo para se cadastrar</p>
        </form>
        <button className="button-register" onClick={state}>
          CRIAR CONTA
        </button>
      </div>
    </div>
  );
};

export default Login;
