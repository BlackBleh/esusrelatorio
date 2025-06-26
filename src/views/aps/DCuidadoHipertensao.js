// src/views/aps/DCuidadoHipertensao.js
import React, { useEffect, useState } from 'react'; // Importe useEffect e useState
import { CCard, CCardBody, CCardHeader, CRow, CCol, CFormSelect, CFormLabel } from '@coreui/react'; // Importe CFormSelect e CFormLabel
import DGraficoHipertensos from '../../components/DGraficoHipertensos'; // Gráfico geral (sem filtro de UBS)
import D_TabelaHipertensosSemPesoAltura from '../../components/D_TabelaHipertensosSemPesoAltura'; // Tabela geral (sem filtro de UBS)
import DGraficoHipertensosPorUbs from '../../components/DGraficoHipertensosPorUbs'; // NOVO: Gráfico por UBS
import D_TabelaHipertensosSemPesoAlturaPorUbs from '../../components/D_TabelaHipertensosSemPesoAlturaPorUbs'; // NOVO: Tabela por UBS


import api from '../../service/api'; // Importa a instância do Axios para fazer chamadas à API

const DCuidadoHipertensao = () => {
  const dataFinalGrafico = new Date();
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setFullYear(dataInicialGrafico.getFullYear() - 1); // 12 meses atrás para peso/altura

  const alturaDosGraficos = '500px';

  const [ubsList, setUbsList] = useState([]); // Estado para armazenar a lista de UBSs
  const [selectedUbsId, setSelectedUbsId] = useState(null); // Estado para armazenar a UBS selecionada

  // useEffect para buscar a lista de UBSs quando o componente montar
  useEffect(() => {
    const fetchUbs = async () => {
      try {
        const response = await api.get('/api/ubs'); // Chamar o endpoint do backend para UBSs
        // Ordenar a lista de UBSs pelo nome
        const sortedUbs = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
        // Adicionar uma opção "Todas as UBSs" no início da lista
        setUbsList([{ id: null, nome: 'Todas as UBSs' }, ...sortedUbs]);
      } catch (error) {
        console.error("Erro ao carregar lista de UBSs:", error);
      }
    };

    fetchUbs();
  }, []); // Array de dependências vazio para rodar apenas uma vez ao montar

  // Handler para quando a UBS selecionada mudar
  const handleUbsChange = (event) => {
    // Converte o valor para número ou null se for 'null' string
    const value = event.target.value === 'null' ? null : Number(event.target.value);
    setSelectedUbsId(value);
  };

  return (
    <CCard className="mb-5">
      <CCardHeader>
        <h2>C.5. Cuidado da Pessoa com Hipertensão Arterial - D. Peso e Altura</h2>
      </CCardHeader>
      <CCardBody>
        <p>Este relatório mostra as estatísticas de registro de peso e altura para pessoas hipertensas nos últimos 12 meses.</p>

        {/* Gráfico D: Hipertensos com Registro de Peso e Altura (Geral) */}
        <CRow>
          <CCol md={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">D. Estatísticas de Peso e Altura de Hipertensos (Geral)</h5>
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}>
                  <DGraficoHipertensos
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    alturaGrafico={alturaDosGraficos}
                    // selectedUbsId é passado para o gráfico geral, embora ele não o utilize para filtragem de API
                    selectedUbsId={selectedUbsId} 
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Tabela de Hipertensos que NÃO Fizeram Registro de Peso e Altura (Geral) */}
        <CRow>
          <CCol md={12}>
            <D_TabelaHipertensosSemPesoAltura
              dataInicial={dataInicialGrafico}
              dataFinal={dataFinalGrafico}
              // selectedUbsId é passado para a tabela geral
              selectedUbsId={selectedUbsId} 
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

        {/* NOVO: Gráfico D: Hipertensos com Registro de Peso e Altura POR UBS */}
        <CRow className="mb-4">
            <CCol md={12}>
                <DGraficoHipertensosPorUbs
                  dataInicial={dataInicialGrafico}
                  dataFinal={dataFinalGrafico}
                  alturaGrafico={alturaDosGraficos}
                  selectedUbsId={selectedUbsId} /* Passa o selectedUbsId para o novo gráfico por UBS */
                />
            </CCol>
        </CRow>

        {/* NOVO: Tabela de Hipertensos que NÃO Fizeram Registro de Peso e Altura POR UBS */}
        <CRow>
            <CCol md={12}>
                <D_TabelaHipertensosSemPesoAlturaPorUbs
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

export default DCuidadoHipertensao;
