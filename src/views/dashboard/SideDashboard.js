import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
// Removidos imports não utilizados após a remoção de outros widgets/tabelas
// import classNames from 'classnames'
// import { CAvatar, CButton, CButtonGroup, CCardFooter, CProgress, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,} from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cibCcAmex, cibCcApplePay, cibCcMastercard, cibCcPaypal, cibCcStripe, cibCcVisa, cibGoogle, cibFacebook, cibLinkedin, cifBr, cifEs, cifFr, cifIn, cifPl, cifUs, cibTwitter, cilCloudDownload, cilPeople, cilUser, cilUserFemale, cilChartPie,} from '@coreui/icons'
// import avatar1 from 'src/assets/images/avatars/1.jpg'
// import avatar2 from 'src/assets/images/avatars/2.jpg'
// import avatar3 from 'src/assets/images/avatars/3.jpg'
// import avatar4 from 'src/assets/images/avatars/4.jpg'
// import avatar5 from 'src/assets/images/avatars/5.jpg'
// import avatar6 from 'src/assets/images/avatars/6.jpg'
// import WidgetsBrand from '../widgets/WidgetsBrand'
// import WidgetsDropdown from '../widgets/WidgetsDropdown'
// import MainChart from './MainChart'

import GraficoServidorApoio from '../../components/GraficoServidorApoio'
import GraficoAlunosPorGrupo from '../../components/GraficoAlunosPorGrupo'
import GraficoAlunosPorEscola from '../../components/GraficoAlunosPorEscola'
import GraficoServidoresPorEscola from '../../components/GraficoServidoresPorEscola'

const SideDashboard = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h4>Estatísticas de Alunos Atípicos</h4>
        </CCardHeader>
        <CCardBody>
          {/* NOVA LINHA PARA AGRUPAR OS GRÁFICOS LADO A LADO */}
          <CRow className="justify-content-center"> {/* Centraliza a linha de cards */}
            {/* CARD 1: Gráfico de Pizza (Estatísticas Gerais) */}
            <CCol xs={12} md={6} className="d-flex justify-content-center align-items-center"> {/* Coloca o card em 6 colunas, e centraliza o conteúdo */}
              <CCard className="mb-4 w-100 h-100"> {/* w-100 para que o card ocupe a largura da coluna, h-100 para altura consistente */}
                <CCardHeader>
                  <h5>Estatísticas de Alunos Atípicos (Geral)</h5>
                </CCardHeader>
                <CCardBody className="d-flex justify-content-center align-items-center"> {/* Centraliza conteúdo do corpo */}
                  <div style={{ maxWidth: '300px', maxHeight: '300px' }}> {/* Contêiner para limitar o tamanho do gráfico de pizza */}
                    <GraficoServidorApoio />
                  </div>
                </CCardBody>
              </CCard>
            </CCol>

            {/* CARD 2: Gráfico de Colunas (Alunos por Situação de Apoio) */}
            <CCol xs={12} md={6} className="d-flex justify-content-center align-items-center"> {/* Coloca o card em 6 colunas, e centraliza o conteúdo */}
              <CCard className="mb-4 w-100 h-100"> {/* w-100 para que o card ocupe a largura da coluna, h-100 para altura consistente */}
                <CCardHeader>
                  <h5>Alunos Atípicos por Situação de Apoio</h5>
                </CCardHeader>
                <CCardBody className="d-flex justify-content-center align-items-center"> {/* Centraliza conteúdo do corpo */}
                  <div style={{ width: '100%', height: '300px' }}> {/* Contêiner com altura fixa para gráfico de barras */}
                    <GraficoAlunosPorGrupo />
                  </div>
                </CCardBody>
              </CCard>
            </CCol>

            {/* CARD 3: Gráfico de Colunas (Alunos por Escola) */}
            <CCol xs={12} md={6} className="d-flex justify-content-center align-items-center"> {/* Coloca o card em 6 colunas, e centraliza o conteúdo */}
              <CCard className="mb-4 w-100 h-100"> {/* w-100 para que o card ocupe a largura da coluna, h-100 para altura consistente */}
                <CCardHeader>
                  <h5>Alunos Atípicos por Escola</h5>
                </CCardHeader>
                <CCardBody className="d-flex justify-content-center align-items-center"> {/* Centraliza conteúdo do corpo */}
                  <div style={{ width: '100%', height: '300px' }}> {/* Contêiner com altura fixa para gráfico de barras */}
                    <GraficoAlunosPorEscola />
                  </div>
                </CCardBody>
              </CCard>
            </CCol>

            {/* CARD 4: Gráfico de Colunas (Servidores de Apoio por Escola) */}
            <CCol xs={12} md={6} className="d-flex justify-content-center align-items-center"> {/* Coloca o card em 6 colunas, e centraliza o conteúdo */}
              <CCard className="mb-4 w-100 h-100"> {/* w-100 para que o card ocupe a largura da coluna, h-100 para altura consistente */}
                <CCardHeader>
                  <h5>Servidores de Apoio por Escola</h5>
                </CCardHeader>
                <CCardBody className="d-flex justify-content-center align-items-center"> {/* Centraliza conteúdo do corpo */}
                  <div style={{ width: '100%', height: '300px' }}> {/* Contêiner com altura fixa para gráfico de barras */}
                    <GraficoServidoresPorEscola />
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default SideDashboard
