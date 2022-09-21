import { useMask, presets } from "mask-hooks"; // Cria mascara personalizada

//CSS
import "../style/components/_infoClient.scss";

const InfoClient = ({ client }) => {
  const cpf = useMask(presets.DOCUMENT_CPF); // Transforma a string para o formato do cpf
  const phone = useMask(presets.PHONE_BR); // Transforma a string para o formato do telefone/celular

  const close = () => {
    document.location.reload(true); // Reinicia a pagina
  };

  return (
    <div className="edit-client">
      <h1>
        Informações do(a) Cliente{" "}
        <span className="client-title-info">{client.name}</span>
      </h1>
      <div className="client edit-card info-box">
        <div className="client-buttons">
          <button className="client-close" onClick={() => close()}></button>
        </div>
        <div className="client-content">
          <div>
            <h1 className="vehicle-plate">{client.plate}</h1>
          </div>
          <div className="client-prop-info">
            <h4 className="info-title">PROPRIETÁRIO(A)</h4>
            <p>Nome: {client.name}</p>
            <p>CPF: {cpf(client.cpf)}</p>
            <p>Telefone: {phone(client.phone)}</p>
          </div>
          <div className="client-prop-info">
            <h4 className="info-title">MOTO</h4>
            <p>Modelo: {client.vehicle}</p>
            <p>
              Kilometragem:{" "}
              {client.km
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
              Km
            </p>{" "}
          </div>
          <div className="client-prop-info">
            <h4 className="info-title">REGISTRO</h4>
            <p>Cadastro criado pelo(a): {client.create.name}</p>
            <p>Data: {client.create.today}</p>
            <p>Horário: {client.create.hoursMinutes}</p>
            <br />
            {client.update.name !== "" && (
              <strong className="info-update">
                <p>
                  *Cadastro atualizado pelo(a): {client.update.name}*
                </p>
                <p>Data: {client.update.today}</p>
                <p>Horário: {client.update.hoursMinutes}</p>
              </strong>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoClient;
