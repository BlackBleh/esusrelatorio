import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHealing, // Ícone genérico para saúde/cuidado
  cilMedicalCross, // Sugestão de ícone para Atenção Primária à Saúde
  cilPeople, // NOVO ÍCONE: Adicionado para o grupo eMulti
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
        component: CNavGroup,
        name: 'Desenvolvimento Infantil',
        to: '/aps/desenvolvimento-infantil',
        items: [
          {
            component: CNavItem,
            name: 'A. 1ª consulta presencial até 30 dias',
            to: '/aps/desenvolvimento-infantil/primeira-consulta',
          },
          {
            component: CNavItem,
            name: 'B. >= 09 consultas até 2 anos',
            to: '/aps/desenvolvimento-infantil/consultas-2-anos',
          },
          {
            component: CNavItem,
            name: 'C. >= 09 registros de peso e altura até 2 anos',
            to: '/aps/desenvolvimento-infantil/peso-altura-2-anos',
          },
          {
            component: CNavItem,
            name: 'D. >= 02 visitas domiciliares (1ª até 30 dias)',
            to: '/aps/desenvolvimento-infantil/visitas-acs-tacs',
          },
          {
            component: CNavItem,
            name: 'E. Vacinação completa',
            to: '/aps/desenvolvimento-infantil/vacinacao-completa',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Cuidado da Gestante e Puérpera',
        to: '/aps/gestante-puerpera',
        items: [
          {
            component: CNavItem,
            name: 'A. 1ª consulta pré-natal até 12 sem',
            to: '/aps/gestante-puerpera/consulta-prenatal',
          },
          {
            component: CNavItem,
            name: 'B. >= 07 consultas na gestação',
            to: '/aps/gestante-puerpera/consultas-gestacao',
          },
          {
            component: CNavItem,
            name: 'C. >= 07 reg. pressão arterial na gestação',
            to: '/aps/gestante-puerpera/reg-pressao-arterial',
          },
          {
            component: CNavItem,
            name: 'D. >= 07 reg. peso e altura na gestação',
            to: '/aps/gestante-puerpera/reg-peso-altura',
          },
          {
            component: CNavItem,
            name: 'E. >= 03 visitas domiciliares ACS/TACS',
            to: '/aps/gestante-puerpera/visitas-domiciliares',
          },
          {
            component: CNavItem,
            name: 'F. 1 dose dTPa a partir 20ª sem',
            to: '/aps/gestante-puerpera/vacina-dtpa',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Cuidado da Pessoa com Diabetes',
        to: '/aps/diabetes',
        items: [
          {
            component: CNavItem,
            name: 'A. >= 01 consulta (méd/enf) em 6 meses',
            to: '/aps/diabetes/consulta-med-enf',
          },
          {
            component: CNavItem,
            name: 'B. >= 01 reg. pressão arterial em 6 meses',
            to: '/aps/diabetes/pressao-arterial',
          },
          {
            component: CNavItem,
            name: 'C. >= 02 visitas domiciliares (ACS/TACS) em 12 meses',
            to: '/aps/diabetes/visitas-domiciliares',
          },
          {
            component: CNavItem,
            name: 'D. >= 01 reg. peso e altura em 12 meses',
            to: '/aps/diabetes/peso-altura',
          },
          {
            component: CNavItem,
            name: 'E. >= 01 reg. Hemoglobina Glicada em 12 meses',
            to: '/aps/diabetes/hemoglobina-glicada',
          },
          {
            component: CNavItem,
            name: 'F. >= 01 reg. avaliação dos pés em 15 meses',
            to: '/aps/diabetes/exame-pe',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Cuidado da Pessoa com Hipertensão Arterial',
        to: '/aps/hipertensao',
        items: [
          {
            component: CNavItem,
            name: 'A. >= 01 consulta (méd/enf) em 6 meses',
            to: '/aps/hipertensao/consulta-med-enf',
          },
          {
            component: CNavItem,
            name: 'B. >= 01 reg. aferição pressão arterial em 6 meses',
            to: '/aps/hipertensao/reg-afericao-pressao',
          },
          {
            component: CNavItem,
            name: 'C. >= 02 visitas domiciliares (ACS/TACS) em 12 meses',
            to: '/aps/hipertensao/visitas-domiciliares',
          },
          {
            component: CNavItem,
            name: 'D. >= 01 reg. peso e altura em 12 meses',
            to: '/aps/hipertensao/reg-peso-altura',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Cuidado Integral da Pessoa Idosa',
        to: '/aps/idosa',
        items: [
          {
            component: CNavItem,
            name: 'A. >= 01 consulta (méd/enf) em 12 meses',
            to: '/aps/idosa/consulta-med-enf',
          },
          {
            component: CNavItem,
            name: 'B. >= 02 registros peso e altura em 12 meses',
            to: '/aps/idosa/reg-peso-altura',
          },
          {
            component: CNavItem,
            name: 'C. >= 02 visitas domiciliares (ACS/TACS) em 12 meses',
            to: '/aps/idosa/visitas-domiciliares',
          },
          {
            component: CNavItem,
            name: 'D. >= 01 dose vacina influenza em 12 meses',
            to: '/aps/idosa/vacina-influenza',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Cuidado da Mulher na Prevenção do Câncer',
        to: '/aps/cancer-mulher',
        items: [
          {
            component: CNavItem,
            name: 'A. >= 01 exame rastreamento Câncer Colo Útero (25-64a) em 36m',
            to: '/aps/cancer-mulher/rastreamento-colo-utero',
          },
          {
            component: CNavItem,
            name: 'B. >= 01 dose vacina HPV (9-14a) em meninas',
            to: '/aps/cancer-mulher/vacina-hpv',
          },
          {
            component: CNavItem,
            name: 'C. >= 01 atendimento saúde sexual/reprodutiva (14-69a) em 12m',
            to: '/aps/cancer-mulher/atendimento-saude-sexual',
          },
          {
            component: CNavItem,
            name: 'D. >= 01 exame rastreamento Câncer Mama (50-69a) em 24m',
            to: '/aps/cancer-mulher/cancer-mama',
          },
        ],
      },
    ],
  },
  // Saúde Bucal
  {
    component: CNavGroup,
    name: 'Saúde Bucal',
    to: '/saude-bucal',
    icon: <CIcon icon={cilHealing} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '1ª Consulta Odontológica programada',
        to: '/saude-bucal/primeira-consulta',
      },
      {
        component: CNavItem,
        name: 'Tratamento Odontológico concluído',
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
        name: 'Procedimentos preventivos',
        to: '/saude-bucal/procedimentos-preventivos',
      },
      {
        component: CNavItem,
        name: 'Tratamento Restaurador Atraumático',
        to: '/saude-bucal/tratamento-restaurador-atraumatico',
      },
    ],
  },
  // NOVO GRUPO: eMulti no cuidado integral
  {
    component: CNavGroup,
    name: 'eMulti no cuidado integral',
    to: '/emulti',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />, // Ícone alterado para cilPeople
    items: [
      {
        component: CNavItem,
        name: 'Média de atendimento da eMulti por pessoa',
        to: '/emulti/media-atendimento-por-pessoa',
      },
      {
        component: CNavItem,
        name: 'Ações Interprofissionais da eMulti',
        to: '/emulti/acoes-interprofissionais',
      },
    ],
  },
]

export default _nav
