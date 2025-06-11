import React, { useEffect, useRef } from 'react' // <--- CORREÇÃO AQUI: Adicionado useEffect e useRef
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown, // Necessário para o seletor de tema
  CDropdownItem, // Necessário para o seletor de tema
  CDropdownMenu, // Necessário para o seletor de tema
  CDropdownToggle, // Necessário para o seletor de tema
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink, // Necessário se houver outros CNavLinks
  CNavItem, // Necessário se houver outros CNavItems
  useColorModes, // Necessário para o seletor de tema
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilMenu, // Ícone do menu toggle
  cilContrast, // Ícone do seletor de tema
  cilMoon, // Ícone do seletor de tema
  cilSun, // Ícone do seletor de tema
  // Outros ícones (cilBell, cilList, cilEnvelopeOpen) devem permanecer removidos
} from '@coreui/icons'

import { AppBreadcrumb } from './index' // Importação do AppBreadcrumb
// Removido o import do AppHeaderDropdown, pois o avatar do usuário não será exibido
// import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const headerRef = useRef()
  // Hook para gerenciar o modo de cor do tema
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  // Log para depuração: verificar o colorMode no AppHeader
  useEffect(() => { // <--- useEffect agora está importado e deve funcionar
    console.log('colorMode no AppHeader:', colorMode);
  }, [colorMode]);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        
        {/* CHeaderNav para links à esquerda (agora vazio, pois removemos Dashboard, Users, Settings) */}
        <CHeaderNav className="d-none d-md-flex me-auto">
          {/* Seus links customizados aqui, se houver */}
        </CHeaderNav>

        <CHeaderNav className="ms-auto">
          {/* Seletor de Tema (sol/lua/contraste) - MANTIDO */}
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => {
                  console.log('Setando tema para: light'); // <--- ADICIONE ESTE LOG
                  setColorMode('light');
                }}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => {
                  console.log('Setando tema para: dark'); // <--- ADICIONE ESTE LOG
                  setColorMode('dark');
                }}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => {
                  console.log('Setando tema para: auto'); // <--- ADICIONE ESTE LOG
                  setColorMode('auto');
                }}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          {/* O AppHeaderDropdown (avatar do usuário) permanece removido */}
          {/* <AppHeaderDropdown /> */}
        </CHeaderNav>
      </CContainer>
      {/* Breadcrumb da página */}
      <CContainer className="px-4" fluid>
        <AppBreadcrumb /> {/* AppBreadcrumb usado aqui */}
      </CContainer>
    </CHeader>
  )
}

export default AppHeader