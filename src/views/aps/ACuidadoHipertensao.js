// src/views/aps/ACuidadoHipertensao.js
import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';
import AGraficoHipertensos from '../../components/AGraficoHipertensos'; // Gráfico A geral
import A_TabelaHipertensosSemConsulta from '../../components/A_TabelaHipertensosSemConsulta'; // Tabela A geral

// NOVAS IMPORTAÇÕES PARA O GRÁFICO E TABELA A POR UBS
import AGraficoHipertensosPorUbs from '../../components/AGraficoHipertensosPorUbs'; // NOVO: Gráfico A por UBS
import A_TabelaHipertensosSemConsultaPorUbs from '../../components/A_TabelaHipertensosSemConsultaPorUbs'; // NOVO: Tabela A por UBS

import api from '../../service/api';

const ACuidadoHipertensao = () => {
  const dataFinalGrafico = new Date();
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setMonth(dataInicialGrafico.getMonth() - 6);

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
    <CCard className="mb-5"> {/* Adicionado mb-5 ao CCard principal para espaçamento inferior */}
      <CCardHeader>
        <h2>C.5. Cuidado da Pessoa com Hipertensão Arterial - A. Consultas</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta dados relacionados ao cuidado de pessoas com hipertensão arterial, focando em estatísticas de consultas.</p> {/* Texto mais descritivo */}

        {/* Gráfico A: Hipertensos com Consulta (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4"> {/* Card para o gráfico */}
              <CCardHeader>
                <h5 className="mb-0">A. Estatísticas de Consultas de Hipertensos (Geral)</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <AGraficoHipertensos
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    alturaGrafico={alturaDosGraficos}
                    // selectedUbsId={selectedUbsId} /* Este gráfico é geral, não usa filtro de UBS */
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela A: Hipertensos que NÃO Fizeram Consulta com Médico ou Enfermeiro (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaHipertensosSemConsulta
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
              // selectedUbsId={selectedUbsId} /* Esta tabela é geral, não usa filtro de UBS */
            />
          </CCol>
        </CRow>

        {/* Caixa de seleção de UBS - Adicionada abaixo da tabela */}
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

        {/* NOVOS GRÁFICOS E TABELAS POR UBS (Categoria A - Hipertensos) */}

        {/* Gráfico A: Hipertensos com Consulta POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <AGraficoHipertensosPorUbs
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
              alturaGrafico={alturaDosGraficos}
              selectedUbsId={selectedUbsId} /* Passa o selectedUbsId para o gráfico por UBS */
            />
          </CCol>
        </CRow>

        {/* Tabela A: Hipertensos que NÃO Fizeram Consulta no Período POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaHipertensosSemConsultaPorUbs
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
              selectedUbsId={selectedUbsId} /* Passa o selectedUbsId para a tabela por UBS */
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default ACuidadoHipertensao;