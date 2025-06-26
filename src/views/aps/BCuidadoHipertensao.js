// src/views/aps/BCuidadoHipertensao.js
import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';
import BGraficoHipertensos from '../../components/BGraficoHipertensos'; // Gráfico B geral
import B_TabelaHipertensosSemAfericao from '../../components/B_TabelaHipertensosSemAfericao'; // Tabela B geral

// NOVAS IMPORTAÇÕES PARA O GRÁFICO E TABELA B POR UBS
import BGraficoHipertensosPorUbs from '../../components/BGraficoHipertensosPorUbs'; // NOVO: Gráfico B por UBS
import B_TabelaHipertensosSemAfericaoPorUbs from '../../components/B_TabelaHipertensosSemAfericaoPorUbs'; // NOVO: Tabela B por UBS

import api from '../../service/api';

const BCuidadoHipertensao = () => {
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
    <CCard className="mb-5">
      <CCardHeader>
        <h2>C.5. Cuidado da Pessoa com Hipertensão Arterial - B. Aferição da Pressão Arterial</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório mostra as estatísticas de registro de aferição da pressão arterial para pessoas hipertensas nos últimos 6 meses.</p>

        {/* Gráfico B: Hipertensos com Registro de Aferição da Pressão Arterial (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">B. Estatísticas de Aferição da Pressão Arterial de Hipertensos (Geral)</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <BGraficoHipertensos // Componente geral de gráfico para aferição de pressão
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

        {/* Tabela B: Hipertensos que NÃO Aferiram Pressão (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <B_TabelaHipertensosSemAfericao // Componente geral de tabela para aferição de pressão
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
              // selectedUbsId={selectedUbsId} /* Esta tabela é geral, não usa filtro de UBS */
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

        {/* NOVOS GRÁFICOS E TABELAS POR UBS (Categoria B - Hipertensos) */}

        {/* Gráfico B: Hipertensos com Aferição de Pressão POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <BGraficoHipertensosPorUbs
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
              alturaGrafico={alturaDosGraficos}
              selectedUbsId={selectedUbsId} /* Passa o selectedUbsId para o gráfico por UBS */
            />
          </CCol>
        </CRow>

        {/* Tabela B: Hipertensos que NÃO Aferiram Pressão POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <B_TabelaHipertensosSemAfericaoPorUbs
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

export default BCuidadoHipertensao;