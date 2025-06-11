import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const EscovacaoSupervisionada = () => {
  return (
    <CCard>
      <CCardHeader>
        <h2>B.4. Escovação Supervisionada na APS</h2>
      </CCardHeader>
      <CCardBody>
        <p>Esta é a página para exibir os dados e gráficos do indicador "Escovação Supervisionada na APS".</p>
        <p>Aqui você fará as chamadas à sua API para obter os dados relevantes.</p>
        {/* Exemplo de dados da API: */}
        {/* <p>Média nacional: 0,46% </p> */}
        {/* <p>Total de equipes na classificação "Regular": 31.202 (88,8%) </p> */}
        {/* Implemente sua lógica de fetch de dados aqui */}
      </CCardBody>
    </CCard>
  )
}

export default EscovacaoSupervisionada