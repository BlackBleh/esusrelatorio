// src/views/aps/CDesenvolvimentoInfantil.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';

// Importa os componentes de gráfico e tabela
import CGraficoDesenvolvimentoInfantilPesoAltura from '../../components/CGraficoDesenvolvimentoInfantilPesoAltura'; // Gráfico C geral
import C_TabelaDesenvolvimentoInfantilPesoAltura from '../../components/C_TabelaDesenvolvimentoInfantilPesoAltura'; // Tabela C geral
import CGraficoDesenvolvimentoInfantilPesoAlturaPorUbs from '../../components/CGraficoDesenvolvimentoInfantilPesoAlturaPorUbs'; // Gráfico C por UBS
// NOVO: Importa o componente da tabela C por UBS
import C_TabelaDesenvolvimentoInfantilPesoAlturaPorUbs from '../../components/C_TabelaDesenvolvimentoInfantilPesoAlturaPorUbs';

import api from '../../service/api';

const CDesenvolvimentoInfantil = () => {
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
        <h2>C.X. Desenvolvimento Infantil - Peso e Altura até 2 Anos</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas e uma lista de crianças até os 2 anos de vida que não tiveram registros de peso e altura.</p>

        {/* Gráfico C: Peso e Altura (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">C. Estatísticas de Registros de Peso e Altura (9+ em 0-2 anos) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <CGraficoDesenvolvimentoInfantilPesoAltura
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela C: Crianças Sem 9+ Registros de Peso e Altura (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <C_TabelaDesenvolvimentoInfantilPesoAltura
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

        {/* Gráfico C - Desenvolvimento Infantil - Peso e Altura (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">C. Estatísticas de Registros de Peso e Altura (9+ em 0-2 anos) - Por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <CGraficoDesenvolvimentoInfantilPesoAlturaPorUbs
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

        {/* NOVO: Tabela C - Desenvolvimento Infantil - Peso e Altura POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <C_TabelaDesenvolvimentoInfantilPesoAlturaPorUbs
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

export default CDesenvolvimentoInfantil;