// src/views/aps/DDesenvolvimentoInfantil.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';

// Importa os componentes de gráfico e tabela
import DGraficoDesenvolvimentoInfantilVisitaAcstacs from '../../components/DGraficoDesenvolvimentoInfantilVisitaAcstacs'; // Gráfico D geral
import D_TabelaDesenvolvimentoInfantilVisitaAcstacs from '../../components/D_TabelaDesenvolvimentoInfantilVisitaAcstacs'; // Tabela D geral
import DGraficoDesenvolvimentoInfantilVisitaAcstacsPorUbs from '../../components/DGraficoDesenvolvimentoInfantilVisitaAcstacsPorUbs'; // Gráfico D por UBS
// NOVO: Importa o componente da tabela D por UBS
import D_TabelaDesenvolvimentoInfantilVisitaAcstacsPorUbs from '../../components/D_TabelaDesenvolvimentoInfantilVisitaAcstacsPorUbs';

import api from '../../service/api';

const DDesenvolvimentoInfantil = () => {
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
        <h2>C.X. Desenvolvimento Infantil - Visitas ACS/TACS</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas e uma lista de crianças que não tiveram visitas essenciais de ACS/TACS.</p>

        {/* Gráfico D: Visitas ACS/TACS (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">D. Estatísticas de Visitas ACS/TACS (1ª em 30 dias, 2ª em 6 meses) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <DGraficoDesenvolvimentoInfantilVisitaAcstacs
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela D: Crianças Sem Visitas Essenciais ACS/TACS (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <D_TabelaDesenvolvimentoInfantilVisitaAcstacs
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

        {/* Gráfico D - Desenvolvimento Infantil - Visitas ACS/TACS (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">D. Estatísticas de Visitas ACS/TACS (1ª em 30 dias, 2ª em 6 meses) - Por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <DGraficoDesenvolvimentoInfantilVisitaAcstacsPorUbs
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

        {/* NOVO: Tabela D - Desenvolvimento Infantil - Visitas ACS/TACS POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <D_TabelaDesenvolvimentoInfantilVisitaAcstacsPorUbs
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

export default DDesenvolvimentoInfantil;