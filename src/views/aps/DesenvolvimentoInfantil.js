import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const DesenvolvimentoInfantil = () => {
  return (
    <CCard>
      <CCardHeader>
        <h2>C.2. Desenvolvimento Infantil</h2>
      </CCardHeader>
      <CCardBody>
        <p>Esta é a página para exibir os dados e gráficos do indicador "Desenvolvimento Infantil".</p>
        <p>Aqui você fará as chamadas à sua API para obter os dados relevantes.</p>
        {/* Exemplo de dados da API: */}
        {/* <p>Média nacional: 23,26% </p> */}
        {/* <p>Total de equipes na classificação "Regular": 32.705 (60,3%) </p> */}
        {/* Implemente sua lógica de fetch de dados aqui */}
      </CCardBody>
    </CCard>
  )
}

export default DesenvolvimentoInfantil