import React from 'react'

// Removendo importações de componentes não mais usados ou que serão substituídos
// const Dashboard = React.lazy(() => import('./views/dashboard/SideDashboard'))
// const SideDashboard = React.lazy(() => import('./views/dashboard/SideDashboard'))
// ... e outros que você removeu anteriormente

// --- NOVAS IMPORTAÇÕES PARA ATENÇÃO PRIMÁRIA À SAÚDE (MANTIDAS) ---
const APSDesenvolvimentoInfantil = React.lazy(() => import('./views/aps/DesenvolvimentoInfantil'))
const APSCuidadoGestantePuerpera = React.lazy(() => import('./views/aps/CuidadoGestantePuerpera'))
const APSCuidadoDiabetes = React.lazy(() => import('./views/aps/CuidadoDiabetes'))

// IMPORTAÇÕES PARA CUIDADO HIPERTENSAO (AGORA DIVIDIDAS)
const ACuidadoHipertensao = React.lazy(() => import('./views/aps/ACuidadoHipertensao')); // Novo componente A
const BCuidadoHipertensao = React.lazy(() => import('./views/aps/BCuidadoHipertensao')); // Novo componente B
const DCuidadoHipertensao = React.lazy(() => import('./views/aps/DCuidadoHipertensao')); // NOVO COMPONENTE D

// IMPORTAÇÕES PARA CUIDADO IDOSA
const ACuidadoIdoso = React.lazy(() => import('./views/aps/ACuidadoIdoso')); // Componente para o gráfico A de Idosos
const BCuidadoIdoso = React.lazy(() => import('./views/aps/BCuidadoIdoso')); // NOVO COMPONENTE para o gráfico B de Idosos
const DCuidadoIdoso = React.lazy(() => import('./views/aps/DCuidadoIdoso')); // Componente para o gráfico D de Idosos

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
  { path: '/', exact: true, name: 'Home', element: APSDesenvolvimentoInfantil }, 

  // --- ROTAS PARA ATENÇÃO PRIMÁRIA À SAÚDE ---
  { path: '/aps', name: 'Atenção Primária à Saúde', element: APSDesenvolvimentoInfantil, exact: true },
  { path: '/aps/desenvolvimento-infantil', name: 'Desenvolvimento Infantil', element: APSDesenvolvimentoInfantil },
  { path: '/aps/gestante-puerpera', name: 'Cuidado da Gestante e Puérpera', element: APSCuidadoGestantePuerpera },
  { path: '/aps/diabetes', name: 'Cuidado da Pessoa com Diabetes', element: APSCuidadoDiabetes },
  
  // ROTAS PARA CUIDADO DA PESSOA COM HIPERTENSÃO ARTERIAL
  { path: '/aps/hipertensao', name: 'Cuidado da Pessoa com Hipertensão Arterial', element: ACuidadoHipertensao, exact: true },
  { path: '/aps/hipertensao/consulta-med-enf', name: 'A. Consultas Hipertensos', element: ACuidadoHipertensao },
  { path: '/aps/hipertensao/reg-afericao-pressao', name: 'B. Aferição Pressão Hipertensos', element: BCuidadoHipertensao }, 
  { path: '/aps/hipertensao/reg-peso-altura', name: 'D. Peso e Altura Hipertensos', element: DCuidadoHipertensao },
  { path: '/aps/hipertensao/visitas-domiciliares', name: 'C. Visitas Domiciliares Hipertensos', element: APSDesenvolvimentoInfantil }, // Placeholder

  // ROTAS PARA CUIDADO INTEGRAL DA PESSOA IDOSA
  { path: '/aps/idosa', name: 'Cuidado da Pessoa Idosa', element: ACuidadoIdoso, exact: true }, // Rota base da Idosa aponta para o primeiro gráfico
  { path: '/aps/idosa/consulta-med-enf', name: 'A. Consultas Idosos', element: ACuidadoIdoso }, // Rota para o gráfico A de idosos
  { path: '/aps/idosa/reg-peso-altura', name: 'B. Peso e Altura Idosos', element: BCuidadoIdoso },
  { path: '/aps/idosa/vacina-influenza', name: 'D. Vacina Influenza Idosos', element: DCuidadoIdoso }, // CORREÇÃO AQUI: Mapeando para o componente DCuidadoIdoso

  { path: '/aps/cancer-mulher', name: 'Cuidado da Mulher na Prevenção do Câncer', element: APSCuidadoCancerMulher },

  // --- ROTAS PARA SAÚDE BUCAL ---
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
  { path: '/emulti/acoes-interprofissionais', element: APSDesenvolvimentoInfantil }, // Placeholder

  // Removendo as rotas de Escola, Servidor de Apoio, Turma, Atipicidade, Aluno Atípico, Lotar
  // (Comentadas como você havia feito antes)
]

export default routes
