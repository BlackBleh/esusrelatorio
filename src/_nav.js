import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBraille,
  cilChild,
  cilLibraryBuilding,
  cilSchool,
  cilHealing, // Ícone genérico para saúde/cuidado
  cilClipboard,
  cilCarAlt, // Ícone para 'Lotar'
  cilUser, // Ícone para 'Servidor de Apoio'
  cilMedicalCross, // Sugestão de ícone para Atenção Primária à Saúde
  cilVoice, // Ícone para Saúde Bucal (substituindo cilTooth)
  // Adicione outros ícones se desejar para os submenus
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  // NOVO: Atenção Primária à Saúde
  {
    component: CNavGroup,
    name: 'Atenção Primária à Saúde',
    to: '/aps', // Rota base para APS (placeholder)
    icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />, // Ícone para APS
    items: [
      {
        component: CNavItem,
        name: 'Desenvolvimento Infantil',
        to: '/aps/desenvolvimento-infantil', // Placeholder
      },
      {
        component: CNavItem,
        name: 'Cuidado da Gestante e Puérpera',
        to: '/aps/gestante-puerpera', // Placeholder
      },
      {
        component: CNavItem,
        name: 'Cuidado da Pessoa com Diabetes',
        to: '/aps/diabetes', // Placeholder
      },
      {
        component: CNavItem,
        name: 'Cuidado da Pessoa com Hipertensão Arterial',
        to: '/aps/hipertensao', // Placeholder
      },
      {
        component: CNavItem,
        name: 'Cuidado da Pessoa Idosa',
        to: '/aps/idosa', // Placeholder
      },
      {
        component: CNavItem,
        name: 'Cuidado da Mulher na Prevenção do Câncer',
        to: '/aps/cancer-mulher', // Placeholder
      },
    ],
  },
  // NOVO: Saúde Bucal
  {
    component: CNavGroup,
    name: 'Saúde Bucal',
    to: '/saude-bucal', // Rota base para Saúde Bucal (placeholder)
    icon: <CIcon icon={cilVoice} customClassName="nav-icon" />, // Ícone para Saúde Bucal (cilVoice no lugar de cilTooth)
    items: [
      {
        component: CNavItem,
        name: '1ª Consulta Odontológica programada na APS',
        to: '/saude-bucal/primeira-consulta', // Placeholder
      },
      {
        component: CNavItem,
        name: 'Tratamento Odontológico concluído na APS',
        to: '/saude-bucal/tratamento-concluido', // Placeholder
      },
      {
        component: CNavItem,
        name: 'Taxa de exodontias na APS',
        to: '/saude-bucal/taxa-exodontias', // Placeholder
      },
      {
        component: CNavItem,
        name: 'Escovação Supervisionada na APS',
        to: '/saude-bucal/escovacao-supervisionada', // Placeholder
      },
      {
        component: CNavItem,
        name: 'Procedimentos Odontológicos preventivos na APS',
        to: '/saude-bucal/procedimentos-preventivos', // Placeholder
      },
      {
        component: CNavItem,
        name: 'Tratamento Restaurador Atraumático na APS',
        to: '/saude-bucal/tratamento-restaurador-atraumatico', // Placeholder
      },
    ],
  },
  // --- INÍCIO DOS ITENS EXISTENTES (APÓS OS NOVOS) ---
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