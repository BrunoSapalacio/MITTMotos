import { useEffect, useState } from "react";
import { useMask, presets } from "mask-hooks"; // cria mascara personalizada
import Swal from "sweetalert2"; // cria alertas personalizado
import db from "../firebase/Database";
import { doc, deleteDoc } from "firebase/firestore";

// CSS
import "../style/components/_clients.scss";

// Paginas
import EditClient from "../components/EditClient";
import InfoClient from "./InfoClient";

const Clients = ({ clients }) => {
  const cpf = useMask(presets.DOCUMENT_CPF); // transforma a string para o formato do cpf
  const phone = useMask(presets.PHONE_BR); // transforma a string para o formato do telefone/celular
  const [checkClient, setCheckClient] = useState(null);
  const [dataClient, setDataClient] = useState(null);
  const [search, setSearch] = useState("");
  const [clientSearch, setClientSearch] = useState(null);

  useEffect(() => {
    if (search.length === 0) {
      setCheckClient(null);
    }
  }, [search]);

  const deleteClients = async (id) => {
    // Deleta o cliente selecionado
    try {
      Swal.fire({
        title: "Aviso!",
        text: "Você deseja excluir o cliente?",
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
            text: "O Cliente selecionado foi excluido com sucesso.",
            icon: "success",
            showConfirmButton: true,
            confirmButtonColor: "#6393E8",
          }).then(async (result) => {
            if (result.isConfirmed) {
              const clientDoc = doc(db, "clients", id);
              await deleteDoc(clientDoc);
              document.location.reload(true);
            }
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const editClient = (client) => {
    // Exibe a tela de edição de clientes
    setCheckClient("edit");
    setDataClient(client);
  };

  const detailsClient = (client) => {
    // Exibe a tela de detalhes
    setCheckClient("details");
    setDataClient(client);
  };

  const searchPlate = (e) => {
    e.preventDefault();
    // Procura uma placa de veiculo no array dos clientes compativel com os dados da input
    const plate = clients.find(client => client.plate === search.toUpperCase());
    console.log(plate);
    if (plate) {
      setClientSearch(plate);
      setCheckClient("search");
    }
    else {
      Swal.fire({
        title: "MITT Motos",
        html: `A placa <strong>${search.toUpperCase()}</strong> não está registrada no sistema.`,
        icon: "warning",
        showConfirmButton: true,
        confirmButtonColor: "#6393E8",
      });
    }
  };

  return (
    <div className="clients">
      {(() => {
        switch (checkClient) {
          case "edit":
            return <EditClient client={dataClient}></EditClient>; // Chama o componente 'EditClient.js
          case "details":
            return <InfoClient client={dataClient}></InfoClient>; // Chama o componente 'InfoClient.js
          case "search":
            return (
              <>
                <div className="client-container">
                  <div className="client-header">
                    <h1 className="font-regular">Clientes</h1>
                    <form onSubmit={searchPlate}>
                      <label className="box-search">
                        <input
                          type="text"
                          className="search"
                          placeholder="Buscar Placa..."
                          required
                          onChange={(e) =>
                            setSearch(e.target.value.toLocaleUpperCase())
                          }
                        />
                        <button className="search-button"></button>
                      </label>
                    </form>
                  </div>
                  <ul className="client-container">
                    <div className="clients-flex">
                      <li key={clientSearch.id} className="client client-card">
                        <div className="client-buttons">
                          <button
                            className="client-edit"
                            onClick={() => editClient(clientSearch)}
                          ></button>
                          <button
                            className="client-close"
                            onClick={() => deleteClients(clientSearch.id)}
                          ></button>
                        </div>
                        <div className="client-content">
                          <div>
                            <h1 className="vehicle-plate">
                              {clientSearch.plate}
                            </h1>
                          </div>
                          <div className="client-prop">
                            <h4>PROPRIETÁRIO(A)</h4>
                            <p>Nome: {clientSearch.name}</p>
                            <p>CPF: {cpf(clientSearch.cpf)}</p>
                            <p>Telefone: {phone(clientSearch.phone)}</p>
                          </div>
                          <div className="client-bike">
                            <h4>MOTO</h4>
                            <p>Modelo: {clientSearch.vehicle}</p>
                            <p>
                              Kilometragem:{" "}
                              {clientSearch.km
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                              Km
                            </p>
                            <p>...</p>
                          </div>
                          <button
                            className="client-info font-bold"
                            onClick={() => detailsClient(clientSearch)}
                          >
                            + INFO
                          </button>
                        </div>
                      </li>
                    </div>
                  </ul>
                </div>
              </>
            );
          default:
            return (
              <div className="client-container">
                <div className="client-header">
                  <h1 className="font-regular">Clientes</h1>
                  <form onSubmit={searchPlate}>
                    <label className="box-search">
                      <input
                        type="text"
                        className="search"
                        placeholder="Buscar Placa..."
                        onChange={(e) => setSearch(e.target.value)}
                        required
                      />
                      <button className="search-button"></button>
                    </label>
                  </form>
                </div>
                <ul className="client-container">
                  <div className="clients-flex">
                    {clients &&
                      clients.map((client) => (
                        <li key={client.id} className="client client-card">
                          <div className="client-buttons">
                            <button
                              className="client-edit"
                              onClick={() => editClient(client)}
                            ></button>
                            <button
                              className="client-close"
                              onClick={() => deleteClients(client.id)}
                            ></button>
                          </div>
                          <div className="client-content">
                            <div>
                              <h1 className="vehicle-plate">{client.plate}</h1>
                            </div>
                            <div className="client-prop">
                              <h4>PROPRIETÁRIO(A)</h4>
                              <p>Nome: {client.name}</p>
                              <p>CPF: {cpf(client.cpf)}</p>
                              <p>Telefone: {phone(client.phone)}</p>
                            </div>
                            <div className="client-bike">
                              <h4>MOTO</h4>
                              <p>Modelo: {client.vehicle}</p>
                              <p>
                                Kilometragem:{" "}
                                {client.km
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                                Km
                              </p>
                              <p className="font-bold">...</p>
                            </div>
                            <button
                              className="client-info font-bold"
                              onClick={() => detailsClient(client)}
                            >
                              + INFO
                            </button>
                          </div>
                        </li>
                      ))}
                    {}
                  </div>
                </ul>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default Clients;
