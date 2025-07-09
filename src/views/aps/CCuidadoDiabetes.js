// src/views/aps/CCuidadoDiabetes.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';

// Importa o componente do gráfico C Diabetes
import CGraficoCuidadoDiabetesAcsTacs from '../../components/CGraficoCuidadoDiabetesAcsTacs';

const CCuidadoDiabetes = () => {
  // Define o período padrão para o gráfico: últimos 12 meses
  const dataFinalPeriodo = new Date(); // Data atual
  const dataInicialPeriodo = new Date();
  dataInicialPeriodo.setFullYear(dataInicialPeriodo.getFullYear() - 1); // 1 ano atrás

  const alturaDosGraficos = '500px';

  return (
    <CCard className="mb-5">
      <CCardHeader>
        <h2>C.X. Cuidado da Pessoa com Diabetes - Visitas ACS/TACS</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas sobre as visitas domiciliares de ACS/TACS a pacientes com Diabetes.</p>

        {/* Gráfico C: Visitas ACS/TACS (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">C. Estatísticas de Visitas ACS/TACS de Diabéticos (2+ Consultas com Intervalo) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <CGraficoCuidadoDiabetesAcsTacs
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Aqui você adicionaria tabelas ou outros gráficos por UBS se fossem criados */}

      </CCardBody>
    </CCard>
  );
};

export default CCuidadoDiabetes;