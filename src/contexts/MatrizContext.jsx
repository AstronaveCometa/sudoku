import React from 'react'
import { createContext, useState } from 'react'


const MatrizContext = () => {
    const [matriz, setMatriz] = useState([]);
    arregloNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    function mezclar(arreglo) {
        let indiceActual = arreglo.length;
        while (indiceActual != 0) {
            let indiceAleatorio = Math.floor(Math.random() * indiceActual);
            indiceActual--;
            [arreglo[indiceActual], arreglo[indiceAleatorio]] = [
                arreglo[indiceAleatorio], arreglo[indiceActual]];
        }
    }
    mezclar(arregloNumeros);
    console.log(arregloNumeros);
    return (
        <div>

        </div>
    )
}

export default MatrizContext
