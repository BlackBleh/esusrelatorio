import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard, CCardHeader, CCardBody,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, cilTrash, cilX, cilChartPie } from '@coreui/icons' // Adicionado cilChartPie
import api from '../../service/api';

const EscolaList = () => {
  const [escolas, setEscolas] = useState([])
  const [deleting, setDeleting] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const { data } = await api.get('/escola')
    setEscolas(data)
  }

  const confirmDelete = (escola) => {
    setDeleting(escola)
    setModalVisible(true)
  }

  const doDelete = async () => {
    await api.delete(`/escola/${deleting.id}`)
    setModalVisible(false)
    setDeleting(null)
    load()
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h4>Escolas</h4>
          <div> {/* Agrupar os botões */}
            <CButton color="primary" onClick={() => navigate('/escola/nova')}>
              <CIcon icon={cilPlus} className="me-1" />
              Adicionar Escola
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Nome</CTableHeaderCell>
                <CTableHeaderCell>Bairro</CTableHeaderCell>
                <CTableHeaderCell>Cidade</CTableHeaderCell>
                <CTableHeaderCell>UF</CTableHeaderCell>
                <CTableHeaderCell className="text-end">Ações</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {escolas.map((e) => (
                <CTableRow key={e.id}>
                  <CTableDataCell>{e.id}</CTableDataCell>
                  <CTableDataCell>{e.nome}</CTableDataCell>
                  <CTableDataCell>{e.bairro}</CTableDataCell>
                  <CTableDataCell>{e.cidade}</CTableDataCell>
                  <CTableDataCell>{e.uf}</CTableDataCell>
                  <CTableDataCell className="text-end">
                    {/* NOVO BOTÃO: Dashboard Individual por Escola */}
                    <CButton
                      size="sm"
                      color="info" // Cor diferente para o dashboard
                      className="text-white me-1"
                      onClick={() => navigate(`/escola/dashboard/${e.id}`)}
                    > {/* Rota com ID - COMENTÁRIO MOVIDO PARA CÁ */}
                      <CIcon icon={cilChartPie} className="me-1" />
                      Dashboard
                    </CButton>
                    <CButton
                      size="sm"
                      color="warning"
                      className="text-white me-1"
                      onClick={() => navigate(`/escola/editar/${e.id}`)}
                    >
                      <CIcon icon={cilPencil} className="me-1" />
                      Editar
                    </CButton>
                    <CButton
                      size="sm"
                      color="danger"
                      className="text-white"
                      onClick={() => confirmDelete(e)}
                    >
                      <CIcon icon={cilTrash} className="me-1" />
                      Remover
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Exclusão</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Tem certeza que deseja excluir “{deleting?.nome}”?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            <CIcon icon={cilX} />
            Cancelar
          </CButton>
          <CButton color="danger" className="text-white" onClick={doDelete}>
            <CIcon icon={cilTrash} />
            Excluir
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default EscolaList
