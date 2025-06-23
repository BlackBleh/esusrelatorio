// src/views/aps/BCuidadoHipertensao.js
import React from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';
import BGraficoHipertensos from '../../components/BGraficoHipertensos';
import B_TabelaHipertensosSemAfericao from '../../components/B_TabelaHipertensosSemAfericao'; // NOVO IMPORT

const BCuidadoHipertensao = () => {
  const dataFinalGrafico = new Date();
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setMonth(dataInicialGrafico.getMonth() - 6);

  const alturaDosGraficos = '500px';

  return (
    <CCard className="mb-5">
      <CCardHeader>
        <h2>C.5. Cuidado da Pessoa com Hipertensão Arterial - B. Aferição da Pressão Arterial</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório mostra as estatísticas de registro de aferição da pressão arterial para pessoas hipertensas nos últimos 6 meses.</p>

        {/* Gráfico B: Hipertensos com Registro de Aferição da Pressão Arterial */}
        <CRow>
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">B. Estatísticas de Aferição da Pressão Arterial de Hipertensos</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <BGraficoHipertensos
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* NOVO: Tabela de Hipertensos que NÃO Aferiram Pressão */}
        <CRow>
          <CCol md={12}>
            <B_TabelaHipertensosSemAfericao
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
            />
          </CCol>
        </CRow>

      </CCardBody>
    </CCard>
  );
};

export default BCuidadoHipertensao;