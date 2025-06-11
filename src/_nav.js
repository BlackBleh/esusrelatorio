import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBraille,
  cilChild,
  cilLibraryBuilding,
  cilSchool,
  cilHealing,
  cilClipboard,
  cilCarAlt, // Ícone para 'Lotar'
  cilUser, // Ícone para 'Servidor de Apoio'
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Dashboard',
    to: '/sideDashboard',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/sideDashboard',
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Escola',
    to: '/escola',
    icon: <CIcon icon={cilLibraryBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/escola/nova',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/escola',
      },
    ]
  },
  // NOVO POSICIONAMENTO E NOME: Servidor de Apoio (entre Escola e Turma)
  {
    component: CNavGroup,
    name: 'Servidor de Apoio', // Nome do menu alterado
    to: '/servidorApoio', // Rota base alterada
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/servidorApoio/nova', // Rota alterada
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/servidorApoio', // Rota alterada
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Turma',
    to: '/turma',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/turma/nova',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/turma',
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Atipicidade',
    to: '/atipicidade',
    icon: <CIcon icon={cilBraille} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/atipicidade/nova',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/atipicidade',
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Aluno Atípico',
    to: '/alunoAtipico',
    icon: <CIcon icon={cilChild} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/alunoAtipico/novo',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/alunoAtipico',
      },
    ]
  },
  // Menu Lotar (já existia)
  {
    component: CNavGroup,
    name: 'Lotar',
    to: '/lotacao',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/lotacao/nova',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/lotacao',
      },
    ]
  },
]

export default _nav
