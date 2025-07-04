import React from 'react'

// --- NOVAS IMPORTAÇÕES PARA ATENÇÃO PRIMÁRIA À SAÚDE (MANTIDAS) ---
const APSDesenvolvimentoInfantil = React.lazy(() => import('./views/aps/DesenvolvimentoInfantil'))
const APSCuidadoGestantePuerpera = React.lazy(() => import('./views/aps/CuidadoGestantePuerpera'))
const APSCuidadoDiabetes = React.lazy(() => import('./views/aps/CuidadoDiabetes'))

// IMPORTAÇÕES PARA CUIDADO HIPERTENSAO (AGORA DIVIDIDAS)
const ACuidadoHipertensao = React.lazy(() => import('./views/aps/ACuidadoHipertensao')); // Componente A (Consultas)
const BCuidadoHipertensao = React.lazy(() => import('./views/aps/BCuidadoHipertensao')); // Componente B (Aferição Pressão)
const CCuidadoHipertensaoHipertensos = React.lazy(() => import('./views/aps/CCuidadoHipertensao')); // RENOMEADO para evitar conflito com o novo CCuidadoIdoso
const DCuidadoHipertensao = React.lazy(() => import('./views/aps/DCuidadoHipertensao')); // Componente D (Peso e Altura)

// IMPORTAÇÕES PARA CUIDADO IDOSA
const ACuidadoIdoso = React.lazy(() => import('./views/aps/ACuidadoIdoso')); // Componente para o gráfico A de Idosos
const BCuidadoIdoso = React.lazy(() => import('./views/aps/BCuidadoIdoso')); // Componente para o gráfico B de Idosos
const CCuidadoIdoso = React.lazy(() => import('./views/aps/CCuidadoIdoso')); // NOVO COMPONENTE IDOSO C
const DCuidadoIdoso = React.lazy(() => import('./views/aps/DCuidadoIdoso')); // Componente para o gráfico D de Idosos

// >>> NOVA IMPORTAÇÃO: Cuidado da Mulher para Prevenção do Câncer <<<
const ACuidadoMulherCancer = React.lazy(() => import('./views/aps/ACuidadoMulherCancer'));
const BCuidadoMulherCancer = React.lazy(() => import('./views/aps/BCuidadoMulherCancer'));
const CCuidadoMulherCancer = React.lazy(() => import('./views/aps/CCuidadoMulherCancer'));

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
  { path: '/aps/hipertensao/visitas-domiciliares', name: 'C. Visitas Domiciliares Hipertensos', element: CCuidadoHipertensaoHipertensos },
  { path: '/aps/hipertensao/reg-peso-altura', name: 'D. Peso e Altura Hipertensos', element: DCuidadoHipertensao },

  // ROTAS PARA CUIDADO INTEGRAL DA PESSOA IDOSA
  { path: '/aps/idosa', name: 'Cuidado da Pessoa Idosa', element: ACuidadoIdoso, exact: true }, // Rota base da Idosa aponta para o primeiro gráfico
  { path: '/aps/idosa/consulta-med-enf', name: 'A. Consultas Idosos', element: ACuidadoIdoso }, // Rota para o gráfico A de idosos
  { path: '/aps/idosa/reg-peso-altura', name: 'B. Peso e Altura Idosos', element: BCuidadoIdoso },
  { path: '/aps/idosa/visitas-domiciliares', name: 'C. Visitas Domiciliares Idosos', element: CCuidadoIdoso },
  { path: '/aps/idosa/vacina-influenza', name: 'D. Vacina Influenza Idosos', element: DCuidadoIdoso },

  // >>> NOVA ROTA: Cuidado da Mulher na Prevenção do Câncer <<<
  { path: '/aps/cancer-mulher/rastreamento-colo-utero', name: 'Rastreamento Câncer Colo Útero', element: ACuidadoMulherCancer },
  { path: '/aps/cancer-mulher/vacina-hpv', name: 'B. Vacinação HPV', element: BCuidadoMulherCancer },
  { path: '/aps/cancer-mulher/atendimento-saude-sexual', name: 'C. Atendimento SSR', element: CCuidadoMulherCancer },
  
  
  
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
]

export default routes;