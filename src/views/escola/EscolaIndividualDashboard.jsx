import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CCard, CCardHeader, CCardBody, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
import api from 'src/service/api'
import GraficoAlunosPorEscolaId from 'src/components/GraficoAlunosPorEscolaId'
import GraficoAlunosPorGrupoPorEscolaId from 'src/components/GraficoAlunosPorGrupoPorEscolaId'
import GraficoTotalAlunosAtipicosPorEscolaId from 'src/components/GraficoTotalAlunosAtipicosPorEscolaId'

const EscolaIndividualDashboard = () => {
  const { id } = useParams()
  const [escolaInfo, setEscolaInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true);
    // Busca informações da escola específica
    api.get(`/escola/${id}`).then(res => {
      setEscolaInfo(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(`Erro ao carregar informações da escola ${id}:`, err);
      setError("Erro ao carregar informações da escola.");
      setLoading(false);
    });
  }, [id]); // Depende do ID para recarregar se o ID da URL mudar

  if (loading) {
    return (
      <CCard className="mb-4">
        <CCardHeader>
          <h4 className="mb-0">Dashboard da Escola</h4>
        </CCardHeader>
        <CCardBody><p>Carregando dashboard da escola...</p></CCardBody>
      </CCard>
    );
  }

  if (error) {
    return (
      <CCard className="mb-4">
        <CCardHeader>
          <h4 className="mb-0">Dashboard da Escola</h4>
        </CCardHeader>
        <CCardBody><p className="text-danger">{error}</p></CCardBody>
      </CCard>
    );
  }

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Dashboard da Escola: {escolaInfo?.nome}</h4>
        <CButton color="secondary" className="text-white" onClick={() => navigate('/escola')}>
          <CIcon icon={cilArrowLeft} className="me-1" />
          Voltar
        </CButton>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-4"> {/* Row para informações da escola */}
          <CCol xs={12}>
            <p>Este é o dashboard específico para a escola **{escolaInfo?.nome}** (ID: {id}).</p>
            <p>Aqui você pode adicionar gráficos, estatísticas e informações detalhadas sobre os alunos, lotações e servidores de apoio relacionados a esta escola em particular.</p>
          </CCol>
        </CRow>

        {/* NOVA ORGANIZAÇÃO DE GRÁFICOS: 2 por linha */}
        <CRow>
          {/* CARD 1: Gráfico de Total de Alunos Atípicos na Escola */}
          <CCol xs={12} md={6} className="d-flex justify-content-center align-items-center">
            <CCard className="mb-4 w-100 h-100">
              <CCardHeader>
                <h5>Total de Alunos Atípicos na Escola</h5>
              </CCardHeader>
              <CCardBody className="d-flex justify-content-center align-items-center">
                <div style={{ width: '100%', maxWidth: '400px', height: '250px' }}>
                  <GraficoTotalAlunosAtipicosPorEscolaId escolaId={id} />
                </div>
              </CCardBody>
            </CCard>
          </CCol>

          {/* CARD 2: Gráfico de Alunos com/sem Servidor de Apoio para esta Escola (PIZZA) */}
          <CCol xs={12} md={6} className="d-flex justify-content-center align-items-center">
            <CCard className="mb-4 w-100 h-100">
              <CCardHeader>
                <h5>Alunos por Servidor de Apoio</h5> {/* Mantido o título no header do card */}
              </CCardHeader>
              <CCardBody className="d-flex justify-content-center align-items-center">
                {/* AUMENTADO AINDA MAIS O TAMANHO DO CONTÊINER DO GRÁFICO PIZZA */}
                <div style={{ maxWidth: '500px', maxHeight: '500px', width: '100%', height: '100%' }}>
                  <GraficoAlunosPorEscolaId escolaId={id} />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          
          {/* CARD 3: Gráfico de Alunos por Grupo para esta Escola (BARRAS) */}
          <CCol xs={12} md={6} className="d-flex justify-content-center align-items-center">
            <CCard className="mb-4 w-100 h-100">
              <CCardHeader>
                <h5>Alunos por Situação de Apoio na Escola</h5>
              </CCardHeader>
              <CCardBody className="d-flex justify-content-center align-items-center">
                <div style={{ width: '100%', height: '300px' }}>
                  <GraficoAlunosPorGrupoPorEscolaId escolaId={id} />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          
          {/* Adicione outros gráficos aqui, cada um em sua própria CCol md={6} */}
          {/* Exemplo: GraficoAlunosPorTurmaNaEscola escolaId={id} */}
          
        </CRow>
        
      </CCardBody>
    </CCard>
  )
}

export default EscolaIndividualDashboard
