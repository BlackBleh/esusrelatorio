import React from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';
import AGraficoHipertensos from '../../components/AGraficoHipertensos'; // Ajuste o caminho conforme sua estrutura de pastas

const ACuidadoHipertensao = () => {
  // Definindo datas de exemplo para o gráfico (últimos 6 meses até a data atual)
  const dataFinalGrafico = new Date(); // Data atual
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setMonth(dataInicialGrafico.getMonth() - 6); // 6 meses atrás

  // Definindo a altura desejada para o gráfico
  const alturaDosGraficos = '500px'; 

  return (
    <CCard>
      <CCardHeader>
        <h2>C.5. Cuidado da Pessoa com Hipertensão Arterial - A. Consultas</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este gráfico mostra as estatísticas de consultas realizadas por médicos/enfermeiros para pessoas hipertensas.</p>
        
        <CRow>
          <CCol md={12}> {/* Ocupa 12 colunas para o gráfico ficar centralizado em sua própria página */}
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
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default ACuidadoHipertensao;
