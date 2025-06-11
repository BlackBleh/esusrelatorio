import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CCard, CCardHeader, CCardBody,
  CForm, CFormLabel, CFormInput,
  CButton, CRow, CCol,
  useColorModes, // Para tema dinâmico dos Selects
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave, cilX } from '@coreui/icons'
import Select from 'react-select'
import api from 'src/service/api'

// Valores iniciais para o formulário de Lotação
const initialLotacaoForm = {
  servidorApoioId: null,
  alunoAtipicoId: null,
  dataInicio: '', // Será preenchido no useEffect para nova lotação
  dataFim: '',    // Permanece vazio
  turmaId: null,  // Campo invisível, preenchido via lógica
}

const LotacaoAddEdit = () => {
  const [form, setForm] = useState(initialLotacaoForm)
  const [servidorApoioOpts, setServidorApoioOpts] = useState([])
  const [alunoAtipicoOpts, setAlunoAtipicoOpts] = useState([])
  const [selectedServidorApoio, setSelectedServidorApoio] = useState(null)
  const [selectedAlunoAtipico, setSelectedAlunoAtipico] = useState(null)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  // Obter o modo de cor atual do CoreUI para estilos do Select
  const { colorMode } = useColorModes('coreui-free-react-admin-template-theme')

  // ESTADOS PARA ERROS DE VALIDAÇÃO
  const [servidorApoioError, setServidorApoioError] = useState(false);
  const [alunoAtipicoError, setAlunoAtipicoError] = useState(false);
  const [dataInicioError, setDataInicioError] = useState(false);
  const [turmaIdError, setTurmaIdError] = useState(false); // CORREÇÃO: Adicionado setTurmaIdError

  // 1. Carregar opções de ServidorApoio e AlunoAtipico
  useEffect(() => {
    api.get('/servidor-apoio').then(({ data }) => {
      setServidorApoioOpts(data.map(s => ({ value: s.id, label: s.nome })))
    }).catch(error => console.error("Erro ao carregar servidores de apoio:", error));

    api.get('/aluno-atipico').then(({ data }) => {
      setAlunoAtipicoOpts(data.map(a => ({ value: a.id,
         label: a.nome +" ("+ a.turma?.escola?.nome+") " })))
    }).catch(error => console.error("Erro ao carregar alunos atípicos:", error));
  }, [])

  // 2. Carregar Lotação para edição (se houver ID) ou pré-selecionar dataInicio para nova lotação
  useEffect(() => {
    if (id && servidorApoioOpts.length && alunoAtipicoOpts.length) {
      api.get(`/lotacao/${id}`).then(({ data }) => {
        setForm({
          servidorApoioId: data.servidorApoio.id,
          alunoAtipicoId: data.alunoAtipico.id,
          dataInicio: data.dataInicio, // Assume formatoYYYY-MM-DD
          dataFim: data.dataFim,       // Assume formatoYYYY-MM-DD
          turmaId: data.turma.id,      // Carrega o turmaId existente
        })
        // ATENÇÃO: Corrigido para definir os objetos de opção selecionados
        setSelectedServidorApoio(servidorApoioOpts.find(o => o.value === data.servidorApoio.id) || null)
        setSelectedAlunoAtipico(alunoAtipicoOpts.find(o => o.value === data.alunoAtipico.id) || null)
      }).catch(error => console.error(`Erro ao carregar lotação com ID ${id}:`, error));
    } else if (!id) { // Se for uma nova lotação (sem ID)
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês 0-11
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      setForm(prevForm => ({
        ...prevForm,
        dataInicio: formattedDate, // Pré-seleciona a data de hoje
        dataFim: '',               // Garante que dataFim esteja vazio para nova lotação
      }));
    }
  }, [id, servidorApoioOpts, alunoAtipicoOpts]) // Dependências para o useEffect

  // 3. Lógica para preencher turmaId com base no AlunoAtipico selecionado
  // Este useEffect agora apenas observa e atualiza o estado, mas a resolução final para o submit
  // será feita diretamente no handleSubmit para evitar race conditions.
  useEffect(() => {
    if (form.alunoAtipicoId) {
      // Não precisamos do resultado aqui para o submit, apenas para o estado interno do form
      // A resolução para o submit será feita no handleSubmit
      api.get(`/aluno-atipico/${form.alunoAtipicoId}`).then(({ data }) => {
        setForm(prevForm => ({ ...prevForm, turmaId: data.turma.id }));
      }).catch(error => {
        console.error("Erro ao buscar turma do aluno atípico:", error);
        setForm(prevForm => ({ ...prevForm, turmaId: null })); // Limpa turmaId em caso de erro
      });
    } else {
      setForm(prevForm => ({ ...prevForm, turmaId: null })); // Limpa turmaId se nenhum aluno for selecionado
    }
  }, [form.alunoAtipicoId]);


  // Função de validação para data (não futura e válida)
  const validateDateField = (value) => {
    if (!value) return false; // Não pode ser vazio
    const selectedDate = new Date(value);
    const currentDate = new Date();
    selectedDate.setHours(0, 0, 0, 0); // Zera horas para comparar apenas as datas
    currentDate.setHours(0, 0, 0, 0);
    return selectedDate <= currentDate; // Data selecionada deve ser menor ou igual à data atual
  };

  // Função de validação para garantir que dataFim é depois de dataInicio
  // Esta função não será usada na validação do submit, mas pode ser útil para outros fins
  const validateEndDate = (startDate, endDate) => {
    if (!startDate || !endDate) return false;
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    return end >= start; // Data de fim deve ser maior ou igual à data de início
  };

  const handleChange = (field) => (e) => {
    const { value } = e.target;
    setForm(f => ({ ...f, [field]: value }));

    // Lógica de validação
    switch (field) {
      case 'dataInicio':
        setDataInicioError(!validateDateField(value));
        break;
      // Removido o case para dataFim, pois o campo não está visível
      default:
        break;
    }
  }

  const handleSelectChange = (field) => (opt) => {
    // ATENÇÃO: Atualiza o estado do Select com o objeto de opção completo
    // E o estado do formulário com o valor (id)
    if (field === 'servidorApoioId') {
      setSelectedServidorApoio(opt);
      setServidorApoioError(opt === null);
    } else if (field === 'alunoAtipicoId') {
      setSelectedAlunoAtipico(opt);
      setAlunoAtipicoError(opt === null);
    }
    setForm(f => ({ ...f, [field]: opt ? opt.value : null }));
  }

  const handleBlur = (field) => (e) => {
    const { value } = e.target;
    // Revalida no blur
    switch (field) {
      case 'dataInicio':
        setDataInicioError(!validateDateField(value));
        break;
      // Removido o case para dataFim
      default:
        break;
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Validação final de todos os campos antes de salvar
    const isServidorApoioSelected = form.servidorApoioId !== null;
    const isAlunoAtipicoSelected = form.alunoAtipicoId !== null;
    const isDataInicioValid = validateDateField(form.dataInicio);
    // dataFim não é mais validado aqui, pois é null no frontend e assumimos que é nullable no backend

    // --- RESOLVER turmaId Sincronamente ANTES DE ENVIAR ---
    let resolvedTurmaId = form.turmaId;
    if (form.alunoAtipicoId && resolvedTurmaId === null) {
      try {
        const { data } = await api.get(`/aluno-atipico/${form.alunoAtipicoId}`);
        resolvedTurmaId = data.turma.id;
        // Não atualiza o estado 'form' aqui para evitar re-render desnecessário antes do submit
        // setForm(prevForm => ({ ...prevForm, turmaId: resolvedTurmaId })); 
      } catch (error) {
        console.error("Erro ao buscar turma do aluno atípico no submit:", error);
        resolvedTurmaId = null; // Garante que é null se a busca falhar
      }
    }
    const isTurmaIdPresent = resolvedTurmaId !== null; // Verifica se a turma foi resolvida


    // ATUALIZA OS ESTADOS DE ERRO PARA EXIBICAO VISUAL
    setServidorApoioError(!isServidorApoioSelected);
    setAlunoAtipicoError(!isAlunoAtipicoSelected);
    setDataInicioError(!isDataInicioValid);
    setTurmaIdError(!isTurmaIdPresent); // Adicionado para feedback visual da turma


    // --- LOGS DE DEPURACAO ---
    console.log('--- Validação Final no Submit ---');
    console.log('isServidorApoioSelected:', isServidorApoioSelected);
    console.log('isAlunoAtipicoSelected:', isAlunoAtipicoSelected);
    console.log('isDataInicioValid:', isDataInicioValid);
    console.log('isTurmaIdPresent (resolvida):', isTurmaIdPresent);
    console.log('Dados do formulário (form):', form); // Log dos dados brutos do formulário
    console.log('-----------------------');


    if (!isServidorApoioSelected || !isAlunoAtipicoSelected || !isDataInicioValid || !isTurmaIdPresent) {
      console.error('Erro de validação: Por favor, preencha todos os campos corretamente e garanta que a turma do aluno foi carregada.');
      return; // Impede o envio do formulário
    }

    setSaving(true)
    try {
      // Formato dos dados para o backend (AJUSTADO PARA ENVIAR APENAS IDS DIRETAMENTE)
      const dataToSend = {
        id: id || null, // Inclui ID se for edição
        servidorApoioId: form.servidorApoioId, // Enviando apenas o ID
        alunoAtipicoId: form.alunoAtipicoId,   // Enviando apenas o ID
        dataInicio: form.dataInicio,           //YYYY-MM-DD
        dataFim: null,                         // Enviando null para dataFim (backend deve permitir)
        turmaId: resolvedTurmaId,              // Usando o turmaId resolvido aqui
      };

      console.log('Enviando para o backend:', dataToSend); // Log dos dados formatados para envio

      if (id) await api.put(`/lotacao/${id}`, dataToSend)
      else await api.post('/lotacao', dataToSend)
      navigate('/lotacao')
    } finally {
      setSaving(false)
    }
  }

  // Estilos customizados para o React Select, agora dinâmicos com base no colorMode
  const customStyles = useMemo(() => {
    const isDark = colorMode === 'dark';
    const bgColor = isDark ? '#2a3038' : '#ffffff'; // Fundo do controle e menu
    const borderColor = isDark ? '#3f454d' : '#dee2e6'; // Borda
    const textColor = isDark ? 'white' : '#212529'; // Cor do texto
    const placeholderColor = isDark ? '#aaaaaa' : '#6c757d'; // Cor do placeholder
    const focusedBgColor = isDark ? '#3f454d' : '#e9ecef'; // Fundo da opção focada
    const activeBgColor = isDark ? '#1f242a' : '#e2e6ea'; // Fundo da opção clicada

    const currentColors = { // Definido aqui para ser acessível
      bgColor,
      borderColor,
      textColor,
      placeholderColor,
      focusedBgColor,
      activeBgColor,
      boxShadowColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)',
      hoverBorderColor: isDark ? '#5a6268' : '#adb5bd',
      indicatorColor: isDark ? '#aaaaaa' : '#6c757d',
    };

    return {
      menu: (provided) => ({
        ...provided,
        backgroundColor: `${currentColors.bgColor} !important`,
        borderColor: `${currentColors.borderColor} !important`,
        boxShadow: `0px 4px 8px ${currentColors.boxShadowColor}`,
        zIndex: 9999,
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: `${state.isFocused ? currentColors.focusedBgColor : currentColors.bgColor} !important`,
        color: `${currentColors.textColor} !important`,
        '&:active': {
          backgroundColor: `${currentColors.activeBgColor} !important`,
        },
      }),
      control: (provided, state) => ({
        ...provided,
        backgroundColor: `${currentColors.bgColor} !important`,
        borderColor: `${currentColors.borderColor} !important`,
        color: `${currentColors.textColor} !important`,
        boxShadow: state.isFocused ? `0 0 0 0.25rem ${currentColors.boxShadowColor}` : 'none',
        '&:hover': {
            borderColor: `${currentColors.hoverBorderColor} !important`,
        }
      }),
      singleValue: (provided) => ({
        ...provided,
        color: `${currentColors.textColor} !important`,
      }),
      placeholder: (provided) => ({
        ...provided,
        color: `${currentColors.placeholderColor} !important`,
      }),
      input: (provided) => ({
        ...provided,
        color: `${currentColors.textColor} !important`,
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: `${currentColors.borderColor} !important`,
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        color: `${currentColors.indicatorColor} !important`,
        '&:hover': {
            color: `${currentColors.textColor} !important`,
        }
      }),
      clearIndicator: (provided) => ({
        ...provided,
        color: `${currentColors.indicatorColor} !important`,
        '&:hover': {
            color: `${currentColors.textColor} !important`,
        }
      }),
      menuList: (provided) => ({
          ...provided,
      }),
    };
  }, [colorMode]);


  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4>{id ? 'Editar Lotação' : 'Nova Lotação'}</h4>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="g-3">
            {/* Servidor de Apoio */}
            <CCol md={6}>
              <CFormLabel>Servidor de Apoio</CFormLabel>
              <Select
                options={servidorApoioOpts}
                value={selectedServidorApoio}
                onChange={handleSelectChange('servidorApoioId')}
                isClearable
                placeholder="Selecione o servidor..."
                styles={customStyles}
                classNamePrefix="react-select"
                invalid={servidorApoioError}
              />
              {servidorApoioError && (
                <div className="text-danger mt-1">
                  Selecione um servidor de apoio.
                </div>
              )}
            </CCol>

            {/* Aluno Atípico */}
            <CCol md={6}>
              <CFormLabel>Aluno Atípico</CFormLabel>
              <Select
                options={alunoAtipicoOpts}
                value={selectedAlunoAtipico}
                onChange={handleSelectChange('alunoAtipicoId')}
                isClearable
                placeholder="Selecione o aluno..."
                styles={customStyles}
                classNamePrefix="react-select"
                invalid={alunoAtipicoError}
              />
              {alunoAtipicoError && (
                <div className="text-danger mt-1">
                  Selecione um aluno atípico.
                </div>
              )}
            </CCol>

            {/* Data Início */}
            <CCol md={6}>
              <CFormLabel>Data Início</CFormLabel>
              <CFormInput
                type="date"
                name="dataInicio"
                value={form.dataInicio}
                onChange={handleChange('dataInicio')}
                onBlur={handleBlur('dataInicio')}
                required
                invalid={dataInicioError}
              />
              {dataInicioError && (
                <div className="text-danger mt-1">
                  Data de início inválida ou futura.
                </div>
              )}
            </CCol>

            {/* Data Fim (REMOVIDO DO JSX) */}
            {/* O campo dataFim foi removido do JSX.
                Sua validação e manipulação no frontend foram removidas.
                No backend, ele deve ser nullable ou ter um valor padrão. */}
            {/* <CCol md={6}>
              <CFormLabel>Data Fim</CFormLabel>
              <CFormInput
                type="date"
                name="dataFim"
                value={form.dataFim}
                onChange={handleChange('dataFim')}
                onBlur={handleBlur('dataFim')}
                required
                invalid={dataFimError}
              />
              {dataFimError && (
                <div className="text-danger mt-1">
                  Data de fim inválida, futura ou anterior à data de início.
                </div>
              )}
            </CCol> */}

            {/* Turma (campo invisível) */}
            {/* O campo turmaId é gerenciado internamente e não é visível para o usuário */}
            {/* Você pode adicionar um console.log(form.turmaId) para verificar se está sendo preenchido */}
            {/* <CCol md={6}>
              <CFormLabel>Turma (Invisível)</CFormLabel>
              <CFormInput
                value={form.turmaId || ''}
                disabled
                placeholder="Preenchido automaticamente"
              />
            </CCol> */}

          </CRow>

          <div className="mt-3">
            <CButton
              type="submit"
              color="success"
              disabled={saving || servidorApoioError || alunoAtipicoError || dataInicioError} // Removido dataFimError do disabled
              className="text-white me-2"
            >
              <CIcon icon={cilSave} className="me-1" />
              {saving ? 'Salvando…' : 'Salvar'}
            </CButton>
            <CButton color="secondary" className="text-white" onClick={() => navigate('/lotacao')}>
              <CIcon icon={cilX} className="me-1" />
              Cancelar
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default LotacaoAddEdit
