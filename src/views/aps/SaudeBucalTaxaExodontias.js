// src/views/saudeBucal/TaxaExodontias.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react'; // Importar CFormSelect e CFormLabel

// Importa os componentes de gráfico e tabela
import CGraficoSaudeBucalTaxaExodontias from '../../components/CGraficoSaudeBucalTaxaExodontias'; // Gráfico C geral
import C_TabelaSaudeBucalTaxaExodontias from '../../components/C_TabelaSaudeBucalTaxaExodontias'; // Tabela C geral
import CGraficoSaudeBucalTaxaExodontiasPorUbs from '../../components/CGraficoSaudeBucalTaxaExodontiasPorUbs'; // Gráfico C por UBS
// NOVO: Importa o componente da tabela C por UBS
import C_TabelaSaudeBucalTaxaExodontiasPorUbs from '../../components/C_TabelaSaudeBucalTaxaExodontiasPorUbs';

import api from '../../service/api';

const SaudeBucalTaxaExodontias = () => {
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
        <h2>C.X. Saúde Bucal - Taxa de Exodontias na APS</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas e uma lista de pacientes que realizaram procedimentos de exodontia na Atenção Primária à Saúde (APS).</p>

        {/* Gráfico C: Taxa de Exodontias (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">C. Taxa de Exodontias na APS - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <CGraficoSaudeBucalTaxaExodontias
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela C: Pacientes que NÃO Tiveram Exodontias Realizadas (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <C_TabelaSaudeBucalTaxaExodontias
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
          <CCol md={6}></CCol>
        </CRow>

        {/* Gráfico C - Saúde Bucal - Taxa de Exodontias (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">C. Taxa de Exodontias na APS por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <CGraficoSaudeBucalTaxaExodontiasPorUbs
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

        {/* NOVO: Tabela C - Saúde Bucal - Exodontias POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <C_TabelaSaudeBucalTaxaExodontiasPorUbs
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

export default SaudeBucalTaxaExodontias;