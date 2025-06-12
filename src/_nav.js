import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  // Removendo ícones não utilizados para as opções removidas
  // cilBraille,
  // cilChild,
  // cilLibraryBuilding,
  // cilSchool,
  // cilClipboard,
  // cilCarAlt,
  // cilUser,
  cilHealing, // Ícone genérico para saúde/cuidado
  cilMedicalCross, // Sugestão de ícone para Atenção Primária à Saúde
  cilVoice, // Ícone para Saúde Bucal
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  // Atenção Primária à Saúde
  {
    component: CNavGroup,
    name: 'Atenção Primária à Saúde',
    to: '/aps',
    icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Desenvolvimento Infantil',
        to: '/aps/desenvolvimento-infantil',
      },
      {
        component: CNavItem,
        name: 'Cuidado da Gestante e Puérpera',
        to: '/aps/gestante-puerpera',
      },
      {
        component: CNavItem,
        name: 'Cuidado da Pessoa com Diabetes',
        to: '/aps/diabetes',
      },
      {
        component: CNavItem,
        name: 'Cuidado da Pessoa com Hipertensão Arterial',
        to: '/aps/hipertensao',
      },
      {
        component: CNavItem,
        name: 'Cuidado da Pessoa Idosa',
        to: '/aps/idosa',
      },
      {
        component: CNavItem,
        name: 'Cuidado da Mulher na Prevenção do Câncer',
        to: '/aps/cancer-mulher',
      },
    ],
  },
  // Saúde Bucal
  {
    component: CNavGroup,
    name: 'Saúde Bucal',
    to: '/saude-bucal',
    icon: <CIcon icon={cilVoice} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '1ª Consulta Odontológica programada na APS',
        to: '/saude-bucal/primeira-consulta',
      },
      {
        component: CNavItem,
        name: 'Tratamento Odontológico concluído na APS',
        to: '/saude-bucal/tratamento-concluido',
      },
      {
        component: CNavItem,
        name: 'Taxa de exodontias na APS',
        to: '/saude-bucal/taxa-exodontias',
      },
      {
        component: CNavItem,
        name: 'Escovação Supervisionada na APS',
        to: '/saude-bucal/escovacao-supervisionada',
      },
      {
        component: CNavItem,
        name: 'Procedimentos Odontológicos preventivos na APS',
        to: '/saude-bucal/procedimentos-preventivos',
      },
      {
        component: CNavItem,
        name: 'Tratamento Restaurador Atraumático na APS',
        to: '/saude-bucal/tratamento-restaurador-atraumatico',
      },
    ],
  },
]

export default _nav