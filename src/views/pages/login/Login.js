import brasaoSalgueiro from 'src/images/brasao_salgueiro.png'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              {/* Card da Esquerda: Login Form */}
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Entre na sua conta</p> {/* Texto alterado */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Usuário" autoComplete="username" /> {/* Placeholder alterado */}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Senha"
                        autoComplete="current-password"
                      /> {/* Placeholder alterado */}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Esqueceu a senha?
                        </CButton> {/* Texto alterado */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              {/* Card da Direita: Brasão da Prefeitura de Salgueiro */}
              {/* Alterado bg-primary para bg-dark para combinar com o tema, e ajustado o width */}
              <CCard className="text-white bg-dark py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <img
                      src={brasaoSalgueiro}
                      alt="Brasão da Prefeitura de Salgueiro"
                      // Ajuste o estilo para que o brasão se encaixe bem
                      style={{ maxWidth: '180px', height: 'auto', marginBottom: '20px' }}
                    />
                    <h2 className="mb-3">Prefeitura de Salgueiro</h2> {/* Novo título */}
                    <p className="text-white-50">
                      Sistema de Gerenciamento de Lotação de Servidores.
                      <br />
                      Acesse com suas credenciais.
                    </p> {/* Novo texto descritivo */}
                    {/* Botão de Register Removido ou Alterado para 'Voltar' ou similar, se desejar */}
                    {/*
                    <Link to="/register">
                      <CButton color="light" className="mt-3" active tabIndex={-1}>
                        Cadastre-se
                      </CButton>
                    </Link>
                    */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login