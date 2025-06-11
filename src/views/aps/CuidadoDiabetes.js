import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const CuidadoDiabetes = () => {
  return (
    <CCard>
      <CCardHeader>
        <h2>C.4. Cuidado da Pessoa com Diabetes</h2>
      </CCardHeader>
      <CCardBody>
        <p>Esta é a página para exibir os dados e gráficos do indicador "Cuidado da Pessoa com Diabetes".</p>
        <p>Aqui você fará as chamadas à sua API para obter os dados relevantes.</p>
        {/* Exemplo de dados da API: */}
        {/* <p>Média nacional: 47,30% </p> */}
        {/* <p>Total de equipes na classificação "Bom": 25.637 (45,0%) </p> */}
        {/* Implemente sua lógica de fetch de dados aqui */}
      </CCardBody>
    </CCard>
  )
}

export default CuidadoDiabetes