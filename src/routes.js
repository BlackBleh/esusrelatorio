import React from 'react'

// Removendo importações de componentes não mais usados ou que serão substituídos
// const Dashboard = React.lazy(() => import('./views/dashboard/SideDashboard'))
// const SideDashboard = React.lazy(() => import('./views/dashboard/SideDashboard'))
// ... e outros que você removeu anteriormente

// --- NOVAS IMPORTAÇÕES PARA ATENÇÃO PRIMÁRIA À SAÚDE (MANTIDAS) ---
const APSDesenvolvimentoInfantil = React.lazy(() => import('./views/aps/DesenvolvimentoInfantil'))
const APSCuidadoGestantePuerpera = React.lazy(() => import('./views/aps/CuidadoGestantePuerpera'))
const APSCuidadoDiabetes = React.lazy(() => import('./views/aps/CuidadoDiabetes'))

// IMPORTAÇÕES CORRIGIDAS PARA CUIDADO HIPERTENSAO (AGORA DIVIDIDAS)
const ACuidadoHipertensao = React.lazy(() => import('./views/aps/ACuidadoHipertensao')); // Novo componente A
const BCuidadoHipertensao = React.lazy(() => import('./views/aps/BCuidadoHipertensao')); // Novo componente B

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

  // --- ROTAS PARA ATENÇÃO PRIMÁRIA À SAÚDE (MANTIDAS) ---
  { path: '/aps', name: 'Atenção Primária à Saúde', element: APSDesenvolvimentoInfantil, exact: true },
  { path: '/aps/desenvolvimento-infantil', name: 'Desenvolvimento Infantil', element: APSDesenvolvimentoInfantil },
  { path: '/aps/gestante-puerpera', name: 'Cuidado da Gestante e Puérpera', element: APSCuidadoGestantePuerpera },
  { path: '/aps/diabetes', name: 'Cuidado da Pessoa com Diabetes', element: APSCuidadoDiabetes },
  
  // ROTAS CORRIGIDAS PARA CUIDADO DA PESSOA COM HIPERTENSÃO ARTERIAL
  // A rota base '/aps/hipertensao' pode ser uma página de overview ou redirecionar para 'A'
  { path: '/aps/hipertensao', name: 'Cuidado da Pessoa com Hipertensão Arterial', element: ACuidadoHipertensao, exact: true },
  { path: '/aps/hipertensao/consulta-med-enf', name: 'A. Consultas Hipertensos', element: ACuidadoHipertensao },
  { path: '/aps/hipertensao/reg-peso-altura', name: 'D. Peso e Altura Hipertensos', element: BCuidadoHipertensao },
  // As rotas para B e C do _nav.js ainda precisam de componentes correspondentes:
  { path: '/aps/hipertensao/reg-afericao-pressao', name: 'B. Aferição Pressão Hipertensos', element: ACuidadoHipertensao }, // Placeholder, crie seu B real
  { path: '/aps/hipertensao/visitas-domiciliares', name: 'C. Visitas Domiciliares Hipertensos', element: ACuidadoHipertensao }, // Placeholder, crie seu C real


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

  // As rotas de eMulti ainda precisam de componentes
  { path: '/emulti', name: 'eMulti no cuidado integral', element: APSDesenvolvimentoInfantil, exact: true }, // Placeholder
  { path: '/emulti/media-atendimento-por-pessoa', name: 'Média de atendimento da eMulti por pessoa', element: APSDesenvolvimentoInfantil }, // Placeholder
  { path: '/emulti/acoes-interprofissionais', name: 'Ações Interprofissionais da eMulti', element: APSDesenvolvimentoInfantil }, // Placeholder

  // Removendo as rotas de Escola, Servidor de Apoio, Turma, Atipicidade, Aluno Atípico, Lotar
  // (Comentadas como você havia feito antes)
]

export default routes
