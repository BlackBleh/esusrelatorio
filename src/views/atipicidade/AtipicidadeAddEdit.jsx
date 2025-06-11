import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CCard, CCardHeader, CCardBody,
  CForm, CFormLabel, CFormInput,
  CButton, CRow, CCol,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave, cilX } from '@coreui/icons'
import api from 'src/service/api'

const initial = {
  descricao: '',
  cid: '',
}

const AtipicidadeAddEdit = () => {
  const [form, setForm] = useState(initial)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  // NOVOS ESTADOS PARA ERROS DE VALIDAÇÃO
  const [descricaoError, setDescricaoError] = useState(false);
  const [cidError, setCidError] = useState(false);

  useEffect(() => {
    if (id) {
      api.get(`/atipicidade/${id}`).then(({ data }) => {
        setForm({
          descricao: data.descricao,
          cid: data.cid,
        })
      })
    }
  }, [id])

  // Função de validação para campos alfanuméricos (não vazio, pelo menos um alfanumérico)
  const validateAlphanumericField = (value) => {
    return value.trim() !== '' && /[a-zA-Z0-9À-ÿ]/.test(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))

    // Lógica de validação
    switch (name) {
      case 'descricao':
        setDescricaoError(!validateAlphanumericField(value));
        break;
      case 'cid':
        setCidError(!validateAlphanumericField(value));
        break;
      default:
        break;
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Revalida no blur
    switch (name) {
      case 'descricao':
        setDescricaoError(!validateAlphanumericField(value));
        break;
      case 'cid':
        setCidError(!validateAlphanumericField(value));
        break;
      default:
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação final de todos os campos antes de salvar
    const isDescricaoValid = validateAlphanumericField(form.descricao);
    const isCidValid = validateAlphanumericField(form.cid);

    setDescricaoError(!isDescricaoValid);
    setCidError(!isCidValid);

    if (!isDescricaoValid || !isCidValid) {
      console.error('Erro de validação: Por favor, preencha todos os campos corretamente.');
      return; // Impede o envio do formulário
    }

    setSaving(true)
    try {
      if (id) {
        await api.put(`/atipicidade/${id}`, form)
      } else {
        await api.post('/atipicidade', form)
      }
      navigate('/atipicidade')
    } finally {
      setSaving(false)
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4>{id ? 'Editar Atipicidade' : 'Nova Atipicidade'}</h4>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="g-3">
            <CCol md={6}>
              <CFormLabel>Descrição</CFormLabel>
              <CFormInput
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                invalid={descricaoError} // Adiciona classe de validação se houver erro
              />
              {descricaoError && (
                <div className="text-danger mt-1">
                  A descrição não pode ser vazia, apenas espaços ou caracteres especiais. Deve conter letras ou números.
                </div>
              )}
            </CCol>
            <CCol md={6}>
              <CFormLabel>CID</CFormLabel>
              <CFormInput
                name="cid"
                value={form.cid}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                invalid={cidError} // Adiciona classe de validação se houver erro
              />
              {cidError && (
                <div className="text-danger mt-1">
                  O CID não pode ser vazio, apenas espaços ou caracteres especiais. Deve conter letras ou números.
                </div>
              )}
            </CCol>
          </CRow>

          <div className="mt-3">
            <CButton type="submit" color="success" disabled={saving || descricaoError || cidError} className="text-white me-2">
              <CIcon icon={cilSave} className="me-1" />
              {saving ? 'Salvando…' : 'Salvar'}
            </CButton>
            <CButton color="secondary" className="text-white" onClick={() => navigate('/atipicidade')}>
              <CIcon icon={cilX} className="me-1" />
              Cancelar
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AtipicidadeAddEdit
