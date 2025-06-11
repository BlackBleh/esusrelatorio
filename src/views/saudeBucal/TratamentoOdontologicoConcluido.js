import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const TratamentoOdontologicoConcluido = () => {
  return (
    <CCard>
      <CCardHeader>
        <h2>B.2. Tratamento Odontológico concluído na APS</h2>
      </CCardHeader>
      <CCardBody>
        <p>Esta é a página para exibir os dados e gráficos do indicador "Tratamento Odontológico concluído na APS".</p>
        <p>Aqui você fará as chamadas à sua API para obter os dados relevantes.</p>
        {/* Exemplo de dados da API: */}
        {/* <p>Média nacional: 53,38% </p> */}
        {/* <p>Total de equipes na classificação "Ótimo": 10.427 (32,2%) </p> */}
        {/* Implemente sua lógica de fetch de dados aqui */}
      </CCardBody>
    </CCard>
  )
}

export default TratamentoOdontologicoConcluido