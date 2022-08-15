import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // cria formulário personalizado
import * as yup from "yup"; // cria validações para formulário
import { yupResolver } from "@hookform/resolvers/yup"; // aplica as validações no formulário
import Swal from "sweetalert2"; // cria alertas personalizado
import db from "../firebase/Database";
import { collection, addDoc, getDocs } from "firebase/firestore";

// CSS
import "./Panel.css";

//Componentes
import Clients from "../components/Clients";
import Header from "../components/Header";

// Hooks
import useAuth from "../hooks/useAuth";

const schema = yup
  .object({
    name: yup.string("Digite um nome válido").required("O nome é obrigatório"),
    cpf: yup.string().required("O CPF é obrigatório").min(11, "CPF inválido"),
    phone: yup
      .string()
      .required("O Telefone/Celular é obrigatório")
      .min(10, "Telefone/Celular inválido"),
    vehicle: yup
      .string()
      .required("O nome do veículo é obrigatório")
      .min(3, "Veículo inválido"),
    km: yup
      .number()
      .required("A kilometragem é obrigatório")
      .typeError("A kilometragem é obrigatória")
      .min(0, "Km inválido"),
    plate: yup
      .string()
      .required("A placa é obrigatória")
      .min(7, "A placa deve ter pelo menos 7 digitos"),
  })
  .required();

const Panel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [clients, setClients] = useState([]);
  const clientsCollectionRef = collection(db, "clients");
  const { user } = useAuth();

  useEffect(() => {
    const getClientsAndUsers = async () => {
      const dataClients = await getDocs(clientsCollectionRef);
      setClients(
        dataClients.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getClientsAndUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (userData) => {
    try {
      let plate = null;
      clients &&
        // eslint-disable-next-line array-callback-return
        clients.map((client) => {
          if (client.plate === userData.plate) {
            Swal.fire({
              title: "MITT Motos",
              html: `A placa <strong>${userData.plate}</strong> já está cadastrada no sistema.`,
              icon: "warning",
              showConfirmButton: true,
              confirmButtonColor: "#6393E8",
            });
            plate = client.plate;
          }
        });
      if (!plate) {
        try {
          const today = new Date();
          let userDataNew = userData;
          const userCreated = {
            today: today.toLocaleDateString(),
            hoursMinutes: today.getHours() + ":" + today.getMinutes(),
            name: user.name,
          };
          const userUpdate = {
            name: "",
            today: "",
            hoursMinutes: "",
          };
          userDataNew.create = userCreated;
          userDataNew.update = userUpdate;
          // Função que manda os dados para a API
          Swal.fire({
            title: "MITT Motos",
            text: "Você deseja cadastrar o cliente?",
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
                text: "O Cliente foi cadastrado com sucesso.",
                icon: "success",
                showConfirmButton: true,
                confirmButtonColor: "#6393E8",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  await addDoc(clientsCollectionRef, userDataNew);
                  document.location.reload(true);
                }
              });
            }
          });
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="panel">
      <div className="header">
        <Header></Header>
        <div className="register-client">
          <h1 className="font-regular">Cadastro de Clientes</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <label>
                <input
                  style={
                    errors.name && {
                      backgroundColor: "rgb(251, 236, 242)",
                      border: "1px solid red",
                    }
                  }
                  type="text"
                  placeholder="Nome do proprietário"
                  {...register("name", { required: true })}
                />
                {/*Joga os dados da input no objeto 'name'*/}
                {errors.name && (
                  <span className="font-bold">{errors.name?.message}</span>
                )}
              </label>
              <label>
                <input
                  style={
                    errors.cpf && {
                      backgroundColor: "rgb(251, 236, 242)",
                      border: "1px solid red",
                    }
                  }
                  maxLength={11}
                  placeholder="CPF"
                  {...register("cpf", {
                    required: true,
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                />
                {errors.cpf && (
                  <span className="font-bold">{errors.cpf?.message}</span>
                )}
              </label>
              <label>
                <input
                  style={
                    errors.phone && {
                      backgroundColor: "rgb(251, 236, 242)",
                      border: "1px solid red",
                    }
                  }
                  maxLength={10}
                  placeholder="Telefone / Celular"
                  {...register("phone", {
                    required: true,
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                />
                {errors.phone && (
                  <span className="font-bold">{errors.phone?.message}</span>
                )}
              </label>
              <label>
                <input
                  style={
                    errors.vehicle && {
                      backgroundColor: "rgb(251, 236, 242)",
                      border: "1px solid red",
                    }
                  }
                  type="text"
                  placeholder="Modelo e ano da moto"
                  {...register("vehicle", { required: true })}
                />
                {errors.vehicle && (
                  <span className="font-bold">{errors.vehicle?.message}</span>
                )}
              </label>
              <label>
                <input
                  style={
                    errors.km && {
                      backgroundColor: "rgb(251, 236, 242)",
                      border: "1px solid red",
                    }
                  }
                  type="number"
                  placeholder="Kilometragem"
                  {...register("km", {
                    required: true,
                    onChange: (v) => Math.abs(v),
                  })}
                />
                {errors.km && (
                  <span className="font-bold">{errors.km?.message}</span>
                )}
              </label>
              <label>
                <input
                  style={
                    errors.plate && {
                      backgroundColor: "rgb(251, 236, 242)",
                      border: "1px solid red",
                    }
                  }
                  type="text"
                  className="plate-text"
                  maxLength={7}
                  placeholder="Placa da moto"
                  {...register("plate", {
                    required: true,
                    setValueAs: (v) => v.toUpperCase(),
                  })}
                />
                {errors.plate && (
                  <span className="font-bold">{errors.plate?.message}</span>
                )}
              </label>
            </div>
            <input className="submit" type="submit" value="CADASTRAR" />
          </form>
        </div>
      </div>
      <Clients clients={clients}></Clients>
    </div>
  );
};

export default Panel;
