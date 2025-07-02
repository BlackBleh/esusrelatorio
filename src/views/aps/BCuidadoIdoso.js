// src/views/aps/BCuidadoIdoso.js
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

// Importações específicas para Cuidado do Idoso - B. Peso e Altura
// ANTES: import DGraficoIdoso from '../../components/DGraficoIdoso'; // ESTE ERA O GRÁFICO DA VACINA
import BGraficoIdoso from '../../components/BGraficoIdoso'; // AGORA IMPORTAMOS O GRÁFICO CORRETO DE PESO/ALTURA
import B_TabelaIdososSemPesoAltura from '../../components/B_TabelaIdososSemPesoAltura'; // Tabela B geral (peso/altura)

// NOVAS IMPORTAÇÕES PARA O GRÁFICO E TABELA B POR UBS
import BGraficoIdosoPorUbs from '../../components/BGraficoIdosoPorUbs'; // Gráfico B por UBS
import B_TabelaIdososSemPesoAlturaPorUbs from '../../components/B_TabelaIdososSemPesoAlturaPorUbs'; // Tabela B por UBS

import api from '../../service/api';

const BCuidadoIdoso = () => { // Nome do componente alterado para BCuidadoIdoso
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
        <h2>Cuidado Integral da Pessoa Idosa - B. Peso e Altura</h2> {/* Título ajustado */}
      </CCardHeader>
      <CCardBody>
        <p>Este relatório mostra estatísticas e listas de idosos relacionadas ao registro de peso e altura no período.</p> {/* Descrição ajustada */}

        {/* GRÁFICOS E TABELAS GERAIS */}
        {/* Gráfico B: Idosos com Peso e Altura (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">B. Estatísticas de Peso e Altura de Idosos (Geral)</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <BGraficoIdoso // AGORA USAMOS O COMPONENTE BGraficoIdoso para Peso/Altura
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela B: Idosos que NÃO Fizeram Registro de Peso e Altura (Geral) */}
        <CRow className="mb-4">
          <CCol md={12}>
            <B_TabelaIdososSemPesoAltura // Componente geral de tabela para peso/altura
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
            />
          </CCol>
        </CRow>

        {/* FILTRO DE UBS PARA RELATÓRIOS POR UBS */}
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

        {/* NOVOS GRÁFICOS E TABELAS POR UBS */}

        {/* Gráfico B: Idosos com Peso e Altura POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <BGraficoIdosoPorUbs // Componente do gráfico de peso/altura por UBS
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
              alturaGrafico={alturaDosGraficos}
              selectedUbsId={selectedUbsId}
            />
          </CCol>
        </CRow>

        {/* Tabela B: Idosos que NÃO Fizeram Registro de Peso e Altura POR UBS */}
        <CRow className="mb-4">
          <CCol md={12}>
            <B_TabelaIdososSemPesoAlturaPorUbs // Componente da tabela de peso/altura por UBS
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
              selectedUbsId={selectedUbsId}
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default BCuidadoIdoso;