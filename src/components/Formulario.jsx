import React, { useState } from 'react'
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, calculaMarca, obtenerPlan } from '../helper';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio= styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838f; 
    font-size: 16px;
    width: 100%;
    color: #fff;
    padding: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover{
        cursor: pointer;
        background-color: #26c6da;
    }

`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 94%;
    text-align: center;
    margin-bottom: 2rem;
`;


const Formulario = ({guardarResumen, guardarCargando}) => {

    //crear state

    const[ datos, guardarDatos ] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    //error

    const [ error, guardarError  ] = useState (false);

    //Extraer valores del state
    const { marca, year, plan } = datos;


    //Leer datos del formulario y colocarlos en el state

    const obtenerInformacion = e =>{
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    //cuando da click en submit

    const cotizarSeguro = e =>{
        e.preventDefault();

        if ( marca.trim() === '' || year.trim()=== '' || plan.trim()===''){
            guardarError(true);
            return
        }
        guardarError(false);

        //iniciamos con base 2000

        let resultado = 2000;

        //obtener diferencia de años

        const diferencia = obtenerDiferenciaYear(year);
        // por cada año restar el 3% del valor

        resultado -=(( diferencia * 3)* resultado)/100;

        // cada marca tiene un incremento
        // Americano 15%
        // Asiatico 5%
        // Europeo 30%

        resultado = calculaMarca(marca) * resultado
        //Básico aumenta 20%
        // Completo aumenta 50%
        
        const incrementoPlan = obtenerPlan (plan)

        resultado =  parseFloat(resultado * incrementoPlan ).toFixed(2)


        guardarCargando(true);

        setTimeout(()=>{

            //elimina el spiner
            guardarCargando(false);

            //pasa la infomración al componente principal
        
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            })
        }, 3000);

     


        //Total

    }


    return ( 
        <form
            onSubmit={cotizarSeguro}
        >
            { error ? <Error>Todos los campos son obligatorios</Error>: null}

            <Campo>
                <Label> Marca </Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">--Seleccione--</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiático</option>
                </Select>
            </Campo>

            <Campo>
                <Label> Año </Label>
                <Select
                  name="year"
                  value= {year}
                  onChange={obtenerInformacion}
                  >
                <option value="">-- Seleccione --</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label> Plan </Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan ==="basico"}
                    onChange={obtenerInformacion}

                />Básico

                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan ==="completo"}
                    onChange={obtenerInformacion}

                />Completo
               
            </Campo>

            <Boton type="submit"> Cotizar </Boton>

        </form>


     );
}

Formulario.propTypes={
    guardarResumen: PropTypes.func.isRequired,
    guardarResumen: PropTypes.func.isRequired
}
 
export default Formulario;