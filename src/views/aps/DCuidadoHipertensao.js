// src/views/aps/DCuidadoHipertensao.js
import React from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';
import DGraficoHipertensos from '../../components/DGraficoHipertensos';
import D_TabelaHipertensosSemPesoAltura from '../../components/D_TabelaHipertensosSemPesoAltura'; // NOVO IMPORT

const DCuidadoHipertensao = () => {
  const dataFinalGrafico = new Date();
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setFullYear(dataInicialGrafico.getFullYear() - 1); // 12 meses atrás para peso/altura

  const alturaDosGraficos = '500px';

  return (
    <CCard className="mb-5">
      <CCardHeader>
        <h2>C.5. Cuidado da Pessoa com Hipertensão Arterial - D. Peso e Altura</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório mostra as estatísticas de registro de peso e altura para pessoas hipertensas nos últimos 12 meses.</p>

        {/* Gráfico D: Hipertensos com Registro de Peso e Altura */}
        <CRow>
          <CCol md={12}>
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

        {/* NOVO: Tabela de Hipertensos que NÃO Fizeram Registro de Peso e Altura */}
        <CRow>
          <CCol md={12}>
            <D_TabelaHipertensosSemPesoAltura
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
            />
          </CCol>
        </CRow>

      </CCardBody>
    </CCard>
  );
};

export default DCuidadoHipertensao;