import React from 'react'

// Removendo importações de componentes não mais usados
// const Dashboard = React.lazy(() => import('./views/dashboard/SideDashboard'))
// const SideDashboard = React.lazy(() => import('./views/dashboard/SideDashboard'))
// const EscolaList = React.lazy(() => import('./views/escola/EscolaList'))
// const EscolaAdd = React.lazy(() => import('./views/escola/EscolaAddEdit'))
// const EscolaIndividualDashboard = React.lazy(() => import('./views/escola/EscolaIndividualDashboard'))
// const ServidorApoioList = React.lazy(() => import('./views/servidorApoio/ServidorApoioList'))
// const ServidorApoioAddEdit = React.lazy(() => import('./views/servidorApoio/ServidorApoioAddEdit'))
// const TurmaList = React.lazy(() => import('./views/turma/TurmaList'))
// const TurmaAdd = React.lazy(() => import('./views/turma/TurmaAddEdit'))
// const AtipicidadeList = React.lazy(() => import('./views/atipicidade/AtipicidadeList'))
// const AtipicidadeAdd = React.lazy(() => import('./views/atipicidade/AtipicidadeAddEdit'))
// const AlunoAtipicoList = React.lazy(() => import('./views/alunoAtipico/AlunoAtipicoList'))
// const AlunoAtipicoAdd = React.lazy(() => import('./views/alunoAtipico/AlunoAtipicoAddEdit'))
// const LotacaoList = React.lazy(() => import('./views/lotacao/LotacaoList'))
// const LotacaoAddEdit = React.lazy(() => import('./views/lotacao/LotacaoAddEdit'))


// --- NOVAS IMPORTAÇÕES PARA ATENÇÃO PRIMÁRIA À SAÚDE (MANTIDAS) ---
const APSDesenvolvimentoInfantil = React.lazy(() => import('./views/aps/DesenvolvimentoInfantil'))
const APSCuidadoGestantePuerpera = React.lazy(() => import('./views/aps/CuidadoGestantePuerpera'))
const APSCuidadoDiabetes = React.lazy(() => import('./views/aps/CuidadoDiabetes'))
const APSCuidadoHipertensao = React.lazy(() => import('./views/aps/CuidadoHipertensao'))
const APSCuidadoIdosa = React.lazy(() => import('./views/aps/CuidadoIdosa'))
const APSCuidadoCancerMulher = React.lazy(() => import('./views/aps/CuidadoCancerMulher'))

// --- NOVAS IMPORTAÇÕES PARA SAÚDE BUCAL (MANTIDAS) ---
const SaudeBucalPrimeiraConsulta = React.lazy(() => import('./views/saudeBucal/PrimeiraConsultaOdontologica'))
const SaudeBucalTratamentoConcluido = React.lazy(() => import('./views/saudeBucal/TratamentoOdontologicoConcluido'))
const SaudeBucalTaxaExodontias = React.lazy(() => import('./views/saudeBucal/TaxaExodontias'))
const SaudeBucalEscovacaoSupervisionada = React.lazy(() => import('./views/saudeBucal/EscovacaoSupervisionada'))
const SaudeBucalProcedimentosPreventivos = React.lazy(() => import('./views/saudeBucal/ProcedimentosPreventivos'))
const SaudeBucalTratamentoRestauradorAtraumatico = React.lazy(() => import('./views/saudeBucal/TratamentoRestauradorAtraumatico'))


const routes = [
  // Você pode querer que a rota principal '/' leve a um dos seus novos dashboards,
  // ou a uma página inicial genérica sobre os indicadores de saúde.
  // Por exemplo, podemos redirecionar para o Desenvolvimento Infantil:
  { path: '/', exact: true, name: 'Home', element: APSDesenvolvimentoInfantil }, // Altere o elemento para a sua página inicial desejada

  // Removendo as rotas de Dashboard que não serão mais usadas como principais
  // { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/sideDashboard', name: 'Side Dashboard Listar', element: SideDashboard },

  // --- ROTAS PARA ATENÇÃO PRIMÁRIA À SAÚDE (MANTIDAS) ---
  { path: '/aps', name: 'Atenção Primária à Saúde', element: APSDesenvolvimentoInfantil, exact: true },
  { path: '/aps/desenvolvimento-infantil', name: 'Desenvolvimento Infantil', element: APSDesenvolvimentoInfantil },
  { path: '/aps/gestante-puerpera', name: 'Cuidado da Gestante e Puérpera', element: APSCuidadoGestantePuerpera },
  { path: '/aps/diabetes', name: 'Cuidado da Pessoa com Diabetes', element: APSCuidadoDiabetes },
  { path: '/aps/hipertensao', name: 'Cuidado da Pessoa com Hipertensão Arterial', element: APSCuidadoHipertensao },
  { path: '/aps/idosa', name: 'Cuidado da Pessoa Idosa', element: APSCuidadoIdosa },
  { path: '/aps/cancer-mulher', name: 'Cuidado da Mulher na Prevenção do Câncer', element: APSCuidadoCancerMulher },

  // --- ROTAS PARA SAÚDE BUCAL (MANTIDAS) ---
  { path: '/saude-bucal', name: 'Saúde Bucal', element: SaudeBucalPrimeiraConsulta, exact: true },
  { path: '/saude-bucal/primeira-consulta', name: '1ª Consulta Odontológica programada na APS', element: SaudeBucalPrimeiraConsulta },
  { path: '/saude-bucal/tratamento-concluido', name: 'Tratamento Odontológico concluído na APS', element: SaudeBucalTratamentoConcluido },
  { path: '/saude-bucal/taxa-exodontias', name: 'Taxa de exodontias na APS', element: SaudeBucalTaxaExodontias },
  { path: '/saude-bucal/escovacao-supervisionada', name: 'Escovação Supervisionada na APS', element: SaudeBucalEscovacaoSupervisionada },
  { path: '/saude-bucal/procedimentos-preventivos', name: 'Procedimentos Odontológicos preventivos na APS', element: SaudeBucalProcedimentosPreventivos },
  { path: '/saude-bucal/tratamento-restaurador-atraumatico', name: 'Tratamento Restaurador Atraumático na APS', element: SaudeBucalTratamentoRestauradorAtraumatico },

  // Removendo as rotas de Escola, Servidor de Apoio, Turma, Atipicidade, Aluno Atípico, Lotar
  // { path: '/escola', name: 'Escola Listar', element: EscolaList },
  // { path: '/escola/nova', name: 'Escola Adicionar', element: EscolaAdd },
  // { path: '/escola/editar/:id', name: 'Escola Editar', element: EscolaAdd },
  // { path: '/escola/dashboard/:id', name: 'Dashboard da Escola', element: EscolaIndividualDashboard },
  // { path: '/servidorApoio', name: 'Servidor de Apoio Listar', element: ServidorApoioList },
  // { path: '/servidorApoio/nova', name: 'Servidor de Apoio Adicionar', element: ServidorApoioAddEdit },
  // { path: '/servidorApoio/editar/:id', name: 'Servidor de Apoio Editar', element: ServidorApoioAddEdit },
  // { path: '/turma', name: 'Turma Listar', element: TurmaList },
  // { path: '/turma/nova', name: 'Turma Adicionar', element: TurmaAdd },
  // { path: '/turma/editar/:id', name: 'Turma Editar', element: TurmaAdd },
  // { path: '/atipicidade', name: 'Atipicidade Listar', element: AtipicidadeList },
  // { path: '/atipicidade/nova', name: 'Atipicidade Adicionar', element: AtipicidadeAdd },
  // { path: '/atipicidade/editar/:id', name: 'Atipicidade Editar', element: AtipicidadeAdd },
  // { path: '/alunoAtipico', name: 'Aluno Atípico Listar', element: AlunoAtipicoList },
  // { path: '/alunoAtipico/novo', name: 'Aluno Atípico Adicionar', element: AlunoAtipicoAdd },
  // { path: '/alunoAtipico/editar/:id', name: 'Aluno Atípico Editar', element: AlunoAtipicoAdd },
  // { path: '/lotacao', name: 'Lotação Listar', element: LotacaoList },
  // { path: '/lotacao/nova', name: 'Lotação Adicionar', element: LotacaoAddEdit },
  // { path: '/lotacao/editar/:id', name: 'Lotação Editar', element: LotacaoAddEdit },
]

export default routes