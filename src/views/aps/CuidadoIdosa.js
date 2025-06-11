import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const CuidadoIdosa = () => {
  return (
    <CCard>
      <CCardHeader>
        <h2>C.6. Cuidado da Pessoa Idosa</h2>
      </CCardHeader>
      <CCardBody>
        <p>Esta é a página para exibir os dados e gráficos do indicador "Cuidado da Pessoa Idosa".</p>
        <p>Aqui você fará as chamadas à sua API para obter os dados relevantes.</p>
        {/* Exemplo de dados da API: */}
        {/* <p>Média nacional: 46,64% </p> */}
        {/* <p>Total de equipes na classificação "Regular": 3.797 (6,6%) </p> */}
        {/* Implemente sua lógica de fetch de dados aqui */}
      </CCardBody>
    </CCard>
  )
}

export default CuidadoIdosa