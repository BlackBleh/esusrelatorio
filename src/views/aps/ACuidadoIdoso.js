// src/views/aps/ACuidadoIdoso.js
import React from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';
import AGraficoIdoso from '../../components/AGraficoIdoso';
import A_TabelaIdososSemConsulta from '../../components/A_TabelaIdososSemConsulta'; // NOVO IMPORT

const ACuidadoIdoso = () => {
  const dataFinalGrafico = new Date();
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setFullYear(dataInicialGrafico.getFullYear() - 1); // 12 meses atrás

  const alturaDosGraficos = '500px';

  return (
    <CCard className="mb-5">
      <CCardHeader>
        <h2>Cuidado Integral da Pessoa Idosa - A. Consultas</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório mostra as estatísticas de idosos que tiveram pelo menos uma consulta presencial ou remota por médico(a) ou enfermeiro(a) nos últimos 12 meses.</p>

        {/* Gráfico A: Idosos com Consulta Méd/Enf */}
        <CRow>
          <CCol md={12}>
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

        {/* NOVO: Tabela de Idosos que NÃO Fizeram Consulta com Médico ou Enfermeiro */}
        <CRow>
          <CCol md={12}>
            <A_TabelaIdososSemConsulta
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
            />
          </CCol>
        </CRow>

      </CCardBody>
    </CCard>
  );
};

export default ACuidadoIdoso;