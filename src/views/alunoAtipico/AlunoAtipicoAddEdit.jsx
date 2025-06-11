// src/views/alunoAtipico/AlunoAtipicoAddEdit.jsx
console.log('--- AlunoAtipicoAddEdit.jsx: Início do arquivo ---'); // Log de depuração no topo

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CCard, CCardHeader, CCardBody,
  CForm, CFormLabel, CFormInput, CFormCheck,
  CButton, CRow, CCol,
  useColorModes, // Reintroduzido para o tema dinâmico dos Selects
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave, cilX } from '@coreui/icons'
import Select from 'react-select'
import api from 'src/service/api'

const NECESSIDADE_OPTIONS = [
  { value: 'NAO_NECESSITA', label: 'Não necessita' },
  { value: 'NECESSITA', label: 'Necessita' },
  { value: 'IMPRESCINDIVEL', label: 'Imprescindível' },
]

const UF_OPTIONS = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

const AlunoAtipicoAddEdit = () => {
  console.log('AlunoAtipicoAddEdit está sendo renderizado!'); // Log de depuração dentro do componente

  const [aluno, setAluno] = useState({
    nome: '', turmaId: null, dataNascimento: '',
    atipicidadeId: null, necessidadeDeServidorApoio: '',
    restricaoAlimentar: '', nomeDoResponsavel: '', celularResponsavel: '',
    logradouro: '', numero: '', bairro: '', cidade: '', uf: '', cep: '',
  })
  const [turmaOpts, setTurmaOpts] = useState([])
  const [atipicOpts, setAtipicOpts] = useState([])
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  // Reintroduzido: Obter o modo de cor atual do CoreUI
  const { colorMode } = useColorModes('coreui-free-react-admin-template-theme')

  // NOVOS ESTADOS PARA ERROS DE VALIDAÇÃO
  const [nomeError, setNomeError] = useState(false);
  const [dataNascimentoError, setDataNascimentoError] = useState(false);
  const [restricaoAlimentarError, setRestricaoAlimentarError] = useState(false);
  const [nomeDoResponsavelError, setNomeDoResponsavelError] = useState(false);
  const [celularResponsavelError, setCelularResponsavelError] = useState(false);
  const [logradouroError, setLogradouroError] = useState(false);
  const [numeroError, setNumeroError] = useState(false);
  const [bairroError, setBairroError] = useState(false);
  const [cidadeError, setCidadeError] = useState(false);
  const [cepError, setCepError] = useState(false);
  const [turmaIdError, setTurmaIdError] = useState(false);
  const [atipicidadeIdError, setAtipicidadeIdError] = useState(false);
  const [necessidadeDeServidorApoioError, setNecessidadeDeServidorApoioError] = useState(false);
  const [ufError, setUfError] = useState(false);

  // NOVO ESTADO: para armazenar o OBJETO selecionado da Necessidade de Apoio
  const [selectedNecessidade, setSelectedNecessidade] = useState(null);
  // NOVO ESTADO: para armazenar o OBJETO selecionado da Turma
  const [selectedTurma, setSelectedTurma] = useState(null);
  // NOVO ESTADO: para armazenar o OBJETO selecionado da Atipicidade
  const [selectedAtipicidade, setSelectedAtipicidade] = useState(null);
  // NOVO ESTADO: para armazenar o OBJETO selecionado da UF
  const [selectedUf, setSelectedUf] = useState(null);


  useEffect(() => {
    api.get('/turma').then(({ data: turmasData }) => {
      setTurmaOpts(turmasData.map(t => ({
        value: t.id,
        label: `${t.serie} ${t.anoLetivo} ${t.escola?.nome || 'Escola Desconhecida'}`
      })));
    }).catch(error => console.error("Erro ao carregar turmas:", error));

    api.get('/atipicidade').then(({ data }) => {
      setAtipicOpts(data.map(a => ({ value: a.id, label: a.descricao })))
    }).catch(error => console.error("Erro ao carregar atipicidades:", error));
  }, [])

  useEffect(() => {
    if (id) {
      api.get(`/aluno-atipico/${id}`).then(({ data }) => {
        setAluno({
          nome: data.nome,
          turmaId: data.turma.id,
          dataNascimento: data.dataNascimento,
          atipicidadeId: data.atipicidade.id,
          necessidadeDeServidorApoio: data.necessidadeDeServidorApoio, // MUDANÇA: 'code' pode não ser necessário aqui
          restricaoAlimentar: data.restricaoAlimentar,
          nomeDoResponsavel: data.nomeDoResponsavel,
          celularResponsavel: data.celularResponsavel,
          logradouro: data.logradouro,
          numero: data.numero,
          bairro: data.bairro,
          cidade: data.cidade,
          uf: data.uf,
          cep: data.cep,
        });

        // MUDANÇA AQUI: Define os objetos selecionados para os Selects na edição
        if (turmaOpts.length) { // Garante que as opções já foram carregadas
          setSelectedTurma(turmaOpts.find(o => o.value === data.turma.id) || null);
        }
        if (atipicOpts.length) { // Garante que as opções já foram carregadas
          setSelectedAtipicidade(atipicOpts.find(o => o.value === data.atipicidade.id) || null);
        }
        setSelectedNecessidade(NECESSIDADE_OPTIONS.find(o => o.value === data.necessidadeDeServidorApoio) || null);
        setSelectedUf(UF_OPTIONS.find(o => o.value === data.uf) || null);

      }).catch(error => console.error(`Erro ao carregar aluno atípico com ID ${id}:`, error));
    }
    else {
        setAluno(prevAluno => ({
            ...prevAluno, 
            cidade: "Salgueiro",
            uf: "PE", // Pré-selecionar PE para novos alunos
            cep: "56000-000",
        }));
        // Para novas criações, defina a UF "PE" no selectedUf também
        setSelectedUf(UF_OPTIONS.find(o => o.value === "PE") || null);
    }
  }, [id, turmaOpts, atipicOpts]) // Adicionado turmaOpts e atipicOpts às dependências

  // Função de validação para campos de texto (que devem conter letras ou números)
  const validateAlphanumericField = (value) => {
    return value.trim() !== '' && /[a-zA-Z0-9À-ÿ]/.test(value);
  };

  // Função de validação para campos de número (que devem conter apenas dígitos e não ser vazios)
  const validateNumberField = (value) => {
    return value.trim() !== '' && /^\d+$/.test(value);
  };

  // Função de validação para data (não futura e válida)
  const validateDateField = (value) => {
    if (!value) return false; // Não pode ser vazio
    const selectedDate = new Date(value);
    const currentDate = new Date();
    selectedDate.setHours(0, 0, 0, 0); // Zera horas para comparar apenas as datas
    currentDate.setHours(0, 0, 0, 0);
    return selectedDate <= currentDate; // Data selecionada deve ser menor ou igual à data atual
  };

  const handleChange = (field) => (e) => {
    const { value } = e.target;
    setAluno({ ...aluno, [field]: value });

    // Lógica de validação
    switch (field) {
      case 'nome':
        setNomeError(!validateAlphanumericField(value));
        break;
      case 'dataNascimento':
        setDataNascimentoError(!validateDateField(value));
        break;
      case 'restricaoAlimentar':
        setRestricaoAlimentarError(value.trim() !== '' && !validateAlphanumericField(value)); // Restricao alimentar é opcional, só valida se preenchida
        break;
      case 'nomeDoResponsavel':
        setNomeDoResponsavelError(!validateAlphanumericField(value));
        break;
      case 'celularResponsavel':
        setCelularResponsavelError(!validateNumberField(value));
        break;
      case 'logradouro':
        setLogradouroError(!validateAlphanumericField(value));
        break;
      case 'numero':
        setNumeroError(!validateNumberField(value));
        break;
      case 'bairro':
        setBairroError(!validateAlphanumericField(value));
        break;
      case 'cidade':
        setCidadeError(!validateAlphanumericField(value));
        break;
      case 'cep': // Validação de CEP agora usa validateAlphanumericField
        setCepError(!validateAlphanumericField(value));
        break;
      default:
        break;
    }
  }

  const handleSelectChange = (field) => (opt) => {
    const value = opt ? opt.value : null;
    setAluno(prevAluno => ({ ...prevAluno, [field]: value }));

    // MUDANÇA AQUI: Atualiza o estado de 'selected' para o React-Select
    switch (field) {
      case 'turmaId':
        setSelectedTurma(opt);
        setTurmaIdError(value === null);
        break;
      case 'atipicidadeId':
        setSelectedAtipicidade(opt);
        setAtipicidadeIdError(value === null);
        break;
      case 'necessidadeDeServidorApoio':
        setSelectedNecessidade(opt); // Atualiza o objeto selecionado
        setNecessidadeDeServidorApoioError(value === null || value === '');
        break;
      case 'uf':
        setSelectedUf(opt);
        setUfError(value === null || value === '');
        break;
      default:
        break;
    }
  }

  const handleBlur = (field) => (e) => {
    const { value } = e.target;
    // Revalida no blur
    switch (field) {
      case 'nome':
        setNomeError(!validateAlphanumericField(value));
        break;
      case 'dataNascimento':
        setDataNascimentoError(!validateDateField(value));
        break;
      case 'restricaoAlimentar':
        setRestricaoAlimentarError(value.trim() !== '' && !validateAlphanumericField(value));
        break;
      case 'nomeDoResponsavel':
        setNomeDoResponsavelError(!validateAlphanumericField(value));
        break;
      case 'celularResponsavel':
        setCelularResponsavelError(!validateNumberField(value));
        break;
      case 'logradouro':
        setLogradouroError(!validateAlphanumericField(value));
        break;
      case 'numero':
        setNumeroError(!validateNumberField(value));
        break;
      case 'bairro':
        setBairroError(!validateAlphanumericField(value));
        break;
      case 'cidade':
        setCidadeError(!validateAlphanumericField(value));
        break;
      case 'cep': // Revalidação de CEP agora usa validateAlphanumericField
        setCepError(!validateAlphanumericField(value));
        break;
      default:
        break;
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Validação final de todos os campos antes de salvar
    // Dispara as validações para que os estados de erro sejam atualizados antes do if
    const isNomeValid = validateAlphanumericField(aluno.nome);
    const isDataNascimentoValid = validateDateField(aluno.dataNascimento);
    const isRestricaoAlimentarValid = aluno.restricaoAlimentar.trim() === '' || validateAlphanumericField(aluno.restricaoAlimentar);
    const isNomeDoResponsavelValid = validateAlphanumericField(aluno.nomeDoResponsavel);
    const isCelularResponsavelValid = validateNumberField(aluno.celularResponsavel);
    const isLogradouroValid = validateAlphanumericField(aluno.logradouro);
    const isNumeroValid = validateNumberField(aluno.numero);
    const isBairroValid = validateAlphanumericField(aluno.bairro);
    const isCidadeValid = validateAlphanumericField(aluno.cidade);
    const isCepValid = validateAlphanumericField(aluno.cep);

    // Validação para Selects (verificar se o valor não é null ou string vazia para alguns casos)
    const isTurmaSelected = aluno.turmaId !== null;
    const isAtipicidadeSelected = aluno.atipicidadeId !== null;
    const isNecessidadeSelected = aluno.necessidadeDeServidorApoio !== null && aluno.necessidadeDeServidorApoio !== '';
    const isUfSelected = aluno.uf !== null && aluno.uf !== '';


    // --- LOGS DE DEPURACAO ---
    console.log('--- Validação Final ---');
    console.log('Nome Válido:', isNomeValid);
    console.log('Data Nascimento Válida:', isDataNascimentoValid);
    console.log('Restrição Alimentar Válida:', isRestricaoAlimentarValid);
    console.log('Nome Responsável Válido:', isNomeDoResponsavelValid);
    console.log('Celular Responsável Válido:', isCelularResponsavelValid);
    console.log('Logradouro Válido:', isLogradouroValid);
    console.log('Número Válido:', isNumeroValid);
    console.log('Bairro Válido:', isBairroValid);
    console.log('Cidade Válida:', isCidadeValid);
    console.log('CEP Válido:', isCepValid);
    console.log('Turma Selecionada:', isTurmaSelected);
    console.log('Atipicidade Selecionada:', isAtipicidadeSelected);
    console.log('Necessidade Selecionada:', isNecessidadeSelected);
    console.log('UF Selecionada:', isUfSelected);
    console.log('-----------------------');


    // ATUALIZA OS ESTADOS DE ERRO PARA EXIBICAO VISUAL
    setNomeError(!isNomeValid);
    setDataNascimentoError(!isDataNascimentoValid);
    setRestricaoAlimentarError(!isRestricaoAlimentarValid);
    setNomeDoResponsavelError(!isNomeDoResponsavelValid);
    setCelularResponsavelError(!isCelularResponsavelValid);
    setLogradouroError(!isLogradouroValid);
    setNumeroError(!isNumeroValid);
    setBairroError(!isBairroValid);
    setCidadeError(!isCidadeValid);
    setCepError(!isCepValid);
    setTurmaIdError(!isTurmaSelected);
    setAtipicidadeIdError(!isAtipicidadeSelected);
    setNecessidadeDeServidorApoioError(!isNecessidadeSelected);
    setUfError(!isUfSelected);


    // VERIFICA SE ALGUM ERRO ESTÁ ATIVO (USANDO OS ESTADOS DE ERRO)
    if (!isNomeValid || !isDataNascimentoValid || !isRestricaoAlimentarValid || !isNomeDoResponsavelValid || !isCelularResponsavelValid || 
        !isLogradouroValid || !isNumeroValid || !isBairroValid || !isCidadeValid || !isCepValid ||
        !isTurmaSelected || !isAtipicidadeSelected || !isNecessidadeSelected || !isUfSelected) {
      console.error('Erro de validação: Um ou mais campos estão preenchidos incorretamente ou vazios.');
      return; // Impede o envio do formulário
    }

    setSaving(true)
    try {
      if (id) await api.put(`/aluno-atipico/${id}`, aluno)
      else await api.post('/aluno-atipico', aluno)
      navigate('/alunoAtipico')
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
      <CCardHeader><h4>{id ? 'Editar Aluno Atípico' : 'Novo Aluno Atípico'}</h4></CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="g-3">
            <CCol md={6}>
              <CFormLabel>Nome</CFormLabel>
              <CFormInput 
                name="nome" 
                value={aluno.nome} 
                onChange={handleChange('nome')} 
                onBlur={handleBlur('nome')}
                required 
                invalid={nomeError}
              />
              {nomeError && (
                <div className="text-danger mt-1">
                  O nome não pode ser vazio, apenas espaços, números ou caracteres especiais. Deve conter letras ou números.
                </div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormLabel>Data Nascimento</CFormLabel>
              <CFormInput 
                type="date" 
                value={aluno.dataNascimento} 
                onChange={handleChange('dataNascimento')} 
                onBlur={handleBlur('dataNascimento')} // Adicionado onBlur para revalidar
                required 
                invalid={dataNascimentoError} // Adicionado para validação visual
              />
              {dataNascimentoError && (
                <div className="text-danger mt-1">
                  A data de nascimento não pode ser futura e não pode ser vazia.
                </div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormLabel>Turma</CFormLabel>
              <Select
                options={turmaOpts}
                value={turmaOpts.find(o => o.value === aluno.turmaId)}
                onChange={handleSelectChange('turmaId')}
                placeholder="Selecione a turma..."
                isClearable
                styles={customStyles}
                classNamePrefix="react-select"
                invalid={turmaIdError} // Adicionado para validação visual
              />
              {turmaIdError && (
                <div className="text-danger mt-1">
                  Selecione uma turma.
                </div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormLabel>Atipicidade</CFormLabel>
              <Select
                options={atipicOpts}
                value={atipicOpts.find(o => o.value === aluno.atipicidadeId)}
                onChange={handleSelectChange('atipicidadeId')}
                placeholder="Selecione..."
                isClearable
                styles={customStyles}
                classNamePrefix="react-select"
                invalid={atipicidadeIdError} // Adicionado para validação visual
              />
              {atipicidadeIdError && (
                <div className="text-danger mt-1">
                  Selecione uma atipicidade.
                </div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormLabel>Necessidade de Apoio</CFormLabel>
              <Select
                options={NECESSIDADE_OPTIONS}
                value={NECESSIDADE_OPTIONS.find(o => o.value === aluno.necessidadeDeServidorApoio)}
                onChange={handleSelectChange('necessidadeDeServidorApoio')}
                placeholder="Selecione..."
                isClearable
                styles={customStyles}
                classNamePrefix="react-select"
                invalid={necessidadeDeServidorApoioError} // Adicionado para validação visual
              />
              {necessidadeDeServidorApoioError && (
                <div className="text-danger mt-1">
                  Selecione a necessidade de apoio.
                </div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormLabel>Restrição Alimentar</CFormLabel>
              <CFormInput 
                value={aluno.restricaoAlimentar} 
                onChange={handleChange('restricaoAlimentar')} 
                onBlur={handleBlur('restricaoAlimentar')}
                invalid={restricaoAlimentarError}
              />
              {restricaoAlimentarError && (
                <div className="text-danger mt-1">
                  A restrição alimentar não pode ser vazia, apenas espaços, números ou caracteres especiais. Deve conter letras ou números.
                </div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormLabel>Nome Responsável</CFormLabel>
              <CFormInput 
                name="nomeDoResponsavel" 
                value={aluno.nomeDoResponsavel} 
                onChange={handleChange('nomeDoResponsavel')} 
                onBlur={handleBlur('nomeDoResponsavel')}
                required 
                invalid={nomeDoResponsavelError}
              />
              {nomeDoResponsavelError && (
                <div className="text-danger mt-1">
                  O nome do responsável não pode ser vazio, apenas espaços, números ou caracteres especiais. Deve conter letras ou números.
                </div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormLabel>Celular Responsável</CFormLabel>
              <CFormInput 
                name="celularResponsavel" 
                value={aluno.celularResponsavel} 
                onChange={handleChange('celularResponsavel')} 
                onBlur={handleBlur('celularResponsavel')}
                required 
                invalid={celularResponsavelError}
              />
              {celularResponsavelError && (
                <div className="text-danger mt-1">
                  O celular do responsável deve conter apenas dígitos e não pode ser vazio.
                </div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormLabel>Logradouro</CFormLabel>
              <CFormInput 
                name="logradouro" 
                value={aluno.logradouro} 
                onChange={handleChange('logradouro')} 
                onBlur={handleBlur('logradouro')}
                required 
                invalid={logradouroError}
              />
              {logradouroError && (
                <div className="text-danger mt-1">
                  O logradouro não pode ser vazio, apenas espaços, números ou caracteres especiais. Deve conter letras ou números.
                </div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormLabel>Número</CFormLabel>
              <CFormInput 
                name="numero" 
                value={aluno.numero} 
                onChange={handleChange('numero')} 
                onBlur={handleBlur('numero')}
                required 
                invalid={numeroError}
              />
              {numeroError && (
                <div className="text-danger mt-1">
                  O número deve conter apenas dígitos e não pode ser vazio.
                </div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormLabel>Bairro</CFormLabel>
              <CFormInput 
                name="bairro" 
                value={aluno.bairro} 
                onChange={handleChange('bairro')} 
                onBlur={handleBlur('bairro')}
                required 
                invalid={bairroError}
              />
              {bairroError && (
                <div className="text-danger mt-1">
                  O bairro não pode ser vazio, apenas espaços, números ou caracteres especiais. Deve conter letras ou números.
                </div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormLabel>Cidade</CFormLabel>
              <CFormInput 
                name="cidade" 
                value={aluno.cidade} 
                onChange={handleChange('cidade')} 
                onBlur={handleBlur('cidade')}
                required 
                invalid={cidadeError}
              />
              {cidadeError && (
                <div className="text-danger mt-1">
                  A cidade não pode ser vazia, apenas espaços, números ou caracteres especiais. Deve conter letras ou números.
                </div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormLabel>UF</CFormLabel>
              <Select
                options={UF_OPTIONS}
                value={UF_OPTIONS.find(o => o.value === aluno.uf)}
                onChange={handleSelectChange('uf')}
                placeholder="Selecione a UF..."
                isClearable
                styles={customStyles}
                classNamePrefix="react-select"
                invalid={ufError} // Adicionado para validação visual
              />
              {ufError && (
                <div className="text-danger mt-1">
                  Selecione uma UF.
                </div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormLabel>CEP</CFormLabel>
              <CFormInput
                value={aluno.cep}
                onChange={handleChange('cep')}
                onBlur={handleBlur('cep')}
                required
                invalid={cepError}
              />
              {cepError && (
                <div className="text-danger mt-1">
                  O CEP deve conter letras e números e não pode ser vazio ou apenas caracteres especiais.
                </div>
              )}
            </CCol>
          </CRow>
          
          <div className="mt-3">
            <CButton 
              type="submit" 
              color="success" 
              disabled={saving || nomeError || restricaoAlimentarError || nomeDoResponsavelError || celularResponsavelError || 
                        logradouroError || numeroError || bairroError || cidadeError || cepError ||
                        turmaIdError || atipicidadeIdError || necessidadeDeServidorApoioError || ufError || dataNascimentoError} 
              className="text-white me-2"
            >
              <CIcon icon={cilSave} className="me-1" /> {saving ? 'Salvando…' : 'Salvar'}
            </CButton>
            <CButton color="secondary" className="text-white" onClick={() => navigate('/alunoAtipico')}>
              <CIcon icon={cilX} className="me-1" /> Cancelar
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AlunoAtipicoAddEdit