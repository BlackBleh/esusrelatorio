// src/views/aps/EGestantePuerpera.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react'; // Importar CFormSelect e CFormLabel

// Importa os componentes de gráfico e tabela
import EGraficoGestantePuerperaVisitaAcstacs from '../../components/EGraficoGestantePuerperaVisitaAcstacs'; // Gráfico E geral
import E_TabelaGestantePuerperaVisitaAcstacs from '../../components/E_TabelaGestantePuerperaVisitaAcstacs'; // Tabela E geral
// NOVO: Importa o componente do gráfico E por UBS
import EGraficoGestantePuerperaVisitaAcstacsPorUbs from '../../components/EGraficoGestantePuerperaVisitaAcstacsPorUbs';

import api from '../../service/api';
import E_TabelaGestantePuerperaVisitaAcstacsPorUbs from '../../components/E_TabelaGestantePuerperaVisitaAcstacsPorUbs';

const EGestantePuerpera = () => {
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
        <h2>C.X. Cuidado da Gestante e Puérpera - Visitas ACS/TACS</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas e uma lista de gestantes que não tiveram visitas essenciais de ACS/TACS.</p>

        {/* Gráfico E: Visitas ACS/TACS (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">E. Estatísticas de Visitas ACS/TACS (1ª em 30 dias, 2ª em 6 meses) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <EGraficoGestantePuerperaVisitaAcstacs
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela E: Gestantes Sem Visitas Essenciais ACS/TACS (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <E_TabelaGestantePuerperaVisitaAcstacs
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

        {/* NOVO: Gráfico E - Gestantes e Puérperas - Visitas ACS/TACS (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">E. Estatísticas de Visitas ACS/TACS (1ª em 30 dias, 2ª em 6 meses) - Por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <EGraficoGestantePuerperaVisitaAcstacsPorUbs
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
       
        <CRow className="mb-4">
          <CCol md={12}>
            <E_TabelaGestantePuerperaVisitaAcstacsPorUbs
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

export default EGestantePuerpera;