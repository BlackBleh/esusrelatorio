// src/views/aps/ACuidadoGestantePuerpera.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';

// Importa os componentes de gráfico e tabela
import AGraficoGestantePuerperaPreNatal from '../../components/AGraficoGestantePuerperaPreNatal'; // Gráfico A geral
import A_TabelaGestantePuerperaPreNatal from '../../components/A_TabelaGestantePuerperaPreNatal'; // Tabela A geral
import AGraficoGestantePuerperaPreNatalPorUbs from '../../components/AGraficoGestantePuerperaPreNatalPorUbs'; // Gráfico A por UBS
// NOVO: Importa o componente da tabela A por UBS
import A_TabelaGestantePuerperaPreNatalPorUbs from '../../components/A_TabelaGestantePuerperaPreNatalPorUbs';


import api from '../../service/api';

const ACuidadoGestantePuerpera = () => {
  const dataFinalPeriodo = new Date(); // Data atual
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
        <h2>C.X. Cuidado da Gestante e Puérpera - Pré-Natal</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas sobre a realização da primeira consulta de pré-natal para gestantes.</p>

        {/* Gráfico A: Pré-Natal (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Estatísticas de 1ª Consulta Pré-Natal (até 12 semanas DUM) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <AGraficoGestantePuerperaPreNatal
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela A: Gestantes Sem 1ª Consulta Pré-Natal (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaGestantePuerperaPreNatal
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

        {/* Gráfico A - Gestantes e Puérperas - Pré-Natal (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Estatísticas de 1ª Consulta Pré-Natal (até 12 semanas DUM) - Por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <AGraficoGestantePuerperaPreNatalPorUbs
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

        {/* NOVO: Tabela A - Gestantes e Puérperas - Pré-Natal POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaGestantePuerperaPreNatalPorUbs
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

export default ACuidadoGestantePuerpera;