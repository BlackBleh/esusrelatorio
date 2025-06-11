import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const CuidadoHipertensao = () => {
  return (
    <CCard>
      <CCardHeader>
        <h2>C.5. Cuidado da Pessoa com Hipertensão Arterial</h2>
      </CCardHeader>
      <CCardBody>
        <p>Esta é a página para exibir os dados e gráficos do indicador "Cuidado da Pessoa com Hipertensão Arterial".</p>
        <p>Aqui você fará as chamadas à sua API para obter os dados relevantes.</p>
        {/* Exemplo de dados da API: */}
        {/* <p>Média nacional: 58,67% </p> */}
        {/* <p>Total de equipes na classificação "Ótimo": 7.908 (13,8%) </p> */}
        {/* Implemente sua lógica de fetch de dados aqui */}
      </CCardBody>
    </CCard>
  )
}

export default CuidadoHipertensao