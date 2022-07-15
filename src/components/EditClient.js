import React, { useState , useEffect } from 'react'
import axios from 'axios' // Cria conexao HTTP
import { useForm } from "react-hook-form"; // cria formulário personalizado
import { yupResolver } from "@hookform/resolvers/yup"; // aplica as validações no formulário
import * as yup from "yup"; // cria validações para formulário
import Swal from 'sweetalert2' // cria alerts personalizado

//CSS
import './Main.css'

const schema = yup
  .object({
    name: yup.string("Digite um nome válido").required("O nome é obrigatório"),
    cpf: yup
      .string()
      .required("O CPF é obrigatório")
      .min(11, "O CPF deve ter pelo menos 11 números"),
    phone: yup
      .string()
      .required("O Telefone/Celular é obrigatório")
      .min(10, "O Telefone deve ter pelo menos 11 números"),
    vehicle: yup.string().required("O nome do veículo é obrigatório").min(3, "Veículo inválido"),
    km: yup.number().required("A kilometragem é obrigatório").min(1).typeError("A kilometragem é obrigatória"),
    plate: yup.string().required("A placa é obrigatória").min(7,"A placa deve ter pelo menos 7 digitos"),
  })
  .required();

const EditClient = ( dataClient ) => {
    const { register,handleSubmit,formState: { errors }, reset} = useForm({
        resolver: yupResolver(schema),
      });
    const [client] = useState(dataClient)
    console.log(dataClient)
    console.log(client.client.id)

      useEffect(() => {
        // faz a solicitação do servidor assíncrono e preenche o formulário
        setTimeout(() => {
          reset({
            name: dataClient.client.name,
            cpf: dataClient.client.cpf,
            phone: dataClient.client.phone,
            vehicle: dataClient.client.vehicle,
            km: dataClient.client.km,
            plate: dataClient.client.plate,
          });
        },0);
      }, [reset, dataClient]);


      const close = () => {
        Swal.fire({
            title: 'MITT Motos',
            text: "Você deseja cancelar a edição?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#65B553',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
          }).then((result) => {
            if (result.isConfirmed) {
                document.location.reload(true)
            }
        })
      }

      const onSubmit = (userData) => {
        console.log(userData)
        try {
            Swal.fire({
                title: 'MITT Motos',
                text: "Você deseja alterar os dados do cliente?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#65B553',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não'
              }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire( {
                        title: 'MITT Motos',
                        html: `Os dados do Cliente <strong>${userData.name}</strong> foi alterado com sucesso.`,
                        icon: 'success',
                        showConfirmButton: true,
                        confirmButtonColor: '#6393E8'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axios.put(`http://localhost:3000/bikes/${client.client.id}/`, { 
                            name: userData.name,
                            cpf: userData.cpf,
                            phone: userData.phone,
                            vehicle: userData.vehicle,
                            km: userData.km,
                            plate: userData.plate
                         })
                            document.location.reload(true)
                        }})
                }
              })
        } catch (error) {

        }
      }
  

  return (
    <div className='edit-client'>
        <h1>Editar Cliente {client.client.id}</h1>
        <div className='client edit-card'>
        <div className='client-buttons'>
            <button className='client-close' onClick={() => close()}></button>
        </div>
        <div>
        <label className='plate'>
            <p>Placa:</p>
            <input
                className='vehicle-plate'
                type="text"
                maxLength={7}
                placeholder="Placa"
                {...register("plate", { required: true })}
                />{/*Joga os dados da input no objeto 'name'*/}
                {errors.plate && (
                <span>{errors.plate?.message}</span>
                )}
            </label>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='client-prop-edit'>
                    <h4>PROPRIETÁRIO(A)</h4>
                    <label>
                        <p>Nome:</p>
                        <input
                        type="text"
                        placeholder="Nome do cliente"
                        {...register("name", { required: true })}
                        />{" "}
                        {/*Joga os dados da input no objeto 'name'*/}
                        {errors.name && (
                        <span>{errors.name?.message}</span>
                        )}
                    </label>
                    <label>
                        <p>CPF:</p>
                        <input
                        maxLength={11}
                        placeholder="CPF do cliente"
                        {...register("cpf", { 
                            required: true,
                            valueAsNumber: true,
                            validate: (value) => value > 0,
                        })}
                        />{" "}
                        {/*Joga os dados da input no objeto 'name'*/}
                        {errors.cpf && (
                        <span>{errors.cpf?.message}</span>
                        )}
                    </label>
                    <label>
                        <p>Telefone:</p>
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
                        <span>{errors.phone?.message}</span>
                        )}
                    </label>
                    <h4>MOTO</h4>
                    <label>
                        <p>Modelo:</p>
                        <input
                        type="text"
                        placeholder="Veículo do cliente"
                        {...register("vehicle", { required: true })}
                        />{" "}
                        {/*Joga os dados da input no objeto 'name'*/}
                        {errors.vehicle && (
                        <span>{errors.vehicle?.message}</span>
                        )}
                    </label>
                    <label>
                        <p>Kilometragem:</p>
                        <input
                        placeholder="Kilometragem do veículo"
                        {...register("km", { 
                            required: true,
                            valueAsNumber: true,
                            validate: (value) => value > 0,
                        })}
                        />{" "}
                        {/*Joga os dados da input no objeto 'name'*/}
                        {errors.km && (
                        <span>{errors.km?.message}</span>
                        )}
                    </label>
                    <button className='client-info button-edit font-bold'>CONFIRMAR</button>
                </form>
            </div>
    </div>
  )
}

export default EditClient