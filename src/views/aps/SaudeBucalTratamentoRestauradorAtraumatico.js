// src/views/saudeBucal/TratamentoRestauradorAtraumatico.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';

// Importa os componentes de gráfico e tabela
import FGraficoSaudeBucalTratamentoRestauradorAtraumatico from '../../components/FGraficoSaudeBucalTratamentoRestauradorAtraumatico'; // Gráfico F geral
import F_TabelaSaudeBucalTratamentoRestauradorAtraumatico from '../../components/F_TabelaSaudeBucalTratamentoRestauradorAtraumatico'; // Tabela F geral
// NOVO: Importa o componente do gráfico F por UBS
import FGraficoSaudeBucalTratamentoRestauradorAtraumaticoPorUbs from '../../components/FGraficoSaudeBucalTratamentoRestauradorAtraumaticoPorUbs.jsx';


import api from '../../service/api';
import F_TabelaSaudeBucalTratamentoRestauradorAtraumaticoPorUbs from '../../components/F_TabelaSaudeBucalTratamentoRestauradorAtraumaticoPorUbs.jsx';

const SaudeBucalTratamentoRestauradorAtraumatico = () => {
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
        <h2>C.X. Saúde Bucal - Tratamento Restaurador Atraumático</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta a taxa de atendimentos com procedimentos restauradores atraumáticos em relação ao total de procedimentos restauradores realizados na Atenção Primária à Saúde (APS).</p>

        {/* Gráfico F: Tratamento Restaurador Atraumático (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">F. Taxa de Tratamento Restaurador Atraumático - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <FGraficoSaudeBucalTratamentoRestauradorAtraumatico
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela F: Pacientes com Tratamento Restaurador Atraumático (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <F_TabelaSaudeBucalTratamentoRestauradorAtraumatico
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

        {/* NOVO: Gráfico F - Saúde Bucal - Tratamento Restaurador Atraumático (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">F. Taxa de Tratamento Restaurador Atraumático por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <FGraficoSaudeBucalTratamentoRestauradorAtraumaticoPorUbs
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

        {/* Você pode adicionar uma Tabela F - Saúde Bucal POR UBS aqui, se necessário. */}
        <CRow className="mb-4">
                  <CCol md={12}>
                    <F_TabelaSaudeBucalTratamentoRestauradorAtraumaticoPorUbs
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

export default SaudeBucalTratamentoRestauradorAtraumatico;