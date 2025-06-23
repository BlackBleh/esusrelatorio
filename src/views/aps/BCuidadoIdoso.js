// src/views/aps/BCuidadoIdoso.js
import React from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';
import BGraficoIdoso from '../../components/BGraficoIdoso';
import B_TabelaIdososSemPesoAltura from '../../components/B_TabelaIdososSemPesoAltura'; // NOVO IMPORT

const BCuidadoIdoso = () => {
  const dataFinalGrafico = new Date();
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setFullYear(dataInicialGrafico.getFullYear() - 1); // 12 meses atrás

  const alturaDosGraficos = '500px';

  return (
    <CCard className="mb-5">
      <CCardHeader>
        <h2>Cuidado Integral da Pessoa Idosa - B. Peso e Altura</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório mostra as estatísticas de idosos que tiveram pelo menos 02 registros de peso e altura nos últimos 12 meses.</p>

        {/* Gráfico B: Idosos com Registro de Peso e Altura */}
        <CRow>
          <CCol md={12}>
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

        {/* NOVO: Tabela de Idosos que NÃO Fizeram Registro de Peso e Altura */}
        <CRow>
          <CCol md={12}>
            <B_TabelaIdososSemPesoAltura
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
            />
          </CCol>
        </CRow>

      </CCardBody>
    </CCard>
  );
};

export default BCuidadoIdoso;