import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const CuidadoCancerMulher = () => {
  return (
    <CCard>
      <CCardHeader>
        <h2>C.7. Cuidado da Mulher na Prevenção do Câncer</h2>
      </CCardHeader>
      <CCardBody>
        <p>Esta é a página para exibir os dados e gráficos do indicador "Cuidado da Mulher na Prevenção do Câncer".</p>
        <p>Aqui você fará as chamadas à sua API para obter os dados relevantes.</p>
        {/* Exemplo de dados da API: */}
        {/* <p>Média nacional: 25,87% </p> */}
        {/* <p>Total de equipes na classificação "Ótimo": 0 (0,0%) </p> */}
        {/* Implemente sua lógica de fetch de dados aqui */}
      </CCardBody>
    </CCard>
  )
}

export default CuidadoCancerMulher