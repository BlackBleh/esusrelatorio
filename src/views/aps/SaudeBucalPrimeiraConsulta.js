// src/views/saudeBucal/PrimeiraConsultaOdontologica.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';

// Importa os componentes de gráfico e tabela
import AGraficoSaudeBucalPrimeiraConsulta from '../../components/AGraficoSaudeBucalPrimeiraConsulta'; // Gráfico A geral
import A_TabelaSaudeBucalPrimeiraConsulta from '../../components/A_TabelaSaudeBucalPrimeiraConsulta'; // Tabela A geral
import AGraficoSaudeBucalPrimeiraConsultaPorUbs from '../../components/AGraficoSaudeBucalPrimeiraConsultaPorUbs'; // Gráfico A por UBS
// NOVO: Importa o componente da tabela A por UBS
import A_TabelaSaudeBucalPrimeiraConsultaPorUbs from '../../components/A_TabelaSaudeBucalPrimeiraConsultaPorUbs';

import api from '../../service/api';

const SaudeBucalPrimeiraConsulta = () => {
  const dataFinalPeriodo = new Date();
  const dataInicialPeriodo = new Date();
  dataInicialPeriodo.setFullYear(dataInicialPeriodo.getFullYear() - 1); // 1 ano atrás

  const alturaDosGraficos = '500px';

  const [ubsList, setUbsList] = useState([]);
  const [selectedUbsId, setSelectedUbsId] = useState(null);

  useEffect(() => {
    const fetchUbs = async () => {
      try {
        const response = await api.get('/api/ubs');
        const sortedUbs = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
        setUbsList([{ id: null, nome: 'Todas as UBSs' }, ...sortedUbs]);
      } catch (error) {
        console.error("Erro ao carregar lista de UBSs:", error);
      }
    };

    fetchUbs();
  }, []);

  const handleUbsChange = (event) => {
    const value = event.target.value === 'null' ? null : Number(event.target.value);
    setSelectedUbsId(value);
  };

  return (
    <CCard className="mb-5">
      <CCardHeader>
        <h2>C.X. Saúde Bucal - 1ª Consulta Odontológica Programada na APS</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas e uma lista de pacientes que não tiveram a primeira consulta odontológica programada na Atenção Primária à Saúde (APS).</p>

        {/* Gráfico A: Primeira Consulta Odontológica (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Taxa de 1ª Consulta Odontológica Programada na APS - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <AGraficoSaudeBucalPrimeiraConsulta
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela A: Pacientes Sem 1ª Consulta Odontológica (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaSaudeBucalPrimeiraConsulta
              dataInicial={dataInicialPeriodo}
              dataFinal={dataFinalPeriodo}
            />
          </CCol>
        </CRow>

        {/* Seletor de UBS (para os gráficos e tabelas por UBS) */}
        <CRow className="mb-4 align-items-center">
          <CCol md={2}>
            <CFormLabel htmlFor="selectUbs">Selecione uma UBS:</CFormLabel>
          </CCol>
          <CCol md={4}>
            <CFormSelect
              id="selectUbs"
              aria-label="Selecionar UBS"
              value={selectedUbsId === null ? 'null' : selectedUbsId}
              onChange={handleUbsChange}
            >
              {ubsList.map(ubs => (
                <option key={ubs.id} value={ubs.id}>
                  {ubs.nome}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>

        {/* Gráfico A: Primeira Consulta Odontológica (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Taxa de 1ª Consulta Odontológica Programada na APS por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <AGraficoSaudeBucalPrimeiraConsultaPorUbs
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                    selectedUbsId={selectedUbsId}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* NOVO: Tabela A - Saúde Bucal - Primeira Consulta Odontológica POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaSaudeBucalPrimeiraConsultaPorUbs
              dataInicial={dataInicialPeriodo}
              dataFinal={dataFinalPeriodo}
              selectedUbsId={selectedUbsId}
            />
          </CCol>
        </CRow>

      </CCardBody>
    </CCard>
  );
};

export default SaudeBucalPrimeiraConsulta;