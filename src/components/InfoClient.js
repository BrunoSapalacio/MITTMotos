import { useMask, presets } from "mask-hooks"; // Cria mascara personalizada

//CSS
import "./Main.css";

const InfoClient = (dataClient) => {
  console.log(dataClient.client.update)
  const cpf = useMask(presets.DOCUMENT_CPF); // Transforma a string para o formato do cpf
  const phone = useMask(presets.PHONE_BR); // Transforma a string para o formato do telefone/celular

  const close = () => {
    document.location.reload(true); // Reinicia a pagina
  };

  return (
    <div className="edit-client">
      <h1>Informações do Cliente {dataClient.client.name}</h1>
      <div className="client edit-card info-box">
        <div className="client-buttons">
          <button className="client-close" onClick={() => close()}></button>
        </div>
        <div className="client-content">
          <div>
            <h1 className="vehicle-plate">{dataClient.client.plate}</h1>
          </div>
          <div className="client-prop-edit">
            <h4 className="info-title">PROPRIETÁRIO(A)</h4>
            <p>Nome: {dataClient.client.name}</p>
            <p>CPF: {cpf(dataClient.client.cpf)}</p>
            <p>Telefone: {phone(dataClient.client.phone)}</p>
          </div>
          <div className="client-prop-edit">
            <h4 className="info-title">MOTO</h4>
            <p>Modelo: {dataClient.client.vehicle}</p>
            <p>
              Kilometragem:{" "}
              {dataClient.client.km
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
              Km
            </p>{" "}
          </div>
          <div className="client-prop-edit">
            <h4 className="info-title">REGISTRO</h4>
            <p>Cadastro criado pelo(a): {dataClient.client.create.name}</p>
            <p>Data: {dataClient.client.create.today}</p>
            <p>Horário: {dataClient.client.create.hoursMinutes}</p>
            <br/>
            {dataClient.client.update.name !== '' &&
            <strong className="info-update">
              <p>*Cadastro atualizado pelo(a): {dataClient.client.update.name}*</p>
              <p>Data: {dataClient.client.update.today}</p>
              <p>Horário: {dataClient.client.update.hoursMinutes}</p>
            </strong> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoClient;
