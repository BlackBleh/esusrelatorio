import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard, CCardHeader, CCardBody,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle,
  CPagination, CPaginationItem, // NOVO: Importar componentes de paginação
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilX } from '@coreui/icons'
import api from 'src/service/api'

const NECESSIDADE_LABELS = {
  NAO_NECESSITA: 'Não Necessita',
  NECESSITA:      'Necessita',
  IMPRESCINDIVEL:'Imprescindível',
}

const AlunoAtipicoList = () => {
  const [alunos, setAlunos] = useState([])
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
      console.log(`Frontend AlunoAtipico: Solicitando página ${page} com ${itemsPerPage} itens.`);
      const response = await api.get('/aluno-atipico', { // Endpoint da API para AlunoAtipico
        params: {
          page: page - 1, // API Pageable é 0-indexed
          size: itemsPerPage,
        }
      });
      setAlunos(response.data);

      const xTotalCountHeader = response.headers['x-total-count'];
      console.log('Frontend AlunoAtipico: Valor bruto de X-Total-Count no cabeçalho:', xTotalCountHeader);
      
      const totalItems = parseInt(xTotalCountHeader || '0', 10);
      const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);

      setTotalPages(calculatedTotalPages);

      console.log('Frontend AlunoAtipico: Total de Itens (parseado):', totalItems);
      console.log('Frontend AlunoAtipico: Total de Páginas Calculado:', calculatedTotalPages);

    } catch (error) {
      console.error("Erro ao carregar alunos atípicos com paginação:", error);
      setAlunos([]);
      setTotalPages(1);
    }
  }

  const confirmDelete = (a) => {
    setDeleting(a)
    setModalVisible(true)
  }

  const doDelete = async () => {
    try {
      await api.delete(`/aluno-atipico/${deleting.id}`)
      setModalVisible(false)
      setDeleting(null)
      // Lógica para ajustar a página após a exclusão
      if (alunos.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        load(currentPage); // Recarrega a página atual para atualizar a lista
      }
    } catch (error) {
      console.error("Erro ao excluir aluno atípico:", error);
      setModalVisible(false); // Fecha o modal mesmo com erro
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h4>Alunos Atípicos</h4>
          <CButton color="primary" onClick={() => navigate('/alunoAtipico/novo')}>
            <CIcon icon={cilPlus} className="me-1" /> Adicionar
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Nome</CTableHeaderCell>
                <CTableHeaderCell>Turma</CTableHeaderCell>
                <CTableHeaderCell>Data Nasc.</CTableHeaderCell>
                <CTableHeaderCell>Atipicidade</CTableHeaderCell>
                <CTableHeaderCell>Necessidade Apoio</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Ações</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {alunos.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="7" className="text-center">Nenhum aluno atípico encontrado.</CTableDataCell>
                </CTableRow>
              ) : (
                alunos.map(a => (
                  <CTableRow key={a.id}>
                    <CTableDataCell>{a.id}</CTableDataCell>
                    <CTableDataCell>{a.nome}</CTableDataCell>
                    <CTableDataCell>{`${a.turma?.serie || 'N/A'} ${a.turma?.anoLetivo || ''}`.trim()}</CTableDataCell>
                    <CTableDataCell>{new Date(a.dataNascimento).toLocaleDateString()}</CTableDataCell>
                    <CTableDataCell>{a.atipicidade?.descricao || 'N/A'}</CTableDataCell>
                    <CTableDataCell> {NECESSIDADE_LABELS[a.necessidadeDeServidorApoio] || a.necessidadeDeServidorApoio}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton size="sm" color="warning" className="text-white me-1" onClick={() => navigate(`/alunoAtipico/editar/${a.id}`)}>
                        <CIcon icon={cilPencil} className="me-1" /> Editar
                      </CButton>
                      <CButton size="sm" color="danger" className="text-white" onClick={() => confirmDelete(a)}>
                        <CIcon icon={cilTrash} className="me-1" /> Remover
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
          Tem certeza que deseja excluir “{deleting?.nome}”?
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

export default AlunoAtipicoList
