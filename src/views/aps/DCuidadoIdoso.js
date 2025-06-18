import React from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';
import DGraficoIdoso from '../../components/DGraficoIdoso'; // Ajuste o caminho conforme sua estrutura de pastas

const DCuidadoIdoso = () => {
  // Definindo datas de exemplo para o gráfico (últimos 12 meses para vacinação)
  const dataFinalGrafico = new Date(); // Data atual
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setFullYear(dataInicialGrafico.getFullYear() - 1); // 12 meses atrás

  // Definindo a altura desejada para o gráfico
  const alturaDosGraficos = '500px'; 

  return (
    <CCard>
      <CCardHeader>
        <h2>Cuidado Integral da Pessoa Idosa - D. Vacinação contra Influenza</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este gráfico mostra as estatísticas de idosos que receberam pelo menos 1 dose da vacina contra influenza nos últimos 12 meses.</p>
        
        {/* Gráfico D: Idosos Vacinados contra Influenza */}
        <CRow>
          <CCol md={12}> {/* Ocupa 12 colunas para o gráfico ficar centralizado em sua própria página */}
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">D. Estatísticas de Idosos Vacinados contra Influenza</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}> 
                  <DGraficoIdoso
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default DCuidadoIdoso;
