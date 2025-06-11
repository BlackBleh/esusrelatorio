import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CCard, CCardHeader, CCardBody,
  CForm, CFormLabel, CFormInput,
  CButton, CRow, CCol,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave, cilX } from '@coreui/icons'
import Select from 'react-select'
import api from 'src/service/api'

// opções de turno (mesma enum no back)
const TURNO_OPTIONS = [
  { value: 'MANHA', label: 'Manhã' },
  { value: 'TARDE', label: 'Tarde' },
  { value: 'NOITE', label: 'Noite' },
]

const initialForm = {
  escolaId: null,
  turno: '',
  serie: '',
  anoLetivo: '2025', // Mantido como 2025 para inicialização
  nomeProfessor: '',
}

const TurmaAddEdit = () => {
  const [form, setForm] = useState(initialForm)
  const [escolasOpts, setEscolasOpts] = useState([])
  const [selectedEscola, setSelectedEscola] = useState(null)
  const [selectedTurno, setSelectedTurno] = useState(null)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  // NOVOS ESTADOS PARA ERROS DE VALIDAÇÃO
  const [serieError, setSerieError] = useState(false);
  const [anoLetivoError, setAnoLetivoError] = useState(false);
  const [nomeProfessorError, setNomeProfessorError] = useState(false);

  // carregar opções de escola
  useEffect(() => {
    api.get('/escola').then(({ data }) => {
      const opts = data.map(e => ({ value: e.id, label: `${e.nome} (${e.cidade}-${e.uf})` }))
      setEscolasOpts(opts)
    })
  }, [])

  // carregar turma para edição
  useEffect(() => {
    if (id && escolasOpts.length) {
      api.get(`/turma/${id}`).then(({ data }) => {
        setForm({
          escolaId: data.escola.id,
          turno: data.turno,
          serie: data.serie,
          anoLetivo: data.anoLetivo,
          nomeProfessor: data.nomeProfessor,
        })
        setSelectedEscola(escolasOpts.find(o => o.value === data.escola.id) || null)
        setSelectedTurno(TURNO_OPTIONS.find(o => o.value === data.turno) || null)
      })
    }
  }, [id, escolasOpts])

  const handleSelectEscola = (opt) => {
    setSelectedEscola(opt)
    setForm(f => ({ ...f, escolaId: opt ? opt.value : null }))
  }

  const handleSelectTurno = (opt) => {
    setSelectedTurno(opt)
    setForm(f => ({ ...f, turno: opt ? opt.value : '' }))
  }

  // Função de validação para campos alfanuméricos (que devem conter letras ou números)
  const validateAlphanumericField = (value) => {
    return value.trim() !== '' && /[a-zA-Z0-9À-ÿ]/.test(value);
  };

  // NOVA Função de validação para o campo Série (deve conter pelo menos um número)
  const validateSerieField = (value) => {
    return value.trim() !== '' && /\d/.test(value); // Garante que não é vazio e contém pelo menos um dígito
  };

  // Função de validação para ano letivo (apenas números, não vazio, não futuro)
  const validateYearField = (value) => {
    const currentYear = new Date().getFullYear();
    const year = parseInt(value, 10);
    return value.trim() !== '' && /^\d+$/.test(value) && year <= currentYear;
  };

  const handleChange = (field) => (e) => {
    const { value } = e.target;
    setForm(f => ({ ...f, [field]: value }));

    // Lógica de validação
    switch (field) {
      case 'serie':
        setSerieError(!validateSerieField(value)); // USAR validateSerieField
        break;
      case 'anoLetivo':
        setAnoLetivoError(!validateYearField(value));
        break;
      case 'nomeProfessor':
        setNomeProfessorError(!validateAlphanumericField(value));
        break;
      default:
        break;
    }
  }

  const handleBlur = (field) => (e) => {
    const { value } = e.target;
    // Revalida no blur
    switch (field) {
      case 'serie':
        setSerieError(!validateSerieField(value)); // USAR validateSerieField
        break;
      case 'anoLetivo':
        setAnoLetivoError(!validateYearField(value));
        break;
      case 'nomeProfessor':
        setNomeProfessorError(!validateAlphanumericField(value));
        break;
      default:
        break;
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação final de todos os campos antes de salvar
    const isSerieValid = validateSerieField(form.serie); // USAR validateSerieField
    const isAnoLetivoValid = validateYearField(form.anoLetivo);
    const isNomeProfessorValid = validateAlphanumericField(form.nomeProfessor);

    setSerieError(!isSerieValid);
    setAnoLetivoError(!isAnoLetivoValid);
    setNomeProfessorError(!isNomeProfessorValid);

    // Também verificar se Escola e Turno foram selecionados
    const isEscolaSelected = form.escolaId !== null && form.escolaId !== '';
    const isTurnoSelected = form.turno !== null && form.turno !== '';

    if (!isSerieValid || !isAnoLetivoValid || !isNomeProfessorValid || !isEscolaSelected || !isTurnoSelected) {
      console.error('Erro de validação: Por favor, preencha todos os campos corretamente.');
      // Opcional: Adicionar feedback visual para Escola e Turno se não estiverem selecionados
      return; // Impede o envio do formulário
    }

    setSaving(true)
    try {
      if (id) await api.put(`/turma/${id}`, form)
      else await api.post('/turma', form)
      navigate('/turma')
    } finally {
      setSaving(false)
    }
  }

  // Estilos customizados para o React Select (se você tiver um tema claro/escuro global, pode remover isso)
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#2a3038', // Cor de fundo escura do menu
      borderColor: '#3f454d',    // Cor da borda
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#3f454d' : '#2a3038',
      color: 'white',
      '&:active': {
        backgroundColor: '#1f242a',
      },
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#2a3038',
      borderColor: '#3f454d',
      color: 'white',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aaaaaa',
    }),
    menuList: (provided) => ({
        ...provided,
    }),
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4>{id ? 'Editar Turma' : 'Nova Turma'}</h4>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="g-3">
            {/* Escola */}
            <CCol md={6}>
              <CFormLabel>Escola</CFormLabel>
              <Select
                options={escolasOpts}
                value={selectedEscola}
                onChange={handleSelectEscola}
                isClearable
                placeholder="Busque a escola..."
                styles={customStyles}
                classNamePrefix="react-select"
              />
            </CCol>

            {/* Turno */}
            <CCol md={6}>
              <CFormLabel>Turno</CFormLabel>
              <Select
                options={TURNO_OPTIONS}
                value={selectedTurno}
                onChange={handleSelectTurno}
                isClearable
                placeholder="Selecione o turno..."
                styles={customStyles}
                classNamePrefix="react-select"
              />
            </CCol>

            {/* Série */}
            <CCol md={4}>
              <CFormLabel>Série</CFormLabel>
              <CFormInput
                value={form.serie}
                onChange={handleChange('serie')}
                onBlur={handleBlur('serie')}
                required
                invalid={serieError}
              />
              {serieError && (
                <div className="text-danger mt-1">
                  A série deve conter pelo menos um número e não pode ser vazia, ter apenas caracteres especiais, espaços e letras.
                </div>
              )}
            </CCol>
            {/* Ano Letivo */}
            <CCol md={4}>
              <CFormLabel>Ano Letivo</CFormLabel>
              <CFormInput
                value={form.anoLetivo}
                onChange={handleChange('anoLetivo')}
                onBlur={handleBlur('anoLetivo')}
                required
                invalid={anoLetivoError}
              />
              {anoLetivoError && (
                <div className="text-danger mt-1">
                  O ano letivo deve ser um número, não pode ser vazio, apenas caracteres especiais e não pode ser um ano futuro.
                </div>
              )}
            </CCol>
            {/* Professor */}
            <CCol md={4}>
              <CFormLabel>Professor</CFormLabel>
              <CFormInput
                value={form.nomeProfessor}
                onChange={handleChange('nomeProfessor')}
                onBlur={handleBlur('nomeProfessor')}
                required
                invalid={nomeProfessorError}
              />
              {nomeProfessorError && (
                <div className="text-danger mt-1">
                  O nome do professor não pode ser vazio, apenas espaços, números ou caracteres especiais.
                </div>
              )}
            </CCol>
          </CRow>

          <div className="mt-3">
            <CButton
              type="submit"
              color="success"
              disabled={saving || serieError || anoLetivoError || nomeProfessorError}
              className="text-white me-2"
            >
              <CIcon icon={cilSave} className="me-1" />
              {saving ? 'Salvando…' : 'Salvar'}
            </CButton>
            <CButton color="secondary" className="text-white" onClick={() => navigate('/turma')}>
              <CIcon icon={cilX} className="me-1" />
              Cancelar
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default TurmaAddEdit
