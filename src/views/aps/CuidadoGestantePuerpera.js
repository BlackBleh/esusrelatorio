import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const CuidadoGestantePuerpera = () => {
  return (
    <CCard>
      <CCardHeader>
        <h2>C.3. Cuidado da Gestante e Puérpera</h2>
      </CCardHeader>
      <CCardBody>
        <p>Esta é a página para exibir os dados e gráficos do indicador "Cuidado da Gestante e Puérpera".</p>
        <p>Aqui você fará as chamadas à sua API para obter os dados relevantes.</p>
        {/* Exemplo de dados da API: */}
        {/* <p>Média nacional: 40,46% </p> */}
        {/* <p>Total de equipes na classificação "Suficiente": 33.629 (61,4%) </p> */}
        {/* Implemente sua lógica de fetch de dados aqui */}
      </CCardBody>
    </CCard>
  )
}

export default CuidadoGestantePuerpera