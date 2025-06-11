import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        {/* Substituído o link e o texto do CoreUI por um texto de copyright da Prefeitura de Serra Talhada */}
        {/* <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
        <span className="ms-1">&copy; 2025 creativeLabs.</span> */}
        <span>&copy; Prefeitura de Serra Talhada</span> {/* Novo texto de copyright */}
      </div>
      <div className="ms-auto">
        {/* Substituído o texto "Powered by CoreUI..." por um texto de desenvolvimento para a Prefeitura */}
        {/* <span className="me-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI React Admin &amp; Dashboard Template
        </a> */}
        <span>Desenvolvido para a Prefeitura de Serra Talhada.</span> {/* Novo texto no lado direito */}
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)