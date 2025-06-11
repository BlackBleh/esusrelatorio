import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

// Importe o brasão da Prefeitura de Serra Talhada
import brasaoSerraTalhada from 'src/images/brasao_serratalhada.png'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { colorMode } = useColorModes('coreui-free-react-admin-template-theme')

  // REMOVIDO: A variável textColor não é mais necessária, pois o estilo será gerenciado pelo CSS do CoreUI
  // const textColor = colorMode === 'light' ? 'var(--cui-body-color)' : 'var(--cui-light-body-color)'; 

  // Log de depuração: verifique o valor de colorMode no console
  console.log('AppSidebar render - colorMode:', colorMode); // Removido textColor do log, pois não será mais usado aqui

  return (
    <CSidebar
      key={colorMode} // Mantém a key para forçar re-montagem no tema
      className="border-end"
      colorScheme={colorMode === 'light' ? 'light' : 'dark'}
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/" style={{ textDecoration: 'none' }}>
          <div className="d-flex align-items-center">
            <img
              src={brasaoSerraTalhada}
              alt="Brasão da Prefeitura de Serra Talhada"
              style={{ height: 40, width: 'auto', marginRight: '10px' }}
            />
            <span
              className="fw-bold fs-6 sidebar-brand-text sidebar-hide-on-narrow"
              // MUDANÇA AQUI: REMOVIDO style={{ color: textColor }}
            >
              Prefeitura de Serra Talhada
            </span>
          </div>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
