import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const TratamentoRestauradorAtraumatico = () => {
  return (
    <CCard>
      <CCardHeader>
        <h2>B.6. Tratamento Restaurador Atraumático na APS</h2>
      </CCardHeader>
      <CCardBody>
        <p>Esta é a página para exibir os dados e gráficos do indicador "Tratamento Restaurador Atraumático na APS".</p>
        <p>Aqui você fará as chamadas à sua API para obter os dados relevantes.</p>
        {/* Exemplo de dados da API: */}
        {/* <p>Total de equipes na classificação "Regular": 20.301 (63,2%) </p> */}
        {/* Implemente sua lógica de fetch de dados aqui */}
      </CCardBody>
    </CCard>
  )
}

export default TratamentoRestauradorAtraumatico