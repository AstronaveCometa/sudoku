import React from 'react'
import { createContext, useState } from 'react'

export const MatrizContext = createContext();

const MatrizProvider = ({ children }) => {
    const [matriz, setMatriz] = useState([]);

    function mezclar(arreglo) {
        let indiceActual = arreglo.length;
        while (indiceActual != 0) {
            let indiceAleatorio = Math.floor(Math.random() * indiceActual);
            indiceActual--;
            [arreglo[indiceActual], arreglo[indiceAleatorio]] = [
                arreglo[indiceAleatorio], arreglo[indiceActual]];
        }
    }

    function matrizAleatoria() {
        let arregloNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        mezclar(arregloNumeros);
        let matrizA = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                matrizA[i][j] = arregloNumeros[0];
                arregloNumeros.shift();
            }
        }
        return matrizA;
    }

    function arregloAleatorio() {
        let arregloNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        mezclar(arregloNumeros);
        return arregloNumeros;
    }

    function correrArreglo(arreglo) {
        let primero = arreglo[0];
        for (let i = 0; i < arreglo.length - 1; i++) {
            arreglo[i] = arreglo[i + 1];
        }
        arreglo[arreglo.length - 1] = primero;
    }

    function chequearFila(fila, numero) {
        if (matrizEspejo[fila].includes(numero)) {
            return true;
        } else {
            return false;
        }
    }

    function chequearColumna(columna, numero) {
        for (let i = 0; i < 9; i++) {
            if (matrizEspejo[i][columna] === numero) {
                return true;
            }
        }
        return false;
    }

    //Matriz que se irá modificando poco a poco para finalmente igualarla a la matriz solución
    let matrizEspejo = [[0, 0, 0, 0, 0, 0, 0, 0, 0], //Fila 1
    [0, 0, 0, 0, 0, 0, 0, 0, 0], //Fila 2
    [0, 0, 0, 0, 0, 0, 0, 0, 0], //Fila 3
    [0, 0, 0, 0, 0, 0, 0, 0, 0], //Fila 4
    [0, 0, 0, 0, 0, 0, 0, 0, 0], //Fila 5
    [0, 0, 0, 0, 0, 0, 0, 0, 0], //Fila 6
    [0, 0, 0, 0, 0, 0, 0, 0, 0], //Fila 7
    [0, 0, 0, 0, 0, 0, 0, 0, 0], //Fila 8
    [0, 0, 0, 0, 0, 0, 0, 0, 0]]; //Fila 9

    //Matriz A
    let matrizRandom = matrizAleatoria();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            matrizEspejo[i][j] = matrizRandom[i][j];
        }
    }

    //Matriz E
    matrizRandom = matrizAleatoria();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            matrizEspejo[i + 3][j + 3] = matrizRandom[i][j];
        }
    }

    //Matriz I
    matrizRandom = matrizAleatoria();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            matrizEspejo[i + 6][j + 6] = matrizRandom[i][j];
        }
    }

    console.log("Matriz Espejo Inicial:");
    console.log(matrizEspejo);

    //Matriz B


    let arregloFila = matrizEspejo[0];

    if (arregloFila.includes(numero)){
        console.log("Está el número: " + numero);
    } else {
        console.log("No está el número: " + numero);
    }


    return (
        <MatrizContext.Provider value={{ matriz }}>
            {children}
        </MatrizContext.Provider>
    )
}

export default MatrizProvider;
