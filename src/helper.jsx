//obtiene la diferencia de años

export function obtenerDiferenciaYear(year){
    return new Date().getFullYear() - year;
}

// calcula el total a pagar según la marca

export function calculaMarca(marca){
    let incremento;

    switch(marca){
        case 'europeo':
            incremento = 1.30;
            break;
        case 'americano':
        incremento = 1.15;
            break;

        case 'asiatico':
            incremento = 1.05;
            break;
        
        default:
            break;
    }

    return incremento;

}

//calcular el tipo de seguro

export function obtenerPlan(plan){
    return (plan === 'basico') ? 1.20 : 1.50;
}

//Letra mayuscula al principio en el resultado

export function primeraMayuscula (texto){
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}