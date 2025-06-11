import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const ProcedimentosPreventivos = () => {
  return (
    <CCard>
      <CCardHeader>
        <h2>B.5. Procedimentos Odontológicos preventivos na APS</h2>
      </CCardHeader>
      <CCardBody>
        <p>Esta é a página para exibir os dados e gráficos do indicador "Procedimentos Odontológicos preventivos na APS".</p>
        <p>Aqui você fará as chamadas à sua API para obter os dados relevantes.</p>
        {/* Exemplo de dados da API: */}
        {/* <p>Total de equipes na classificação "Regular": 23.031 (68,9%) </p> */}
        {/* Implemente sua lógica de fetch de dados aqui */}
      </CCardBody>
    </CCard>
  )
}

export default ProcedimentosPreventivos