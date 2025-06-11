import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard, CCardHeader, CCardBody,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle,
  CPagination, CPaginationItem, // Importar componentes de paginação
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilX } from '@coreui/icons'
import api from 'src/service/api'

const LotacaoList = () => {
  const [itens, setItens] = useState([])
  const [deleting, setDeleting] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const navigate = useNavigate()

  // ESTADOS DE PAGINAÇÃO
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    load(currentPage); // Carrega os dados para a página atual
  }, [currentPage]); // Re-carrega os dados sempre que a página atual muda

  const load = async (page) => {
    try {
      console.log(`[LotacaoList] Frontend: Solicitando página ${page} com ${itemsPerPage} itens.`);
      const response = await api.get('/lotacao', {
        params: {
          page: page - 1, // API Pageable é 0-indexed
          size: itemsPerPage,
        }
      });
      
      console.log('[LotacaoList] Frontend: Resposta da API recebida:', response);
      console.log('[LotacaoList] Frontend: Dados (response.data):', response.data);
      console.log('[LotacaoList] Frontend: Cabeçalhos (response.headers):', response.headers);

      setItens(response.data);

      const xTotalCountHeader = response.headers['x-total-count'];
      console.log('[LotacaoList] Frontend: Valor bruto de X-Total-Count no cabeçalho:', xTotalCountHeader);

      const totalItems = parseInt(xTotalCountHeader || '0', 10);
      const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);

      setTotalPages(calculatedTotalPages);

      console.log('[LotacaoList] Frontend: Total de Itens (parseado):', totalItems);
      console.log('[LotacaoList] Frontend: Total de Páginas Calculado:', calculatedTotalPages);

      if (totalItems <= itemsPerPage) {
        console.log('[LotacaoList] Frontend: Menos ou igual a 20 itens, paginação não será mostrada.');
      } else {
        console.log(`[LotacaoList] Frontend: Mais de 20 itens (${totalItems}), paginação DEVE ser mostrada com ${calculatedTotalPages} páginas.`);
      }

    } catch (error) {
      console.error("[LotacaoList] Erro ao carregar lotações com paginação:", error);
      setItens([]);
      setTotalPages(1); // Garante que não haja paginação em caso de erro
    }
  }

  const confirmDelete = (item) => {
    setDeleting(item)
    setModalVisible(true)
  }

  const doDelete = async () => {
    try {
      await api.delete(`/lotacao/${deleting.id}`)
      setModalVisible(false)
      setDeleting(null)
      
      // Lógica para ajustar a página após a exclusão
      if (itens.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        load(currentPage); // Recarrega a página atual para atualizar a lista
      }
    } catch (error) {
      console.error("[LotacaoList] Erro ao excluir lotação:", error);
      setModalVisible(false); // Fecha o modal mesmo com erro
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h4>Lotações</h4>
          <CButton color="primary" onClick={() => navigate('/lotacao/nova')}>
            <CIcon icon={cilPlus} className="me-1" /> Adicionar
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Servidor de Apoio</CTableHeaderCell>
                <CTableHeaderCell>Aluno Atípico</CTableHeaderCell>
                <CTableHeaderCell>CID do Aluno</CTableHeaderCell>
                <CTableHeaderCell>Escola</CTableHeaderCell>
                <CTableHeaderCell>Turma</CTableHeaderCell>
                <CTableHeaderCell>Data Início</CTableHeaderCell>
                <CTableHeaderCell>Data Fim</CTableHeaderCell>
                <CTableHeaderCell className="text-end">Ações</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {itens.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="9" className="text-center">Nenhuma lotação encontrada.</CTableDataCell>
                </CTableRow>
              ) : (
                itens.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.id}</CTableDataCell>
                    <CTableDataCell>{item.servidorApoio?.nome}</CTableDataCell>
                    <CTableDataCell>{item.alunoAtipico?.nome}</CTableDataCell>
                    <CTableDataCell>{item.alunoAtipico?.atipicidade?.cid || 'N/A'}</CTableDataCell>
                    <CTableDataCell>{item.alunoAtipico?.turma?.escola?.nome || 'N/A'}</CTableDataCell>
                    <CTableDataCell>{`${item.alunoAtipico?.turma?.serie || ''} ${item.alunoAtipico?.turma?.anoLetivo || ''}`.trim() || 'N/A'}</CTableDataCell>
                    <CTableDataCell>{new Date(item.dataInicio).toLocaleDateString()}</CTableDataCell>
                    <CTableDataCell>{item.dataFim ? new Date(item.dataFim).toLocaleDateString() : 'Em aberto'}</CTableDataCell>
                    <CTableDataCell className="text-end">
                      <CButton size="sm" color="warning" className="text-white me-1" onClick={() => navigate(`/lotacao/editar/${item.id}`)}>
                        <CIcon icon={cilPencil} className="me-1" /> Editar
                      </CButton>
                      <CButton size="sm" color="danger" className="text-white" onClick={() => confirmDelete(item)}>
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
                {/* Renderiza os números das páginas */}
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
          Tem certeza que deseja excluir a lotação de **“{deleting?.servidorApoio?.nome}”** para o aluno **“{deleting?.alunoAtipico?.nome}”**?
          <br/>
          **(Início: {deleting?.dataInicio ? new Date(deleting.dataInicio).toLocaleDateString() : 'N/A'})**
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

export default LotacaoList
