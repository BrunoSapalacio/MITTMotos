import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // cria formulário personalizado
import axios from "axios"; // Cria conexao HTTP
import * as yup from "yup"; // cria validações para formulário
import { yupResolver } from "@hookform/resolvers/yup"; // aplica as validações no formulário
import Swal from "sweetalert2"; // cria alertas personalizado

// CSS
import "./Panel.css";

//Componentes
import Clients from "../components/Clients";
import Header from "../components/Header";

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

const Panel = ({ homeScreen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [clients, setClients] = useState([]);
  const url = "https://my-json-server.typicode.com/BrunoSapalacio/MITTMotos/bikes";

  useEffect(() => {
    // Pega os dados da API quando o state 'user' é atualizado
    async function getData() {
      try {
        const response = await axios.get(url);
        setClients(response.data);
        //console.log(typeof clients)
      } catch {
        console.log("Ocorreu um erro ao carregar os dados!");
      }
    }
    getData();
    console.log(clients);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (userData) => {
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
    if (plate === null) {
      try {
        console.log(userData);
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
            }).then((result) => {
              if (result.isConfirmed) {
                axios.post(url, userData);
                document.location.reload(true);
              }
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  console.log(errors);

  return (
    <div className="panel">
      <div className="header">
        <Header homeScreen={homeScreen}></Header>
        <div className="register-client">
          <h1 className="font-regular">Cadastro de Clientes</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid">
              <label>
                <input
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
                  type="text"
                  placeholder="Modelo e ano do veiculo"
                  {...register("vehicle", { required: true })}
                />
                {errors.vehicle && (
                  <span className="font-bold">{errors.vehicle?.message}</span>
                )}
              </label>
              <label>
                <input
                  type="number"
                  placeholder="Kilometragem"
                  {...register("km", { 
                    required: true,
                    onChange: (v) => Math.abs(v)
                  })}
                />
                {errors.km && (
                  <span className="font-bold">{errors.km?.message}</span>
                )}
              </label>
              <label>
                <input
                  type="text"
                  className="plate-text"
                  maxLength={7}
                  placeholder="Placa do veiculo"
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
