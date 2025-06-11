import React from 'react'

// Importações dos componentes que serão carregados de forma lazy
// ATENÇÃO: Dashboard principal agora aponta para o SideDashboard.js
const Dashboard = React.lazy(() => import('./views/dashboard/SideDashboard'))

//Side Dashboard
const SideDashboard = React.lazy(() => import('./views/dashboard/SideDashboard'))

// Escola
const EscolaList = React.lazy(() => import('./views/escola/EscolaList'))
const EscolaAdd = React.lazy(() => import('./views/escola/EscolaAddEdit'))
const EscolaIndividualDashboard = React.lazy(() => import('./views/escola/EscolaIndividualDashboard'))

// Servidor de Apoio
const ServidorApoioList = React.lazy(() => import('./views/servidorApoio/ServidorApoioList'))
const ServidorApoioAddEdit = React.lazy(() => import('./views/servidorApoio/ServidorApoioAddEdit'))

// Turma
const TurmaList = React.lazy(() => import('./views/turma/TurmaList'))
const TurmaAdd = React.lazy(() => import('./views/turma/TurmaAddEdit'))

// Atipicidade
const AtipicidadeList = React.lazy(() => import('./views/atipicidade/AtipicidadeList'))
const AtipicidadeAdd = React.lazy(() => import('./views/atipicidade/AtipicidadeAddEdit'))

// Aluno Atípico
const AlunoAtipicoList = React.lazy(() => import('./views/alunoAtipico/AlunoAtipicoList'))
const AlunoAtipicoAdd = React.lazy(() => import('./views/alunoAtipico/AlunoAtipicoAddEdit'))

// Componentes: Lotar
const LotacaoList = React.lazy(() => import('./views/lotacao/LotacaoList'))
const LotacaoAddEdit = React.lazy(() => import('./views/lotacao/LotacaoAddEdit'))

// --- NOVAS IMPORTAÇÕES PARA ATENÇÃO PRIMÁRIA À SAÚDE ---
const APSDesenvolvimentoInfantil = React.lazy(() => import('./views/aps/DesenvolvimentoInfantil'))
const APSCuidadoGestantePuerpera = React.lazy(() => import('./views/aps/CuidadoGestantePuerpera'))
const APSCuidadoDiabetes = React.lazy(() => import('./views/aps/CuidadoDiabetes'))
const APSCuidadoHipertensao = React.lazy(() => import('./views/aps/CuidadoHipertensao'))
const APSCuidadoIdosa = React.lazy(() => import('./views/aps/CuidadoIdosa'))
const APSCuidadoCancerMulher = React.lazy(() => import('./views/aps/CuidadoCancerMulher'))

// --- NOVAS IMPORTAÇÕES PARA SAÚDE BUCAL ---
const SaudeBucalPrimeiraConsulta = React.lazy(() => import('./views/saudeBucal/PrimeiraConsultaOdontologica'))
const SaudeBucalTratamentoConcluido = React.lazy(() => import('./views/saudeBucal/TratamentoOdontologicoConcluido'))
const SaudeBucalTaxaExodontias = React.lazy(() => import('./views/saudeBucal/TaxaExodontias'))
const SaudeBucalEscovacaoSupervisionada = React.lazy(() => import('./views/saudeBucal/EscovacaoSupervisionada'))
const SaudeBucalProcedimentosPreventivos = React.lazy(() => import('./views/saudeBucal/ProcedimentosPreventivos'))
const SaudeBucalTratamentoRestauradorAtraumatico = React.lazy(() => import('./views/saudeBucal/TratamentoRestauradorAtraumatico'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard }, // A rota principal do Dashboard agora usa o novo componente SideDashboard

  //Rotas do Side Dashboard
  { path: '/sideDashboard', name: 'Side Dashboard Listar', element: SideDashboard },

  // --- NOVAS ROTAS PARA ATENÇÃO PRIMÁRIA À SAÚDE ---
  // A rota '/aps' pode ser um redirecionamento ou uma página de visão geral
  { path: '/aps', name: 'Atenção Primária à Saúde', element: APSDesenvolvimentoInfantil, exact: true }, // Pode redirecionar para o primeiro submenu ou ter uma página própria
  { path: '/aps/desenvolvimento-infantil', name: 'Desenvolvimento Infantil', element: APSDesenvolvimentoInfantil },
  { path: '/aps/gestante-puerpera', name: 'Cuidado da Gestante e Puérpera', element: APSCuidadoGestantePuerpera },
  { path: '/aps/diabetes', name: 'Cuidado da Pessoa com Diabetes', element: APSCuidadoDiabetes },
  { path: '/aps/hipertensao', name: 'Cuidado da Pessoa com Hipertensão Arterial', element: APSCuidadoHipertensao },
  { path: '/aps/idosa', name: 'Cuidado da Pessoa Idosa', element: APSCuidadoIdosa },
  { path: '/aps/cancer-mulher', name: 'Cuidado da Mulher na Prevenção do Câncer', element: APSCuidadoCancerMulher },

  // --- NOVAS ROTAS PARA SAÚDE BUCAL ---
  // A rota '/saude-bucal' pode ser um redirecionamento ou uma página de visão geral
  { path: '/saude-bucal', name: 'Saúde Bucal', element: SaudeBucalPrimeiraConsulta, exact: true }, // Pode redirecionar ou ter página própria
  { path: '/saude-bucal/primeira-consulta', name: '1ª Consulta Odontológica programada na APS', element: SaudeBucalPrimeiraConsulta },
  { path: '/saude-bucal/tratamento-concluido', name: 'Tratamento Odontológico concluído na APS', element: SaudeBucalTratamentoConcluido },
  { path: '/saude-bucal/taxa-exodontias', name: 'Taxa de exodontias na APS', element: SaudeBucalTaxaExodontias },
  { path: '/saude-bucal/escovacao-supervisionada', name: 'Escovação Supervisionada na APS', element: SaudeBucalEscovacaoSupervisionada },
  { path: '/saude-bucal/procedimentos-preventivos', name: 'Procedimentos Odontológicos preventivos na APS', element: SaudeBucalProcedimentosPreventivos },
  { path: '/saude-bucal/tratamento-restaurador-atraumatico', name: 'Tratamento Restaurador Atraumático na APS', element: SaudeBucalTratamentoRestauradorAtraumatico },


  // Rotas de Escola
  { path: '/escola', name: 'Escola Listar', element: EscolaList },
  { path: '/escola/nova', name: 'Escola Adicionar', element: EscolaAdd },
  { path: '/escola/editar/:id', name: 'Escola Editar', element: EscolaAdd },
  { path: '/escola/dashboard/:id', name: 'Dashboard da Escola', element: EscolaIndividualDashboard },

  // Rotas de Servidor de Apoio
  { path: '/servidorApoio', name: 'Servidor de Apoio Listar', element: ServidorApoioList },
  { path: '/servidorApoio/nova', name: 'Servidor de Apoio Adicionar', element: ServidorApoioAddEdit },
  { path: '/servidorApoio/editar/:id', name: 'Servidor de Apoio Editar', element: ServidorApoioAddEdit },

  // Rotas de Turma
  { path: '/turma', name: 'Turma Listar', element: TurmaList },
  { path: '/turma/nova', name: 'Turma Adicionar', element: TurmaAdd },
  { path: '/turma/editar/:id', name: 'Turma Editar', element: TurmaAdd },

  // Rotas de Atipicidade
  { path: '/atipicidade', name: 'Atipicidade Listar', element: AtipicidadeList },
  { path: '/atipicidade/nova', name: 'Atipicidade Adicionar', element: AtipicidadeAdd },
  { path: '/atipicidade/editar/:id', name: 'Atipicidade Editar', element: AtipicidadeAdd },

  // Rotas de Aluno Atípico
  { path: '/alunoAtipico', name: 'Aluno Atípico Listar', element: AlunoAtipicoList },
  { path: '/alunoAtipico/novo', name: 'Aluno Atípico Adicionar', element: AlunoAtipicoAdd },
  { path: '/alunoAtipico/editar/:id', name: 'Aluno Atípico Editar', element: AlunoAtipicoAdd },

  // Rotas: Lotar
  { path: '/lotacao', name: 'Lotação Listar', element: LotacaoList },
  { path: '/lotacao/nova', name: 'Lotação Adicionar', element: LotacaoAddEdit },
  { path: '/lotacao/editar/:id', name: 'Lotação Editar', element: LotacaoAddEdit },
]

export default routes