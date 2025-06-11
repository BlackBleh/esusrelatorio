import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard, CCardHeader, CCardBody,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle,
  CPagination, CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilX } from '@coreui/icons'
import api from 'src/service/api'

// Opções para o campo Sexo (baseado no enum Sexo do Java)
const SEXO_OPTIONS = [
  { value: 'MASCULINO', label: 'Masculino' },
  { value: 'FEMININO', label: 'Feminino' },
  { value: 'OUTRO', label: 'Outro' },
];

// Opções para UF
const UF_OPTIONS = [
  { value: 'AC', label: 'Acre' }, { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' }, { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' }, { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' }, { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' }, { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' }, { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' }, { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' }, { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' }, { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' }, { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' }, { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' }, { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' }, { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

const ServidorApoioList = () => {
  const [itens, setItens] = useState([])
  const [deleting, setDeleting] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const navigate = useNavigate()

  // ESTADOS DE PAGINAÇÃO
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    load(currentPage);
  }, [currentPage]);

  const load = async (page) => {
    try {
      console.log(`Frontend: Solicitando página ${page} com ${itemsPerPage} itens.`);
      const response = await api.get('/servidor-apoio', {
        params: {
          page: page - 1, // Spring Data JPA é 0-indexed
          size: itemsPerPage,
        }
      });
      
      console.log('Frontend: Resposta da API recebida:', response);
      console.log('Frontend: Dados (response.data):', response.data);
      console.log('Frontend: Cabeçalhos (response.headers):', response.headers);

      setItens(response.data);

      // NOVO LOG: Verifique o valor exato do cabeçalho X-Total-Count
      const xTotalCountHeader = response.headers['x-total-count'];
      console.log('Frontend: Valor bruto de X-Total-Count no cabeçalho:', xTotalCountHeader);

      const totalItems = parseInt(xTotalCountHeader || '0', 10);
      const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);

      setTotalPages(calculatedTotalPages);

      console.log('Frontend: Total de Itens (parseado):', totalItems);
      console.log('Frontend: Total de Páginas Calculado:', calculatedTotalPages);

    } catch (error) {
      console.error("Erro ao carregar servidores de apoio com paginação:", error);
      setItens([]);
      setTotalPages(1);
    }
  }

  const confirmDelete = (item) => {
    setDeleting(item)
    setModalVisible(true)
  }

  const doDelete = async () => {
    try {
      await api.delete(`/servidor-apoio/${deleting.id}`)
      setModalVisible(false)
      setDeleting(null)
      
      // Lógica para ajustar a página após a exclusão
      if (itens.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        load(currentPage);
      }
    } catch (error) {
      console.error("Erro ao excluir servidor de apoio:", error);
      setModalVisible(false); // Fecha o modal mesmo com erro
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h4>Servidores de Apoio</h4>
          <CButton color="primary" onClick={() => navigate('/servidorApoio/nova')}>
            <CIcon icon={cilPlus} className="me-1" /> Adicionar
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Nome</CTableHeaderCell>
                <CTableHeaderCell>Sexo</CTableHeaderCell>
                <CTableHeaderCell>Data Nasc.</CTableHeaderCell>
                <CTableHeaderCell>Logradouro</CTableHeaderCell>
                <CTableHeaderCell>Número</CTableHeaderCell>
                <CTableHeaderCell>Bairro</CTableHeaderCell>
                <CTableHeaderCell>Cidade</CTableHeaderCell>
                <CTableHeaderCell>UF</CTableHeaderCell>
                <CTableHeaderCell>CEP</CTableHeaderCell>
                <CTableHeaderCell>Celular</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>CPF</CTableHeaderCell>
                <CTableHeaderCell>Graduação</CTableHeaderCell>
                <CTableHeaderCell>PCD</CTableHeaderCell>
                <CTableHeaderCell>CID</CTableHeaderCell>
                <CTableHeaderCell className="text-end">Ações</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {itens.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="17" className="text-center">Nenhum servidor de apoio encontrado.</CTableDataCell>
                </CTableRow>
              ) : (
                itens.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.id}</CTableDataCell>
                    <CTableDataCell>{item.nome}</CTableDataCell>
                    <CTableDataCell>{SEXO_OPTIONS.find(o => o.value === item.sexo)?.label || item.sexo}</CTableDataCell>
                    <CTableDataCell>{new Date(item.dataNascimento).toLocaleDateString()}</CTableDataCell>
                    <CTableDataCell>{item.logradouro}</CTableDataCell>
                    <CTableDataCell>{item.numero}</CTableDataCell>
                    <CTableDataCell>{item.bairro}</CTableDataCell>
                    <CTableDataCell>{item.cidade}</CTableDataCell>
                    <CTableDataCell>{UF_OPTIONS.find(o => o.value === item.uf)?.label || item.uf}</CTableDataCell>
                    <CTableDataCell>{item.cep}</CTableDataCell>
                    <CTableDataCell>{item.celular}</CTableDataCell>
                    <CTableDataCell>{item.email}</CTableDataCell>
                    <CTableDataCell>{item.cpf}</CTableDataCell>
                    <CTableDataCell>{item.graduacao}</CTableDataCell>
                    <CTableDataCell>{item.pessoaComDeficiencia ? 'Sim' : 'Não'}</CTableDataCell>
                    <CTableDataCell>{item.cid || 'N/A'}</CTableDataCell>
                    <CTableDataCell className="text-end">
                      <CButton size="sm" color="warning" className="text-white me-1" onClick={() => navigate(`/servidorApoio/editar/${item.id}`)}>
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
          Tem certeza que deseja excluir o servidor “{deleting?.nome}”?
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

export default ServidorApoioList