import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const PrimeiraConsultaOdontologica = () => {
  return (
    <CCard>
      <CCardHeader>
        <h2>B.1. 1ª Consulta Odontológica programada na APS</h2>
      </CCardHeader>
      <CCardBody>
        <p>Esta é a página para exibir os dados e gráficos do indicador "1ª Consulta Odontológica programada na APS".</p>
        <p>Aqui você fará as chamadas à sua API para obter os dados relevantes.</p>
        {/* Exemplo de dados da API: */}
        {/* <p>Média nacional: 3,40% </p> */}
        {/* <p>Total de equipes na classificação "Regular": 8.291 (23,6%) </p> */}
        {/* Implemente sua lógica de fetch de dados aqui */}
      </CCardBody>
    </CCard>
  )
}

export default PrimeiraConsultaOdontologica