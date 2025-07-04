// src/views/aps/ACuidadoMulherCancer.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';
import AGraficoMulherCancer from '../../components/AGraficoMulherCancer'; // Gráfico A geral
import A_TabelaMulherCancerColoUtero from '../../components/A_TabelaMulherCancerColoUtero'; // Tabela A geral
import AGraficoMulherCancerPorUbs from '../../components/AGraficoMulherCancerPorUbs'; // Gráfico A por UBS

// NOVO: Importa o componente da tabela por UBS
import A_TabelaMulherCancerColoUteroPorUbs from '../../components/A_TabelaMulherCancerColoUteroPorUbs';

import api from '../../service/api';

const ACuidadoMulherCancer = () => {
  const dataFinalGrafico = new Date();
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setFullYear(dataInicialGrafico.getFullYear() - 1); // 1 ano atrás

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
        <h2>C.X. Cuidado da Mulher - Prevenção de Câncer de Colo de Útero</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta dados relacionados à prevenção do câncer de colo de útero em mulheres, mostrando a proporção de mulheres com e sem registro de exame preventivo no período selecionado.</p>

        {/* Gráfico A: Estatísticas de Prevenção de Câncer de Colo de Útero (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Estatísticas de Prevenção de Câncer de Colo de Útero (Geral)</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <AGraficoMulherCancer
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela A: Mulheres Sem Prevenção de Câncer de Colo de Útero (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaMulherCancerColoUtero
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
            />
          </CCol>
        </CRow>

        {/* Seletor de UBS */}
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

        {/* Gráfico A - Mulheres Câncer POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Estatísticas de Prevenção de Câncer de Colo de Útero (Por UBS)</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <AGraficoMulherCancerPorUbs
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    alturaGrafico={alturaDosGraficos}
                    selectedUbsId={selectedUbsId}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* NOVO: Tabela A - Mulheres Câncer POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaMulherCancerColoUteroPorUbs
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
              selectedUbsId={selectedUbsId}
            />
          </CCol>
        </CRow>

      </CCardBody>
    </CCard>
  );
};

export default ACuidadoMulherCancer;