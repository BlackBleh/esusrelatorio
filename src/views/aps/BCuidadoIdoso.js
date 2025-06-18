import React from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';
import BGraficoIdoso from '../../components/BGraficoIdoso'; // Ajuste o caminho conforme sua estrutura de pastas

const BCuidadoIdoso = () => {
  // Definindo datas de exemplo para o gráfico (últimos 12 meses para peso e altura)
  const dataFinalGrafico = new Date(); // Data atual
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setFullYear(dataInicialGrafico.getFullYear() - 1); // 12 meses atrás

  // Definindo a altura desejada para o gráfico
  const alturaDosGraficos = '500px'; 

  return (
    <CCard>
      <CCardHeader>
        <h2>Cuidado Integral da Pessoa Idosa - B. Peso e Altura</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este gráfico mostra as estatísticas de idosos que tiveram pelo menos 02 registros de peso e altura nos últimos 12 meses.</p>
        
        <CRow>
          <CCol md={12}> {/* Ocupa 12 colunas para o gráfico ficar centralizado em sua própria página */}
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">B. Estatísticas de Idosos com Peso e Altura</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}> 
                  <BGraficoIdoso
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

export default BCuidadoIdoso;
