import React from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';
import AGraficoHipertensos from '../../components/AGraficoHipertensos';
import A_TabelaHipertensosSemConsulta from '../../components/A_TabelaHipertensosSemConsulta'; // IMPORTAR O NOVO COMPONENTE

const ACuidadoHipertensao = () => {
  const dataFinalGrafico = new Date();
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setMonth(dataInicialGrafico.getMonth() - 6);

  const alturaDosGraficos = '500px';

  return (
    <CCard className="mb-5"> {/* Adicionado mb-5 ao CCard principal para espaçamento inferior */}
      <CCardHeader>
        <h2>C.5. Cuidado da Pessoa com Hipertensão Arterial - A. Consultas</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta dados relacionados ao cuidado de pessoas com hipertensão arterial, focando em estatísticas de consultas.</p> {/* Texto mais descritivo */}

        <CRow>
          <CCol md={12}>
            <CCard className="mb-4"> {/* Card para o gráfico */}
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

        <CRow>
          <CCol md={12}>
            {/* NOVO CARD PARA A TABELA - Usa o componente A_TabelaHipertensosSemConsulta */}
            <A_TabelaHipertensosSemConsulta
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
            />
          </CCol>
        </CRow>

      </CCardBody>
    </CCard>
  );
};

export default ACuidadoHipertensao;