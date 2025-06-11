import React from 'react'

// Importações dos componentes que serão carregados de forma lazy
// ATENÇÃO: Dashboard principal agora aponta para o SideDashboard.js
const Dashboard = React.lazy(() => import('./views/dashboard/SideDashboard'))

//Side Dashboard
const SideDashboard = React.lazy(() => import('./views/dashboard/SideDashboard'))
// Escola
const EscolaList = React.lazy(() => import('./views/escola/EscolaList'))
const EscolaAdd = React.lazy(() => import('./views/escola/EscolaAddEdit'))
// Removido EscolaDashboard genérico na iteração anterior, mantendo a consistência.
// const EscolaDashboard = React.lazy(() => import('./views/escola/EscolaDashboard'))
const EscolaIndividualDashboard = React.lazy(() => import('./views/escola/EscolaIndividualDashboard')) // NOVO: Importar Dashboard Individual

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


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard }, // A rota principal do Dashboard agora usa o novo componente SideDashboard

  //Rotas do Side Dashboard
  { path: '/sideDashboard', name: 'Side Dashboard Listar', element: SideDashboard },


  // Rotas de Escola
  { path: '/escola', name: 'Escola Listar', element: EscolaList },
  { path: '/escola/nova', name: 'Escola Adicionar', element: EscolaAdd },
  { path: '/escola/editar/:id', name: 'Escola Editar', element: EscolaAdd },
  // NOVO: Rota para o Dashboard Individual da Escola com parâmetro de ID
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
