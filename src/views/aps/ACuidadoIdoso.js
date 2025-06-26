// src/views/aps/ACuidadoIdoso.js
import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react';
import AGraficoIdoso from '../../components/AGraficoIdoso'; // Gráfico A geral
import A_TabelaIdososSemConsulta from '../../components/A_TabelaIdososSemConsulta'; // Tabela A geral

// NOVAS IMPORTAÇÕES PARA O GRÁFICO E TABELA A POR UBS
import AGraficoIdosoPorUbs from '../../components/AGraficoIdosoPorUbs'; // NOVO: Gráfico A por UBS
import A_TabelaIdososSemConsultaPorUbs from '../../components/A_TabelaIdososSemConsultaPorUbs'; // NOVO: Tabela A por UBS

import api from '../../service/api';

const ACuidadoIdoso = () => {
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
        <h2>Cuidado Integral da Pessoa Idosa - A. Consultas</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório mostra as estatísticas de idosos que tiveram pelo menos uma consulta presencial ou remota por médico(a) ou enfermeiro(a) nos últimos 12 meses.</p>

        {/* Gráfico A: Idosos com Consulta Méd/Enf (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">A. Estatísticas de Idosos com Consulta Méd/Enf (Geral)</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <AGraficoIdoso
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

        {/* Tabela A: Idosos que NÃO Fizeram Consulta com Médico ou Enfermeiro (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaIdososSemConsulta
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

        {/* NOVOS GRÁFICOS E TABELAS POR UBS (Categoria A) */}

        {/* Gráfico A: Idosos com Consulta Méd/Enf POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <AGraficoIdosoPorUbs
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
              alturaGrafico={alturaDosGraficos}
              selectedUbsId={selectedUbsId} /* Passa o selectedUbsId para o gráfico por UBS */
            />
          </CCol>
        </CRow>

        {/* Tabela A: Idosos que NÃO Fizeram Consulta com Médico ou Enfermeiro POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <A_TabelaIdososSemConsultaPorUbs
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

export default ACuidadoIdoso;