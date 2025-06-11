import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CCard, CCardHeader, CCardBody,
  CForm, CFormLabel, CFormInput, CFormCheck, // CFormCheck para booleanos
  CButton, CRow, CCol,
  useColorModes, // Para tema dinâmico dos Selects
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave, cilX } from '@coreui/icons'
import Select from 'react-select'
import api from 'src/service/api'

// Opções para o campo Sexo (baseado no enum Sexo do Java)
const SEXO_OPTIONS = [
  { value: 'MASCULINO', label: 'Masculino' },
  { value: 'FEMININO', label: 'Feminino' },
  { value: 'OUTRO', label: 'Outro' },
];

// Opções para UF (já existente)
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

// Valores iniciais para o formulário de ServidorApoio
const initialServidorApoioForm = {
  nome: '',
  sexo: null, // Será selecionado via Select
  dataNascimento: '',
  logradouro: '',
  numero: '',
  bairro: '',
  cidade: '',
  uf: 'PE', // MUDANÇA AQUI: Pré-selecionado para Pernambuco
  cep: '',
  celular: '',
  email: '',
  cpf: '',
  pessoaComDeficiencia: false, // Checkbox
  cid: '', // Opcional, mas pode ter validação
  graduacao: '',
}

const ServidorApoioAddEdit = () => {
  const [form, setForm] = useState(initialServidorApoioForm)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  // Obter o modo de cor atual do CoreUI para estilos do Select
  const { colorMode } = useColorModes('coreui-free-react-admin-template-theme')

  // ESTADOS PARA ERROS DE VALIDAÇÃO
  const [nomeError, setNomeError] = useState(false);
  const [sexoError, setSexoError] = useState(false);
  const [dataNascimentoError, setDataNascimentoError] = useState(false);
  const [logradouroError, setLogradouroError] = useState(false);
  const [numeroError, setNumeroError] = useState(false);
  const [bairroError, setBairroError] = useState(false);
  const [cidadeError, setCidadeError] = useState(false);
  const [ufError, setUfError] = useState(false);
  const [cepError, setCepError] = useState(false);
  const [celularError, setCelularError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [cpfError, setCpfError] = useState(false);
  const [cidError, setCidError] = useState(false); // CID é opcional, mas pode ter validação de formato
  const [graduacaoError, setGraduacaoError] = useState(false);

  // Estados para valores selecionados em Selects (para carregar edição)
  const [selectedSexo, setSelectedSexo] = useState(null);
  const [selectedUf, setSelectedUf] = useState(null);

  // Carregar dados para edição (se houver ID)
  useEffect(() => {
    if (id) {
      // ATENÇÃO: Ajustado o endpoint da API para 'servidor-apoio' (minúsculas e hífens)
      api.get(`/servidor-apoio/${id}`).then(({ data }) => {
        setForm({
          nome: data.nome,
          sexo: data.sexo,
          dataNascimento: data.dataNascimento,
          logradouro: data.logradouro,
          numero: data.numero,
          bairro: data.bairro,
          cidade: data.cidade,
          uf: data.uf,
          cep: data.cep,
          celular: data.celular,
          email: data.email,
          cpf: data.cpf,
          pessoaComDeficiencia: data.pessoaComDeficiencia,
          cid: data.cid || '', // CID pode ser nulo
          graduacao: data.graduacao,
        });
        // Definir valores selecionados para Selects
        setSelectedSexo(SEXO_OPTIONS.find(o => o.value === data.sexo) || null);
        setSelectedUf(UF_OPTIONS.find(o => o.value === data.uf) || null);
      }).catch(error => console.error(`Erro ao carregar servidor de apoio com ID ${id}:`, error));
    } else {
      // MUDANÇA AQUI: Definir UF e selectedUf para 'PE' ao criar novo
      setForm(prevForm => ({
        ...prevForm,
        uf: 'PE',
        cidade: 'Salgueiro', // Manter Salgueiro como padrão
        cep: '56000-000',     // Manter CEP como padrão
      }));
      setSelectedUf(UF_OPTIONS.find(o => o.value === 'PE') || null);
    }
  }, [id]);

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

  // Função de validação para email
  const validateEmailField = (value) => {
    return value.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  // Função de validação para CEP (corrigido o regex para corresponder ao backend)
  const validateCepField = (value) => {
    return value.trim() !== '' && /^\d{5}-?\d{3}$/.test(value);
  };

  // NOVA Função de validação para Celular (corrigido o regex para corresponder ao backend)
  const validateCelularField = (value) => {
    return value.trim() !== '' && /^\d{10,11}$/.test(value);
  };

  // Função de validação para CPF (corrigido o regex para corresponder ao backend)
  const validateCpfField = (value) => {
    return value.trim() !== '' && /^\d{11}$/.test(value);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }

    // Lógica de validação
    switch (name) {
      case 'nome':
        setNomeError(!validateAlphanumericField(value));
        break;
      case 'dataNascimento':
        setDataNascimentoError(!validateDateField(value));
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
      case 'cep':
        setCepError(!validateCepField(value));
        break;
      case 'celular': // Usar a nova função de validação de celular
        setCelularError(!validateCelularField(value));
        break;
      case 'email':
        setEmailError(!validateEmailField(value));
        break;
      case 'cpf': // Usar a nova função de validação de CPF
        setCpfError(!validateCpfField(value));
        break;
      case 'cid': // CID é opcional, só valida se não for vazio
        setCidError(value.trim() !== '' && !validateAlphanumericField(value));
        break;
      case 'graduacao':
        setGraduacaoError(!validateAlphanumericField(value));
        break;
      default:
        break;
    }
  }

  const handleSelectChange = (field) => (opt) => {
    const value = opt ? opt.value : null;
    setForm(f => ({ ...f, [field]: value }));

    // Lógica de validação para Selects
    switch (field) {
      case 'sexo':
        setSelectedSexo(opt);
        setSexoError(value === null);
        break;
      case 'uf':
        setSelectedUf(opt);
        setUfError(value === null);
        break;
      default:
        break;
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Revalida no blur
    switch (name) {
      case 'nome':
        setNomeError(!validateAlphanumericField(value));
        break;
      case 'dataNascimento':
        setDataNascimentoError(!validateDateField(value));
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
      case 'cep':
        setCepError(!validateCepField(value));
        break;
      case 'celular':
        setCelularError(!validateCelularField(value));
        break;
      case 'email':
        setEmailError(!validateEmailField(value));
        break;
      case 'cpf':
        setCpfError(!validateCpfField(value));
        break;
      case 'cid':
        setCidError(value.trim() !== '' && !validateAlphanumericField(value));
        break;
      case 'graduacao':
        setGraduacaoError(!validateAlphanumericField(value));
        break;
      default:
        break;
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Validação final de todos os campos antes de salvar
    // Dispara as validações para que os estados de erro sejam atualizados antes do if
    const isNomeValid = validateAlphanumericField(form.nome);
    const isSexoValid = form.sexo !== null;
    const isDataNascimentoValid = validateDateField(form.dataNascimento);
    const isLogradouroValid = validateAlphanumericField(form.logradouro);
    const isNumeroValid = validateNumberField(form.numero);
    const isBairroValid = validateAlphanumericField(form.bairro);
    const isCidadeValid = validateAlphanumericField(form.cidade);
    const isUfValid = form.uf !== null;
    const isCepValid = validateCepField(form.cep);
    const isCelularValid = validateCelularField(form.celular); // Usar a nova função
    const isEmailValid = validateEmailField(form.email);
    const isCpfValid = validateCpfField(form.cpf); // Usar a nova função
    const isGraduacaoValid = validateAlphanumericField(form.graduacao);
    const isCidValid = form.cid.trim() === '' || validateAlphanumericField(form.cid); // CID é opcional

    // --- LOGS DE DEPURACAO ---
    console.log('--- Validação Final no Submit ---');
    console.log('isNomeValid:', isNomeValid);
    console.log('isSexoValid:', isSexoValid);
    console.log('isDataNascimentoValid:', isDataNascimentoValid);
    console.log('isLogradouroValid:', isLogradouroValid);
    console.log('isNumeroValid:', isNumeroValid);
    console.log('isBairroValid:', isBairroValid);
    console.log('isCidadeValid:', isCidadeValid);
    console.log('isUfValid:', isUfValid);
    console.log('isCepValid:', isCepValid);
    console.log('isCelularValid:', isCelularValid);
    console.log('isEmailValid:', isEmailValid);
    console.log('isCpfValid:', isCpfValid);
    console.log('isGraduacaoValid:', isGraduacaoValid);
    console.log('isCidValid:', isCidValid);
    console.log('form.pessoaComDeficiencia:', form.pessoaComDeficiencia);
    console.log('---------------------------------');

    // ATUALIZA OS ESTADOS DE ERRO PARA EXIBICAO VISUAL
    setNomeError(!isNomeValid);
    setSexoError(!isSexoValid);
    setDataNascimentoError(!isDataNascimentoValid);
    setLogradouroError(!isLogradouroValid);
    setNumeroError(!isNumeroValid);
    setBairroError(!isBairroValid);
    setCidadeError(!isCidadeValid);
    setUfError(!isUfValid);
    setCepError(!isCepValid);
    setCelularError(!isCelularValid);
    setEmailError(!isEmailValid);
    setCpfError(!isCpfValid);
    setCidError(!isCidValid); // Aqui, se CID é opcional, o erro só deve ser true se PCD e inválido
    setGraduacaoError(!isGraduacaoValid);

    // Ajuste na validação de CID para o if principal
    const finalCidValid = !form.pessoaComDeficiencia || (form.pessoaComDeficiencia && isCidValid);

    if (!isNomeValid || !isSexoValid || !isDataNascimentoValid || !isLogradouroValid || !isNumeroValid ||
        !isBairroValid || !isCidadeValid || !isUfValid || !isCepValid || !isCelularValid ||
        !isEmailValid || !isCpfValid || !isGraduacaoValid || !finalCidValid) { // Usar finalCidValid
      console.error('Erro de validação: Por favor, preencha todos os campos corretamente.');
      return;
    }

    setSaving(true)
    try {
      const dataToSend = {
        id: id || null,
        nome: form.nome,
        sexo: form.sexo,
        dataNascimento: form.dataNascimento,
        logradouro: form.logradouro,
        numero: form.numero,
        bairro: form.bairro,
        cidade: form.cidade,
        uf: form.uf,
        cep: form.cep,
        celular: form.celular,
        email: form.email,
        cpf: form.cpf,
        pessoaComDeficiencia: form.pessoaComDeficiencia,
        cid: form.cid.trim() === '' ? null : form.cid, // Envia null se CID estiver vazio
        graduacao: form.graduacao,
      };

      if (id) await api.put(`/servidor-apoio/${id}`, dataToSend)
      else await api.post('/servidor-apoio', dataToSend)
      
      navigate('/servidorApoio')
    } finally {
      setSaving(false)
    }
  }

  // Estilos customizados para o React Select, agora dinâmicos com base no colorMode
  const customStyles = useMemo(() => {
    const isDark = colorMode === 'dark';
    const bgColor = isDark ? '#2a3038' : '#ffffff';
    const borderColor = isDark ? '#3f454d' : '#dee2e6';
    const textColor = isDark ? 'white' : '#212529';
    const placeholderColor = isDark ? '#aaaaaa' : '#6c757d';
    const focusedBgColor = isDark ? '#3f454d' : '#e9ecef';
    const activeBgColor = isDark ? '#1f242a' : '#e2e6ea';

    const currentColors = {
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
        <h4>{id ? 'Editar Servidor de Apoio' : 'Novo Servidor de Apoio'}</h4>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="g-3">
            {/* Nome */}
            <CCol md={6}>
              <CFormLabel>Nome</CFormLabel>
              <CFormInput
                name="nome"
                value={form.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                invalid={nomeError}
              />
              {nomeError && (
                <div className="text-danger mt-1">
                  O nome não pode ser vazio, apenas espaços ou caracteres especiais. Deve conter letras ou números.
                </div>
              )}
            </CCol>

            {/* Sexo */}
            <CCol md={6}>
              <CFormLabel>Sexo</CFormLabel>
              <Select
                options={SEXO_OPTIONS}
                value={selectedSexo}
                onChange={handleSelectChange('sexo')}
                isClearable
                placeholder="Selecione o sexo..."
                styles={customStyles}
                classNamePrefix="react-select"
                invalid={sexoError}
              />
              {sexoError && (
                <div className="text-danger mt-1">
                  Selecione o sexo.
                </div>
              )}
            </CCol>

            {/* Data Nascimento */}
            <CCol md={6}>
              <CFormLabel>Data Nascimento</CFormLabel>
              <CFormInput
                type="date"
                name="dataNascimento"
                value={form.dataNascimento}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                invalid={dataNascimentoError}
              />
              {dataNascimentoError && (
                <div className="text-danger mt-1">
                  A data de nascimento não pode ser futura e não pode ser vazia.
                </div>
              )}
            </CCol>

            {/* Logradouro */}
            <CCol md={6}>
              <CFormLabel>Logradouro</CFormLabel>
              <CFormInput
                name="logradouro"
                value={form.logradouro}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                invalid={logradouroError}
              />
              {logradouroError && (
                <div className="text-danger mt-1">
                  O logradouro não pode ser vazio, apenas espaços ou caracteres especiais. Deve conter letras ou números.
                </div>
              )}
            </CCol>

            {/* Número */}
            <CCol md={6}>
              <CFormLabel>Número</CFormLabel>
              <CFormInput
                name="numero"
                value={form.numero}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                invalid={numeroError}
              />
              {numeroError && (
                <div className="text-danger mt-1">
                  O número deve conter apenas dígitos e não pode ser vazio.
                </div>
              )}
            </CCol>

            {/* Bairro */}
            <CCol md={6}>
              <CFormLabel>Bairro</CFormLabel>
              <CFormInput
                name="bairro"
                value={form.bairro}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                invalid={bairroError}
              />
              {bairroError && (
                <div className="text-danger mt-1">
                  O bairro não pode ser vazio, apenas espaços ou caracteres especiais. Deve conter letras ou números.
                </div>
              )}
            </CCol>

            {/* Cidade */}
            <CCol md={6}>
              <CFormLabel>Cidade</CFormLabel>
              <CFormInput
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                invalid={cidadeError}
              />
              {cidadeError && (
                <div className="text-danger mt-1">
                  A cidade não pode ser vazia, apenas espaços ou caracteres especiais. Deve conter letras ou números.
                </div>
              )}
            </CCol>

            {/* UF */}
            <CCol md={6}>
              <CFormLabel>UF</CFormLabel>
              <Select
                options={UF_OPTIONS}
                value={selectedUf}
                onChange={handleSelectChange('uf')}
                isClearable
                placeholder="Selecione a UF..."
                styles={customStyles}
                classNamePrefix="react-select"
                invalid={ufError}
              />
              {ufError && (
                <div className="text-danger mt-1">
                  Selecione uma UF.
                </div>
              )}
            </CCol>

            {/* CEP */}
            <CCol md={6}>
              <CFormLabel>CEP</CFormLabel>
              <CFormInput
                name="cep"
                value={form.cep}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                invalid={cepError}
              />
              {cepError && (
                <div className="text-danger mt-1">
                  O CEP deve ter 8 dígitos (ex: 12345-678 ou 12345678).
                </div>
              )}
            </CCol>

            {/* Celular */}
            <CCol md={6}>
              <CFormLabel>Celular</CFormLabel>
              <CFormInput
                name="celular"
                value={form.celular}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                invalid={celularError}
              />
              {celularError && (
                <div className="text-danger mt-1">
                  O celular deve conter 10 ou 11 dígitos (apenas números).
                </div>
              )}
            </CCol>

            {/* Email */}
            <CCol md={6}>
              <CFormLabel>Email</CFormLabel>
              <CFormInput
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                invalid={emailError}
              />
              {emailError && (
                <div className="text-danger mt-1">
                  O email deve ser válido (ex: exemplo@dominio.com).
                </div>
              )}
            </CCol>

            {/* CPF */}
            <CCol md={6}>
              <CFormLabel>CPF</CFormLabel>
              <CFormInput
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                invalid={cpfError}
              />
              {cpfError && (
                <div className="text-danger mt-1">
                  O CPF deve conter 11 dígitos (apenas números).
                </div>
              )}
            </CCol>

            {/* Graduação */}
            <CCol md={6}>
              <CFormLabel>Graduação</CFormLabel>
              <CFormInput
                name="graduacao"
                value={form.graduacao}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                invalid={graduacaoError}
              />
              {graduacaoError && (
                <div className="text-danger mt-1">
                  A graduação não pode ser vazia, apenas espaços ou caracteres especiais. Deve conter letras ou números.
                </div>
              )}
            </CCol>

            {/* Pessoa Com Deficiência (Checkbox) */}
            <CCol md={6}>
              <CFormCheck
                type="checkbox"
                id="pessoaComDeficiencia"
                name="pessoaComDeficiencia"
                label="Pessoa Com Deficiência"
                checked={form.pessoaComDeficiencia}
                onChange={handleChange}
              />
            </CCol>

            {/* CID (Opcional, só valida se preenchido) */}
            {form.pessoaComDeficiencia && ( // Mostra CID apenas se PCD for marcado
              <CCol md={6}>
                <CFormLabel>CID</CFormLabel>
                <CFormInput
                  name="cid"
                  value={form.cid}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={cidError}
                />
                {cidError && (
                  <div className="text-danger mt-1">
                    O CID deve conter letras ou números e não pode ser apenas espaços ou caracteres especiais.
                  </div>
                )}
              </CCol>
            )}

          </CRow>

          <div className="mt-3">
            <CButton
              type="submit"
              color="success"
              disabled={
                saving || nomeError || sexoError || dataNascimentoError || logradouroError ||
                numeroError || bairroError || cidadeError || ufError || cepError ||
                celularError || emailError || cpfError || graduacaoError ||
                (form.pessoaComDeficiencia && cidError) // CID é obrigatório se PCD
              }
              className="text-white me-2"
            >
              <CIcon icon={cilSave} className="me-1" />
              {saving ? 'Salvando…' : 'Salvar'}
            </CButton>
            <CButton color="secondary" className="text-white" onClick={() => navigate('/servidorApoio')}>
              <CIcon icon={cilX} className="me-1" />
              Cancelar
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default ServidorApoioAddEdit
