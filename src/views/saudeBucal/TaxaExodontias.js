import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const TaxaExodontias = () => {
  return (
    <CCard>
      <CCardHeader>
        <h2>B.3. Taxa de exodontias na APS</h2>
      </CCardHeader>
      <CCardBody>
        <p>Esta é a página para exibir os dados e gráficos do indicador "Taxa de exodontias na APS".</p>
        <p>Aqui você fará as chamadas à sua API para obter os dados relevantes.</p>
        {/* Exemplo de dados da API: */}
        {/* <p>Média nacional: 9,34% </p> */}
        {/* <p>Total de equipes na classificação "Regular": 26.459 (79,9%) </p> */}
        {/* Implemente sua lógica de fetch de dados aqui */}
      </CCardBody>
    </CCard>
  )
}

export default TaxaExodontias