import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard, CCardHeader, CCardBody,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle,
  CPagination, CPaginationItem, // NOVO: Importar componentes de paginação
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilTrash, cilX } from '@coreui/icons'
import api from 'src/service/api'

const TurmaList = () => {
  const [turmas, setTurmas] = useState([])
  const [deleting, setDeleting] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const navigate = useNavigate()

  // ESTADOS DE PAGINAÇÃO
  const [currentPage, setCurrentPage] = useState(1); // Página atual (começa em 1)
  const [totalPages, setTotalPages] = useState(1);  // Total de páginas
  const itemsPerPage = 20; // Itens por página

  useEffect(() => {
    load(currentPage); // Carrega os dados para a página atual
  }, [currentPage]); // Re-carrega os dados sempre que a página atual muda

  const load = async (page) => {
    try {
      console.log(`Frontend Turmas: Solicitando página ${page} com ${itemsPerPage} itens.`);
      const response = await api.get('/turma', { // Endpoint da API para Turmas
        params: {
          page: page - 1, // API Pageable é 0-indexed
          size: itemsPerPage,
        }
      });
      setTurmas(response.data);

      const xTotalCountHeader = response.headers['x-total-count'];
      console.log('Frontend Turmas: Valor bruto de X-Total-Count no cabeçalho:', xTotalCountHeader);
      
      const totalItems = parseInt(xTotalCountHeader || '0', 10);
      const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);

      setTotalPages(calculatedTotalPages);

      console.log('Frontend Turmas: Total de Itens (parseado):', totalItems);
      console.log('Frontend Turmas: Total de Páginas Calculado:', calculatedTotalPages);

    } catch (error) {
      console.error("Erro ao carregar turmas com paginação:", error);
      setTurmas([]);
      setTotalPages(1);
    }
  }

  const confirmDelete = (t) => {
    setDeleting(t)
    setModalVisible(true)
  }

  const doDelete = async () => {
    try {
      await api.delete(`/turma/${deleting.id}`)
      setModalVisible(false)
      setDeleting(null)
      // Lógica para ajustar a página após a exclusão
      if (turmas.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        load(currentPage); // Recarrega a página atual para atualizar a lista
      }
    } catch (error) {
      console.error("Erro ao excluir turma:", error);
      setModalVisible(false); // Fecha o modal mesmo com erro
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h4>Turmas</h4>
          <CButton color="primary" onClick={() => navigate('/turma/nova')}>
            <CIcon icon={cilPlus} className="me-1" />
            Adicionar Turma
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Escola</CTableHeaderCell>
                <CTableHeaderCell>Turno</CTableHeaderCell>
                <CTableHeaderCell>Série</CTableHeaderCell>
                <CTableHeaderCell>Ano Letivo</CTableHeaderCell>
                <CTableHeaderCell>Professor</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Ações</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {turmas.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="7" className="text-center">Nenhuma turma encontrada.</CTableDataCell>
                </CTableRow>
              ) : (
                turmas.map((t) => (
                  <CTableRow key={t.id}>
                    <CTableDataCell>{t.id}</CTableDataCell>
                    <CTableDataCell>{t.escola?.nome || 'N/A'}</CTableDataCell> {/* Acessa o nome da escola */}
                    <CTableDataCell>{t.turno}</CTableDataCell>
                    <CTableDataCell>{t.serie}</CTableDataCell>
                    <CTableDataCell>{t.anoLetivo}</CTableDataCell>
                    <CTableDataCell>{t.nomeProfessor}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton
                        size="sm"
                        color="warning"
                        className="text-white me-1"
                        onClick={() => navigate(`/turma/editar/${t.id}`)}
                      >
                        <CIcon icon={cilPencil} className="me-1" />
                        Editar
                      </CButton>
                      <CButton
                        size="sm"
                        color="danger"
                        className="text-white"
                        onClick={() => confirmDelete(t)}
                      >
                        <CIcon icon={cilTrash} className="me-1" />
                        Remover
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>

          {/* CONTROLES DE PAGINAÇÃO */}
          {totalPages > 1 && ( // Só mostra se houver mais de 1 página
            <div className="d-flex justify-content-center mt-3">
              <CPagination align="center" aria-label="Page navigation">
                <CPaginationItem
                  aria-label="Previous"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <CPaginationItem
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </CPaginationItem>
                ))}
                <CPaginationItem
                  aria-label="Next"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                >
                  <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>
              </CPagination>
            </div>
          )}
        </CCardBody>
      </CCard>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Exclusão</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Tem certeza que deseja excluir a turma “{deleting?.serie} – {deleting?.anoLetivo}”?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            <CIcon icon={cilX} /> Cancelar
          </CButton>
          <CButton color="danger" className="text-white" onClick={doDelete}>
            <CIcon icon={cilTrash} /> Excluir
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default TurmaList
