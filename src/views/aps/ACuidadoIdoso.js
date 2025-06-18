import React from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';
import AGraficoIdoso from '../../components/AGraficoIdoso'; // Ajuste o caminho conforme sua estrutura de pastas

const ACuidadoIdoso = () => {
  // Definindo datas de exemplo para o gráfico (últimos 12 meses para idosos)
  const dataFinalGrafico = new Date(); // Data atual
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setFullYear(dataInicialGrafico.getFullYear() - 1); // 12 meses atrás

  // Definindo a altura desejada para o gráfico
  const alturaDosGraficos = '500px'; 

  return (
    <CCard>
      <CCardHeader>
        <h2>Cuidado Integral da Pessoa Idosa - A. Consultas</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este gráfico mostra as estatísticas de idosos que tiveram pelo menos uma consulta presencial ou remota por médico(a) ou enfermeiro(a) nos últimos 12 meses.</p>
        
        <CRow>
          <CCol md={12}> {/* Ocupa 12 colunas para o gráfico ficar centralizado em sua própria página */}
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Estatísticas de Idosos com Consulta Méd/Enf</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}> 
                  <AGraficoIdoso
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

export default ACuidadoIdoso;
