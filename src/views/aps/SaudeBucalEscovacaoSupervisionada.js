// src/views/saudeBucal/EscovacaoSupervisionada.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react'; // Importar CFormSelect e CFormLabel

// Importa os componentes de gráfico e tabela
import DGraficoSaudeBucalEscovacaoSupervisionada from '../../components/DGraficoSaudeBucalEscovacaoSupervisionada'; // Gráfico D geral
import D_TabelaSaudeBucalEscovacaoSupervisionada from '../../components/D_TabelaSaudeBucalEscovacaoSupervisionada'; // Tabela D geral
// NOVO: Importa o componente do gráfico D por UBS
import DGraficoSaudeBucalEscovacaoSupervisionadaPorUbs from '../../components/DGraficoSaudeBucalEscovacaoSupervisionadaPorUbs';

import api from '../../service/api';
import D_TabelaSaudeBucalEscovacaoSupervisionadaPorUbs from '../../components/D_TabelaSaudeBucalEscovacaoSupervisionadaPorUbs';

const SaudeBucalEscovacaoSupervisionada = () => {
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
        <h2>C.X. Saúde Bucal - Escovação Supervisionada</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas e uma lista de pacientes que realizaram procedimentos de escovação supervisionada na Atenção Primária à Saúde (APS).</p>

        {/* Gráfico D: Escovação Supervisionada (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">D. Taxa de Escovação Supervisionada (6-12 anos) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <DGraficoSaudeBucalEscovacaoSupervisionada
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela D: Pacientes que NÃO Tiveram Escovação Supervisionada (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <D_TabelaSaudeBucalEscovacaoSupervisionada
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

        {/* NOVO: Gráfico D - Saúde Bucal - Escovação Supervisionada (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">D. Taxa de Escovação Supervisionada (6-12 anos) - Por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <DGraficoSaudeBucalEscovacaoSupervisionadaPorUbs
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

        {/* Você pode adicionar uma Tabela D - Saúde Bucal POR UBS aqui, se necessário. */}
        <CRow className="mb-4">
                  <CCol md={12}>
                    <D_TabelaSaudeBucalEscovacaoSupervisionadaPorUbs
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

export default SaudeBucalEscovacaoSupervisionada;