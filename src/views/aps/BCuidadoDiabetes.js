// src/views/aps/BCuidadoDiabetes.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react'; // Importar CFormSelect e CFormLabel

// Importa os componentes de gráfico e tabela
import BGraficoCuidadoDiabetesPressao from '../../components/BGraficoCuidadoDiabetesPressao'; // Gráfico B geral
import B_TabelaCuidadoDiabetesPressao from '../../components/B_TabelaCuidadoDiabetesPressao'; // Tabela B geral
// NOVO: Importa o componente do gráfico B por UBS
import BGraficoCuidadoDiabetesPressaoPorUbs from '../../components/BGraficoCuidadoDiabetesPressaoPorUbs';
import B_TabelaCuidadoDiabetesPressaoPorUbs from '../../components/B_TabelaCuidadoDiabetesPressaoPorUbs';


import api from '../../service/api';

const BCuidadoDiabetes = () => {
  const dataFinalPeriodo = new Date(); // Data atual
  const dataInicialPeriodo = new Date();
  dataInicialPeriodo.setMonth(dataInicialPeriodo.getMonth() - 6); // 6 meses atrás

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
        <h2>C.X. Cuidado da Pessoa com Diabetes - Pressão Arterial</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas sobre os registros de pressão arterial para pacientes com Diabetes nos últimos 6 meses.</p>

        {/* Gráfico B: Pressão Arterial (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">B. Estatísticas de Registros de Pressão Arterial de Diabéticos - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <BGraficoCuidadoDiabetesPressao
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela B: Diabéticos Sem Registro de Pressão Arterial (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <B_TabelaCuidadoDiabetesPressao
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

        {/* NOVO: Gráfico B - Diabetes - Pressão Arterial (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">B. Estatísticas de Registros de Pressão Arterial de Diabéticos - Por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <BGraficoCuidadoDiabetesPressaoPorUbs
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

        {/* Você pode adicionar uma Tabela B - Diabetes POR UBS aqui, se necessário. */}
        <CRow className="mb-4">
          <CCol md={12}>
            <B_TabelaCuidadoDiabetesPressaoPorUbs
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

export default BCuidadoDiabetes;