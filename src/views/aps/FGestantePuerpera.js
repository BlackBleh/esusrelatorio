// src/views/aps/FGestantePuerpera.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react'; // Importar CFormSelect e CFormLabel

// Importa os componentes de gráfico e tabela
import FGraficoGestantePuerperaDoseDtpa from '../../components/FGraficoGestantePuerperaDoseDtpa'; // Gráfico F geral
import F_TabelaGestantePuerperaDoseDtpa from '../../components/F_TabelaGestantePuerperaDoseDtpa'; // Tabela F geral
// NOVO: Importa o componente do gráfico F por UBS
import FGraficoGestantePuerperaDoseDtpaPorUbs from '../../components/FGraficoGestantePuerperaDoseDtpaPorUbs';

import api from '../../service/api';
import F_TabelaGestantePuerperaDoseDtpaPorUbs from '../../components/F_TabelaGestantePuerperaDoseDtpaPorUbs';

const FGestantePuerpera = () => {
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
        <h2>C.X. Cuidado da Gestante e Puérpera - Dose dTpa</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas e uma lista de gestantes que não tiveram a dose dTpa após a 20ª semana de gestação.</p>

        {/* Gráfico F: Dose dTpa (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">F. Estatísticas de Dose dTpa (após 20 semanas de gestação) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <FGraficoGestantePuerperaDoseDtpa
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela F: Gestantes Sem Dose dTpa (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <F_TabelaGestantePuerperaDoseDtpa
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

        {/* NOVO: Gráfico F - Gestantes e Puérperas - Dose dTpa (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">F. Estatísticas de Dose dTpa (após 20 semanas de gestação) - Por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <FGraficoGestantePuerperaDoseDtpaPorUbs
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

        {/* Você pode adicionar uma Tabela F - Gestantes e Puérperas POR UBS aqui, se necessário. */}
        <CRow className="mb-4">
          <CCol md={12}>
            <F_TabelaGestantePuerperaDoseDtpaPorUbs
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

export default FGestantePuerpera;