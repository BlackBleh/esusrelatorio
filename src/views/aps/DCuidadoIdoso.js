// src/views/aps/DCuidadoIdoso.js
import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CFormSelect,
  CFormLabel
} from '@coreui/react';
import DGraficoIdoso from '../../components/DGraficoIdoso'; // Gráfico geral
import DGraficoIdosoPorUbs from '../../components/DGraficoIdosoPorUbs'; // Gráfico por UBS
import D_TabelaIdososSemVacinaInfluenza from '../../components/D_TabelaIdososSemVacinaInfluenza'; // Tabela geral
import D_TabelaIdososSemVacinaInfluenzaPorUbs from '../../components/D_TabelaIdososSemVacinaInfluenzaPorUbs'; // NOVA TABELA POR UBS

import api from '../../service/api';

const DCuidadoIdoso = () => {
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
        <h2>Cuidado Integral da Pessoa Idosa - D. Vacinação contra Influenza</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório mostra as estatísticas de idosos que receberam pelo menos 1 dose da vacina contra influenza nos últimos 12 meses.</p>

        {/* Gráfico D: Idosos Vacinados contra Influenza (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">D. Estatísticas de Idosos Vacinados contra Influenza (Geral)</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <DGraficoIdoso
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela de Idosos que NÃO Tomaram a Vacina contra Influenza (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <D_TabelaIdososSemVacinaInfluenza
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

        {/* Gráfico D: Idosos Vacinados contra Influenza POR UBS */}
        <CRow className="mb-4"> {/* Adicionado mb-4 para espaçamento */}
            <CCol md={12}>
                <DGraficoIdosoPorUbs
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    alturaGrafico={alturaDosGraficos}
                    selectedUbsId={selectedUbsId}
                />
            </CCol>
        </CRow>

        {/* NOVO: Tabela de Idosos que NÃO Tomaram a Vacina contra Influenza POR UBS */}
        <CRow>
            <CCol md={12}>
                <D_TabelaIdososSemVacinaInfluenzaPorUbs
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    selectedUbsId={selectedUbsId} /* Passa o selectedUbsId para filtrar */
                />
            </CCol>
        </CRow>

      </CCardBody>
    </CCard>
  );
};

export default DCuidadoIdoso;