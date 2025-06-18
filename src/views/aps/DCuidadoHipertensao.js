import React from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';
import DGraficoHipertensos from '../../components/DGraficoHipertensos'; // Ajuste o caminho conforme sua estrutura de pastas

const DCuidadoHipertensao = () => {
  // Definindo datas de exemplo para o gráfico (últimos 12 meses para peso e altura)
  const dataFinalGrafico = new Date(); // Data atual
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setFullYear(dataInicialGrafico.getFullYear() - 1); // 12 meses atrás

  // Definindo a altura desejada para o gráfico
  const alturaDosGraficos = '500px'; 

  return (
    <CCard>
      <CCardHeader>
        <h2>C.5. Cuidado da Pessoa com Hipertensão Arterial - D. Peso e Altura</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este gráfico mostra as estatísticas de registro de peso e altura para pessoas hipertensas nos últimos 12 meses.</p>
        
        {/* Gráfico D: Hipertensos com Registro de Peso e Altura */}
        <CRow>
          <CCol md={12}> {/* Ocupa 12 colunas para o gráfico ficar centralizado em sua própria página */}
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">D. Estatísticas de Peso e Altura de Hipertensos</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}> 
                  <DGraficoHipertensos
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

export default DCuidadoHipertensao;
