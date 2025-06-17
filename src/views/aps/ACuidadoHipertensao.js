import React from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react'; // Importe CRow e CCol
import AGraficoHipertensos from '../../components/AGraficoHipertensos';
import BGraficoHipertensos from '../../components/BGraficoHipertensos'; // Importe o novo componente de gráfico

const CuidadoHipertensao = () => {
  // Definindo datas de exemplo para os gráficos (últimos 6 meses até a data atual)
  const dataFinalGrafico = new Date(); // Data atual
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setMonth(dataInicialGrafico.getMonth() - 6); // 6 meses atrás

  // Definindo a altura desejada para os gráficos
  const alturaDosGraficos = '500px'; 

  return (
    <CCard>
      <CCardHeader>
        <h2>C.5. Cuidado da Pessoa com Hipertensão Arterial</h2>
      </CCardHeader>
      <CCardBody>
        <p>Esta é a página para exibir os dados e gráficos do indicador "Cuidado da Pessoa com Hipertensão Arterial".</p>
        <p>Aqui você fará as chamadas à sua API para obter os dados relevantes.</p>
        
        <CRow> {/* Usa CRow para alinhar os cards lado a lado */}
          {/* Gráfico A: Hipertensos com Consulta */}
          <CCol md={6}> {/* Ocupa 6 colunas em telas médias e maiores */}
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Estatísticas de Consultas de Hipertensos</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}> 
                  <AGraficoHipertensos
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>

          {/* Gráfico B: Hipertensos com Registro de Peso e Altura */}
          <CCol md={6}> {/* Ocupa 6 colunas em telas médias e maiores */}
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">B. Estatísticas de Peso e Altura de Hipertensos</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}> 
                  <BGraficoHipertensos // Novo componente de gráfico
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Exemplo de dados da API: */}
        {/* <p>Média nacional: 58,67% </p> */}
        {/* <p>Total de equipes na classificação "Ótimo": 7.908 (13,8%) </p> */}
      </CCardBody>
    </CCard>
  );
};

export default CuidadoHipertensao;
