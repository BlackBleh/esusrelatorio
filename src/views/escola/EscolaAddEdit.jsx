import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CCard, CCardHeader, CCardBody,
  CForm, CFormLabel, CFormInput, CFormCheck,
  CButton, CRow, CCol,
  // useColorModes, // REMOVIDO: Não precisamos mais importar useColorModes aqui
} from '@coreui/react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import api from 'src/service/api'
import debounce from 'lodash.debounce'
import CIcon from '@coreui/icons-react'
import { cilSave, cilX } from '@coreui/icons'
import Select from 'react-select'

// estilo do container do mapa
const mapContainerStyle = {
  width: '100%',
  height: '400px',
}

// UFs do Brasil (já está no formato ideal para react-select)
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

// valores iniciais, já com Salgueiro/PE
const initial = {
  nome: '',
  logradouro: '',
  numero: '',
  bairro: '',
  cidade: 'Salgueiro',
  uf: 'PE', // Pré-selecionado para Pernambuco
  cep: '56000-000',
  latitude: '',
  longitude: '',
}

const EscolaAddEdit = () => {
  const [escola, setEscola] = useState(initial)
  const [mapCenter, setMapCenter] = useState({ lat: -8.0723296, lng: -39.126417 })
  const [markerPos, setMarkerPos] = useState(mapCenter)
  const [rural, setRural] = useState(false)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  // ESTADOS PARA ERROS DE VALIDAÇÃO
  const [nameError, setNameError] = useState(false);
  const [logradouroError, setLogradouroError] = useState(false);
  const [numeroError, setNumeroError] = useState(false);
  const [bairroError, setBairroError] = useState(false);
  const [cidadeError, setCidadeError] = useState(false);
  const [cepError, setCepError] = useState(false);

  // MUDANÇA AQUI: Função de geocoding e debounce movidas para antes do useEffect que as utiliza
  const locateOnMap = useCallback(
    (src = escola) => {
      let addressString
      if (rural) {
        addressString = `${src.nome}, ${src.cidade}`
      } else {
        const parts = [
          src.logradouro,
          src.numero,
          src.bairro,
          src.cidade, // Cidade sempre incluída na string
          src.uf,
          src.cep,    // CEP sempre incluído na string
        ].filter(Boolean)
        addressString = parts.join(', ')
      }
      // Verifica se a API do Google Maps está carregada
      if (window.google && window.google.maps && window.google.maps.Geocoder) {
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({ address: addressString }, (results, status) => {
          if (status === 'OK' && results[0]) {
            const loc = results[0].geometry.location
            const lat = loc.lat()
            const lng = loc.lng()
            setMapCenter({ lat, lng })
            setMarkerPos({ lat, lng })
            setEscola(s => ({
              ...s,
              latitude: lat.toString(),
              longitude: lng.toString(),
            }))
          } else {
            console.warn(`Geocoder failed with status: ${status} for address: ${addressString}`);
            setEscola(s => ({ ...s, latitude: '', longitude: '' }));
          }
        })
      } else {
        console.warn("Google Maps Geocoder not loaded yet.");
      }
    },
    [rural, escola.logradouro, escola.numero, escola.bairro, escola.cidade, escola.uf, escola.cep, escola.nome]
  )

  // debounce para evitar flood de requests (depende de locateOnMap)
  const debouncedLocate = useMemo(() => debounce(locateOnMap, 800), [locateOnMap])

  // carrega do back para edição ou inicializa para nova escola
  useEffect(() => {
    if (id) {
      api.get(`/escola/${id}`).then(({ data }) => {
        setEscola(data)
        const lat = parseFloat(data.latitude) || mapCenter.lat
        const lng = parseFloat(data.longitude) || mapCenter.lng
        setMapCenter({ lat, lng })
        setMarkerPos({ lat, lng })
        setRural(data.rural || false);
      })
    } else {
      // Define a UF para 'PE' e tenta localizar para nova escola
      setEscola(prevEscola => ({ ...prevEscola, uf: 'PE' }));
      // Chamar locateOnMap com os valores iniciais para pré-carregar o mapa e coordenadas
      locateOnMap({ ...initial, uf: 'PE' });
    }
  }, [id, locateOnMap]) // Adicionado locateOnMap às dependências

  // Função de validação para campos de texto (que devem conter letras)
  const validateTextField = (value) => {
    return value.trim() !== '' && /[a-zA-ZÀ-ÿ]/.test(value);
  };

  // Função de validação para campos de número (que devem conter apenas dígitos e não ser vazios)
  const validateNumberField = (value) => {
    return value.trim() !== '' && /^\d+$/.test(value);
  };

  // NOVA Função de validação para CEP (permite números e hífen, não vazio e não apenas caracteres especiais)
  const validateCepField = (value) => {
    // Garante que não é vazio ou apenas espaços
    if (value.trim() === '') return false;
    // Garante que contenha pelo menos um número ou hífen
    if (!/[0-9-]/.test(value)) return false; // Permite números e hífens
    // Opcional: Garante o formato de CEP brasileiro (5 dígitos, opcional hífen, 3 dígitos)
    return /^\d{5}-?\d{3}$/.test(value);
  };


  // controla digitação para inputs de texto
  const handleChange = e => {
    const { name, value } = e.target;
    setEscola(s => ({ ...s, [name]: value }));

    // Lógica de validação
    switch (name) {
      case 'nome':
        setNameError(!validateTextField(value));
        break;
      case 'logradouro':
        setLogradouroError(!validateTextField(value));
        break;
      case 'numero': // VALIDAÇÃO PARA NÚMERO
        setNumeroError(!validateNumberField(value));
        break;
      case 'bairro':
        setBairroError(!validateTextField(value));
        break;
      case 'cidade': // CIDADE AGORA SEMPRE VALIDADA
        setCidadeError(!validateTextField(value));
        break;
      case 'cep': // CEP AGORA SEMPRE VALIDADO
        setCepError(!validateCepField(value));
        break;
      default:
        break;
    }
  }

  // controla mudança do checkbox rural
  const handleRuralChange = e => {
    setRural(e.target.checked)
    if (e.target.checked) {
      setEscola(s => ({
        ...s,
        logradouro: '',
        numero: '',
        bairro: '',
        // CEP e Cidade não são mais limpos aqui, pois ficam sempre visíveis
      }));
      // Limpa erros de validação de endereço urbano ao marcar rural
      setLogradouroError(false);
      setNumeroError(false);
      setBairroError(false);
      // Erros de Cidade e CEP são mantidos, pois são sempre validados
    }
    // Chamar geocode com os dados atualizados para refletir a mudança de rural
    debouncedLocate({ ...escola, rural: e.target.checked });
  }

  // controla mudança do Select (para UF agora)
  const handleSelectChange = (field) => (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setEscola(s => ({ ...s, [field]: value }));
    debouncedLocate({ ...escola, [field]: value });
  };

  // dispara o geocode **apenas** no blur dos campos
  const handleBlur = e => {
    const { name, type, value, checked } = e.target
    const updated = { ...escola, [name]: type === 'checkbox' ? checked : value };

    // Revalida no blur
    switch (name) {
      case 'nome':
        setNameError(!validateTextField(value));
        break;
      case 'logradouro':
        setLogradouroError(!validateTextField(value));
        break;
      case 'numero':
        setNumeroError(!validateNumberField(value));
        break;
      case 'bairro':
        setBairroError(!validateTextField(value));
        break;
      case 'cidade': // CIDADE AGORA SEMPRE REVALIDADA
        setCidadeError(!validateTextField(value));
        break;
      case 'cep': // CEP AGORA SEMPRE REVALIDADO
        setCepError(!validateCepField(value));
        break;
      default:
        break;
    }

    if (rural && ['nome', 'cidade', 'uf'].includes(name)) {
      debouncedLocate(updated)
    }
    if (
      !rural &&
      ['logradouro', 'numero', 'bairro', 'cidade', 'uf', 'cep'].includes(name) &&
      updated.logradouro &&
      updated.numero &&
      updated.bairro &&
      updated.cidade
    ) {
      debouncedLocate(updated)
    } else if (
      rural &&
      ['nome', 'cidade', 'uf'].includes(name) &&
      updated.nome &&
      updated.cidade
    ) {
      debouncedLocate(updated);
    }
  }

  // arrastar marker
  const handleMarkerDragEnd = e => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    setMarkerPos({ lat, lng })
    setEscola(s => ({
      ...s,
      latitude: lat.toString(),
      longitude: lng.toString(),
    }))
  }

  // submit final
  const handleSubmit = async e => {
    e.preventDefault()

    // Validação final de todos os campos antes de salvar
    const isNameValid = validateTextField(escola.nome);
    const isLogradouroValid = rural || validateTextField(escola.logradouro);
    const isNumeroValid = rural || validateNumberField(escola.numero);
    const isBairroValid = rural || validateTextField(escola.bairro);
    const isCidadeValid = validateTextField(escola.cidade);
    const isCepValid = validateCepField(escola.cep);

    setNameError(!isNameValid);
    setLogradouroError(!isLogradouroValid);
    setNumeroError(!isNumeroValid);
    setBairroError(!isBairroValid);
    setCidadeError(!isCidadeValid);
    setCepError(!isCepValid);

    // Condição para impedir o envio do formulário, ajustada para novos campos obrigatórios
    if (
      !isNameValid || 
      (!rural && (!isLogradouroValid || !isNumeroValid || !isBairroValid)) ||
      !isCidadeValid || 
      !isCepValid
    ) {
      console.error('Erro de validação: Por favor, preencha todos os campos corretamente.');
      return;
    }

    setSaving(true)
    try {
      const dataToSend = { ...escola, rural: rural };
      if (id) {
        await api.put(`/escola/${id}`, dataToSend)
      } else {
        await api.post('/escola', dataToSend)
      }
      navigate('/escola')
    } finally {
      setSaving(false)
    }
  }

  // mantém o mapa sincronizado se a latitude/longitude vierem carregadas
  useEffect(() => {
    const lat = parseFloat(escola.latitude)
    const lng = parseFloat(escola.longitude)
    if (!isNaN(lat) && !isNaN(lng)) {
      setMapCenter({ lat, lng })
      setMarkerPos({ lat, lng })
    }
  }, [escola.latitude, escola.longitude])

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <CCard className="mb-4">
        <CCardHeader>
          <h4>{id ? 'Editar Escola' : 'Nova Escola'}</h4>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow className="g-3">
              {/* Nome */}
              <CCol md={12}>
                <CFormLabel>Nome</CFormLabel>
                <CFormInput
                  name="nome"
                  value={escola.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  invalid={nameError} 
                />
                {nameError && (
                  <div className="text-danger mt-1">
                    O nome deve conter letras e não pode ser apenas espaços, números ou caracteres especiais.
                  </div>
                )}
              </CCol>

              {/* Checkbox Zona Rural */}
              <CCol md={12}>
                <CFormCheck
                  type="checkbox"
                  id="zonaRural"
                  name="zonaRural"
                  label="Zona Rural"
                  checked={rural}
                  onChange={handleRuralChange}
                  onBlur={handleBlur}
                />
              </CCol>

              {/* CIDADE - MUDANÇA: SEMPRE VISÍVEL */}
              <CCol md={6}>
                <CFormLabel>Cidade</CFormLabel>
                <CFormInput
                  name="cidade"
                  value={escola.cidade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required // Sempre obrigatório
                  invalid={cidadeError}
                />
                {cidadeError && (
                  <div className="text-danger mt-1">
                    A cidade deve conter letras e não pode ser vazia, apenas espaços, números ou caracteres especiais.
                  </div>
                )}
              </CCol>

              {/* CEP - MUDANÇA: SEMPRE VISÍVEL */}
              <CCol md={6}>
                <CFormLabel>CEP</CFormLabel>
                <CFormInput
                  name="cep"
                  value={escola.cep}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required // Sempre obrigatório
                  invalid={cepError}
                />
                {cepError && (
                  <div className="text-danger mt-1">
                    O CEP deve ter 8 dígitos (ex: 12345-678 ou 12345678).
                  </div>
                )}
              </CCol>

              {/* Campos de endereço URBANOS (condicionalmente renderizados) */}
              {!rural && (
                <>
                  {/* Logradouro */}
                  <CCol md={6}>
                    <CFormLabel>Logradouro</CFormLabel>
                    <CFormInput
                      name="logradouro"
                      value={escola.logradouro}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required={!rural} // Obrigatório apenas se não for rural
                      invalid={logradouroError}
                    />
                    {logradouroError && (
                      <div className="text-danger mt-1">
                        O logradouro deve conter letras e não pode ser apenas espaços, números ou caracteres especiais.
                      </div>
                    )}
                  </CCol>
                  {/* Número */}
                  <CCol md={6}>
                    <CFormLabel>Número</CFormLabel>
                    <CFormInput
                      name="numero"
                      value={escola.numero}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required={!rural} // Obrigatório apenas se não for rural
                      invalid={numeroError}
                    />
                    {numeroError && (
                        <div className="text-danger mt-1">
                            O número deve conter apenas números e não pode ser vazio.
                        </div>
                    )}
                  </CCol>
                  {/* Bairro */}
                  <CCol md={6}>
                    <CFormLabel>Bairro</CFormLabel>
                    <CFormInput
                      name="bairro"
                      value={escola.bairro}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required={!rural} // Obrigatório apenas se não for rural
                      invalid={bairroError}
                    />
                    {bairroError && (
                      <div className="text-danger mt-1">
                        O bairro deve conter letras e não pode ser apenas espaços, números ou caracteres especiais.
                      </div>
                    )}
                  </CCol>
                </>
              )}

              {/* UF - Substituído por react-select */}
              <CCol md={6}>
                <CFormLabel>UF</CFormLabel>
                <Select
                  options={UF_OPTIONS}
                  value={UF_OPTIONS.find(option => option.value === escola.uf)}
                  onChange={handleSelectChange('uf')}
                  onBlur={handleBlur}
                  placeholder="Selecione a UF..."
                  isClearable
                  classNamePrefix="react-select" // Mantido para as regras CSS globais
                />
              </CCol>

              {/* lat/lng */}
              <CCol md={6}>
                <CRow className="g-2">
                  <CCol>
                    <CFormLabel>Latitude</CFormLabel>
                    <CFormInput
                      name="latitude"
                      value={escola.latitude}
                      disabled
                    />
                  </CCol>
                  <CCol>
                    <CFormLabel>Longitude</CFormLabel>
                    <CFormInput
                      name="longitude"
                      value={escola.longitude}
                      disabled
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>

            <div className="mt-3">
              <CButton type="submit" color="success" disabled={saving || nameError || logradouroError || numeroError || bairroError || cidadeError || cepError} className="text-white me-2">
                <CIcon icon={cilSave} className="text-white me-1" />
                {saving ? 'Salvando…' : 'Salvar'}
              </CButton>
              <CButton className="text-white me-1" color="secondary" onClick={() => navigate('/escola')}>
                <CIcon icon={cilX} />
                Cancelar
              </CButton>
            </div>

            <div className="mt-4">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={15}
              >
                <Marker
                  position={markerPos}
                  draggable
                  onDragEnd={handleMarkerDragEnd}
                />
              </GoogleMap>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </LoadScript>
  )
}

export default EscolaAddEdit