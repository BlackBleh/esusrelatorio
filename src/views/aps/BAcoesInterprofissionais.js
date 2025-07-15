// src/views/aps/BAcoesInterprofissionais.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react'; // Importar CFormSelect e CFormLabel

// Importa os componentes de gráfico e tabela
import BGraficoEMultiAcoesInterprofissionais from '../../components/BGraficoEMultiAcoesInterprofissionais'; // Gráfico B geral
import B_TabelaEMultiAcoesInterprofissionais from '../../components/B_TabelaEMultiAcoesInterprofissionais'; // Tabela B geral
// NOVO: Importa o componente do gráfico B por UBS
import BGraficoEMultiAcoesInterprofissionaisPorUbs from '../../components/BGraficoEMultiAcoesInterprofissionaisPorUbs';


import api from '../../service/api';
import B_TabelaEMultiAcoesInterprofissionaisPorUbs from '../../components/B_TabelaEMultiAcoesInterprofissionaisPorUbs';

const BAcoesInterprofissionais = () => {
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
        <h2>C.X. eMulti - Ações Interprofissionais</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta a taxa de ações compartilhadas realizadas pela eMulti na Atenção Primária à Saúde (APS).</p>

        {/* Gráfico B: Ações Interprofissionais (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">B. Taxa de Ações Compartilhadas pela eMulti na APS - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <BGraficoEMultiAcoesInterprofissionais
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela B: Pacientes que NÃO Tiveram Ações Compartilhadas pela eMulti (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <B_TabelaEMultiAcoesInterprofissionais
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

        {/* NOVO: Gráfico B - eMulti - Ações Interprofissionais (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">B. Taxa de Ações Compartilhadas pela eMulti na APS por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <BGraficoEMultiAcoesInterprofissionaisPorUbs
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

        {/* Você pode adicionar uma Tabela B - eMulti POR UBS aqui, se necessário. */}
        {/* Você pode adicionar uma Tabela A - eMulti POR UBS aqui, se necessário. */}
                <CRow className="mb-4">
                          <CCol md={12}>
                            <B_TabelaEMultiAcoesInterprofissionaisPorUbs
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

export default BAcoesInterprofissionais;