import React from 'react'
import { createContext, useState, useEffect } from 'react'

export const MatrizContext = createContext();

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

const MatrizProvider = ({ children }) => {

    const [matriz, setMatriz] = useState([]);

    const chequearFila = (matriz, fila, numero) => {
        return matriz[fila].includes(numero);
    }

    const chequearColumna = (matriz, columna, numero) => {
        for (let i = 0; i < 9; i++) {
            if (matriz[i][columna] === numero) {
                return true;
            }
        }
        return false;
    }

    const emergencia = (matriz, filaInicio, filaFin, columnaInicio, columnaFin, numeroRechazado) => {
        for (let i = filaInicio; i < filaFin; i++) {
            for (let j = columnaInicio; j < columnaFin; j++) {
                if (chequearFila(matriz, i, numeroRechazado)){
                    i++;
                }
                else if (chequearColumna(matriz, j, numeroRechazado)){
                    j++;
                }
                else {
                    console.log(`matriz[${i}][${j}] tiene el número ${matriz[i][j]}`);
                    let temp = matriz[i][j];
                    matriz[i][j] = numeroRechazado;
                    console.log(`Emergencia swap: Colocado ${numeroRechazado} en posición [${i}][${j}]`);
                    console.log(`Sacado ${temp} de posición [${i}][${j}]`);
                    return temp;
                }
            }
        }
    }

    const llenarMatrizSecundaria = (matriz, filaInicio, filaFin, columnaInicio, columnaFin) => {
        let arregloTemporal = arregloAleatorio();
        let tempMatriz = JSON.parse(JSON.stringify(matriz));
        let contador = 0;
        for (let i = filaInicio; i < filaFin; i++) {
            for (let j = columnaInicio; j < columnaFin; j++) {
                let indicador = true;
                while (indicador && contador < arregloTemporal.length) {
                    console.log(`contador: ${contador}`);
                    console.log(`Largo del arreglo ${arregloTemporal.length}`);
                    contador++;
                    if (chequearFila(tempMatriz, i, arregloTemporal[0])) {
                        correrArreglo(arregloTemporal);
                    } else if (chequearColumna(tempMatriz, j, arregloTemporal[0])) {
                        correrArreglo(arregloTemporal);
                    } else {
                        tempMatriz[i][j] = arregloTemporal[0];
                        arregloTemporal.shift();
                        console.log(`Colocado ${tempMatriz[i][j]} en posición [${i}][${j}]`);
                        indicador = false;
                        contador = 0;
                    }
                    if (contador > arregloTemporal.length) {
                        /* tempMatriz[i][j] = emergencia(tempMatriz, filaInicio, filaFin, columnaInicio, columnaFin, arregloTemporal[0]);
                        contador = 0;
                        arregloTemporal.shift();
                        indicador = false;
                        console.log(`Emergencia: Colocado ${tempMatriz[i][j]} en posición [${i}][${j}]`); */
                        console.log("contador excedido, no se pudo llenar la matriz secundaria");
                        indicador = false;
                        contador = 0;
                    }

                }
            }
        }
        return tempMatriz;
    }

    useEffect(() => {
        let matrizEspejo = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]];

        let matrizRandom = matrizAleatoria();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                matrizEspejo[i][j] = matrizRandom[i][j];
            }
        }

        matrizRandom = matrizAleatoria();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                matrizEspejo[i + 3][j + 3] = matrizRandom[i][j];
            }
        }

        matrizRandom = matrizAleatoria();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                matrizEspejo[i + 6][j + 6] = matrizRandom[i][j];
            }
        }

        matrizEspejo = llenarMatrizSecundaria(matrizEspejo, 0, 3, 3, 6); // B
        matrizEspejo = llenarMatrizSecundaria(matrizEspejo, 3, 6, 0, 3); // D
        matrizEspejo = llenarMatrizSecundaria(matrizEspejo, 3, 6, 6, 9); // F
        matrizEspejo = llenarMatrizSecundaria(matrizEspejo, 6, 9, 3, 6); // H
        matrizEspejo = llenarMatrizSecundaria(matrizEspejo, 0, 3, 6, 9); // C
        matrizEspejo = llenarMatrizSecundaria(matrizEspejo, 6, 9, 0, 3); // G
        console.log("Matriz generada:");
        console.log(matrizEspejo);
        setMatriz(matrizEspejo);
    }, []);

    return (
        <MatrizContext.Provider value={{ matriz }}>
            {children}
        </MatrizContext.Provider>
    )
}

export default MatrizProvider;