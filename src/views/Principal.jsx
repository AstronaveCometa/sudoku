import React from 'react'
import { useContext } from 'react'
import { MatrizContext } from '../contexts/MatrizContext'

const principal = () => {

  const { matriz } = useContext(MatrizContext);
  return (
    <div>
      {/* <table>
      <tbody>
        {matriz.map((fila, indiceFila) => (
          <tr key={indiceFila}>
            {fila.map((celda, indiceCelda) => (
              <td key={indiceCelda}>
                {celda}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
 */}    </div>
          
  )
}

export default principal
