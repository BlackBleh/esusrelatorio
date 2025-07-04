// src/views/aps/CCuidadoMulherCancer.js
import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';

// Importa o componente do gráfico C geral
import CGraficoMulherCancerAtendimentoSaudeSexualReprodutiva from '../../components/CGraficoMulherCancerAtendimentoSaudeSexualReprodutiva';
// Importa o componente da tabela C geral
import C_TabelaMulherCancerAtendimentoSaudeSexualReprodutiva from '../../components/C_TabelaMulherCancerAtendimentoSaudeSexualReprodutiva';
// Importa o componente do gráfico C por UBS
import CGraficoMulherCancerAtendimentoSaudeSexualReprodutivaPorUbs from '../../components/CGraficoMulherCancerAtendimentoSaudeSexualReprodutivaPorUbs';
// NOVO: Importa o componente da tabela C por UBS
import C_TabelaMulherCancerAtendimentoSaudeSexualReprodutivaPorUbs from '../../components/C_TabelaMulherCancerAtendimentoSaudeSexualReprodutivaPorUbs';


import api from '../../service/api'; // Necessário para buscar a lista de UBSs

const CCuidadoMulherCancer = () => {
  const dataFinalPeriodo = new Date();
  const dataInicialPeriodo = new Date();
  dataInicialPeriodo.setFullYear(dataInicialPeriodo.getFullYear() - 1); // 1 ano atrás

  const alturaDosGraficos = '500px';

  const [ubsList, setUbsList] = useState([]);
  const [selectedUbsId, setSelectedUbsId] = useState(null); // Estado para o ID da UBS selecionada

  // Hook para buscar a lista de UBSs
  useEffect(() => {
    const fetchUbs = async () => {
      try {
        const response = await api.get('/api/ubs'); // Endpoint para listar UBSs
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
        <h2>C.X. Cuidado da Mulher - Atendimento de Saúde Sexual e Reprodutiva</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório apresenta estatísticas e uma lista de mulheres entre 14 e 69 anos que tiveram atendimento relacionado à saúde sexual e reprodutiva no período.</p>

        {/* Gráfico C: Atendimento de Saúde Sexual e Reprodutiva (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">C. Estatísticas de Atendimento de Saúde Sexual e Reprodutiva (14 a 69 anos) - Geral</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <CGraficoMulherCancerAtendimentoSaudeSexualReprodutiva
                    dataInicial={dataInicialPeriodo}
                    dataFinal={dataFinalPeriodo}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela C: Mulheres (14 a 69 anos) que NÃO Tiveram Atendimento de Saúde Sexual e Reprodutiva (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <C_TabelaMulherCancerAtendimentoSaudeSexualReprodutiva
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

        {/* Gráfico C - Mulheres Câncer - Atendimento Saúde Sexual e Reprodutiva (Por UBS) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">C. Estatísticas de Atendimento de Saúde Sexual e Reprodutiva (14 a 69 anos) - Por UBS</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <CGraficoMulherCancerAtendimentoSaudeSexualReprodutivaPorUbs
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

        {/* NOVO: Tabela C - Mulher Câncer - Atendimento Saúde Sexual e Reprodutiva POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <C_TabelaMulherCancerAtendimentoSaudeSexualReprodutivaPorUbs
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

export default CCuidadoMulherCancer;