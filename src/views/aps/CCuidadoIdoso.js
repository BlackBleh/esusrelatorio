// src/views/aps/CCuidadoIdoso.js

import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';

// Importa o componente do gráfico C de Idosos (Geral)
import CGraficoIdoso from '../../components/CGraficoIdoso';
// Adiciona a importação da tabela C de Idosos (Geral)
import C_TabelaIdososSemVisitaAcsTacs from '../../components/C_TabelaIdososSemVisitaAcsTacs';

// Importa o componente do gráfico C de Idosos (Por UBS)
import CGraficoIdosoPorUbs from '../../components/CGraficoIdosoPorUbs';
// Importa o componente da tabela C de Idosos (Por UBS)
import C_TabelaIdososSemVisitaAcsTacsPorUbs from '../../components/C_TabelaIdososSemVisitaAcsTacsPorUbs'; // <<--- NOVA IMPORTAÇÃO

import api from '../../service/api';

const CCuidadoIdoso = () => {
  // Define o período padrão para os últimos 12 meses
  const dataFinalGrafico = new Date();
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setFullYear(dataInicialGrafico.getFullYear() - 1);

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
        <h2>Cuidado Integral da Pessoa Idosa - C. Visitas Domiciliares ACS/TACS</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta dados relacionados às visitas domiciliares realizadas por Agentes Comunitários de Saúde (ACS) e Técnicos em Saúde Comunitária (TACS) para pessoas idosas, com foco em visitas qualificadas no período.</p>

        {/* Gráfico C: Idosos com Visitas ACS/TACS (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">C. Estatísticas de Idosos com Visitas Domiciliares ACS/TACS (Geral)</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <CGraficoIdoso
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela C: Idosos sem Visitas ACS/TACS (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <C_TabelaIdososSemVisitaAcsTacs
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
            />
          </CCol>
        </CRow>

        {/* Caixa de seleção de UBS */}
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

        {/* GRÁFICO C: Idosos com Visitas ACS/TACS POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CGraficoIdosoPorUbs
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
              alturaGrafico={alturaDosGraficos}
              selectedUbsId={selectedUbsId}
            />
          </CCol>
        </CRow>

        {/* Tabela C: Idosos sem Visitas ACS/TACS POR UBS */}
        <CRow className="mb-4"> {/* <<--- ADICIONADO ESTE BLOCO */}
          <CCol md={12}>
            <C_TabelaIdososSemVisitaAcsTacsPorUbs
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

export default CCuidadoIdoso;