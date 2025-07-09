import React from 'react'

// --- NOVAS IMPORTAÇÕES PARA ATENÇÃO PRIMÁRIA À SAÚDE (MANTIDAS) ---
const ADesenvolvimentoInfantil = React.lazy(() => import('./views/aps/ADesenvolvimentoInfantil'))
const BDesenvolvimentoInfantil = React.lazy(() => import('./views/aps/BDesenvolvimentoInfantil'))
const CDesenvolvimentoInfantil = React.lazy(() => import('./views/aps/CDesenvolvimentoInfantil'))
const DDesenvolvimentoInfantil = React.lazy(() => import('./views/aps/DDesenvolvimentoInfantil'))
const EDesenvolvimentoInfantil = React.lazy(() => import('./views/aps/EDesenvolvimentoInfantil'))

// A importação de APSCuidadoGestantePuerpera foi atualizada para ACuidadoGestantePuerpera
const ACuidadoGestantePuerpera = React.lazy(() => import('./views/aps/ACuidadoGestantePuerpera'))
const BGestantePuerpera = React.lazy(() => import('./views/aps/BGestantePuerpera'))
const CGestantePuerpera = React.lazy(() => import('./views/aps/CGestantePuerpera'))
const DGestantePuerpera = React.lazy(() => import('./views/aps/DGestantePuerpera'))
const EGestantePuerpera = React.lazy(() => import('./views/aps/EGestantePuerpera'))
const FGestantePuerpera = React.lazy(() => import('./views/aps/FGestantePuerpera'))


//DIABETES
const ACuidadoDiabetes = React.lazy(() => import('./views/aps/ACuidadoDiabetes'))
const BCuidadoDiabetes = React.lazy(() => import('./views/aps/BCuidadoDiabetes'))
const CCuidadoDiabetes = React.lazy(() => import('./views/aps/CCuidadoDiabetes'))
const DCuidadoDiabetes = React.lazy(() => import('./views/aps/DCuidadoDiabetes'))
const ECuidadoDiabetes = React.lazy(() => import('./views/aps/ECuidadoDiabetes'))
const FCuidadoDiabetes = React.lazy(() => import('./views/aps/FCuidadoDiabetes'))



// IMPORTAÇÕES PARA CUIDADO HIPERTENSAO (AGORA DIVIDIDAS)
const ACuidadoHipertensao = React.lazy(() => import('./views/aps/ACuidadoHipertensao'));
const BCuidadoHipertensao = React.lazy(() => import('./views/aps/BCuidadoHipertensao'));
const CCuidadoHipertensaoHipertensos = React.lazy(() => import('./views/aps/CCuidadoHipertensao'));
const DCuidadoHipertensao = React.lazy(() => import('./views/aps/DCuidadoHipertensao'));

// IMPORTAÇÕES PARA CUIDADO IDOSA
const ACuidadoIdoso = React.lazy(() => import('./views/aps/ACuidadoIdoso'));
const BCuidadoIdoso = React.lazy(() => import('./views/aps/BCuidadoIdoso'));
const CCuidadoIdoso = React.lazy(() => import('./views/aps/CCuidadoIdoso'));
const DCuidadoIdoso = React.lazy(() => import('./views/aps/DCuidadoIdoso'));

// Importações para Cuidado da Mulher para Prevenção do Câncer
const ACuidadoMulherCancer = React.lazy(() => import('./views/aps/ACuidadoMulherCancer'));
const BCuidadoMulherCancer = React.lazy(() => import('./views/aps/BCuidadoMulherCancer'));
const CCuidadoMulherCancer = React.lazy(() => import('./views/aps/CCuidadoMulherCancer'));
const DCuidadoMulherCancer = React.lazy(() => import('./views/aps/DCuidadoMulherCancer'));

// --- NOVAS IMPORTAÇÕES PARA SAÚDE BUCAL (MANTIDAS) ---
const SaudeBucalPrimeiraConsulta = React.lazy(() => import('./views/saudeBucal/PrimeiraConsultaOdontologica'))
const SaudeBucalTratamentoConcluido = React.lazy(() => import('./views/saudeBucal/TratamentoOdontologicoConcluido'))
const SaudeBucalTaxaExodontias = React.lazy(() => import('./views/saudeBucal/TaxaExodontias'))
const SaudeBucalEscovacaoSupervisionada = React.lazy(() => import('./views/saudeBucal/EscovacaoSupervisionada'))
const SaudeBucalProcedimentosPreventivos = React.lazy(() => import('./views/saudeBucal/ProcedimentosPreventivos'))
const SaudeBucalTratamentoRestauradorAtraumatico = React.lazy(() => import('./views/saudeBucal/TratamentoRestauradorAtraumatico'))

const routes = [
  // Rota principal
  { path: '/', exact: true, name: 'Home', element: ADesenvolvimentoInfantil },

  // --- ROTAS PARA ATENÇÃO PRIMÁRIA À SAÚDE ---
  { path: '/aps', name: 'Atenção Primária à Saúde', element: ADesenvolvimentoInfantil, exact: true },
  { path: '/aps/desenvolvimento-infantil/primeira-consulta-med-enf', name: 'A. 1ª Consulta Med/Enf (0-30 dias)', element: ADesenvolvimentoInfantil },
  { path: '/aps/desenvolvimento-infantil/consultas-2-anos', name: 'B. Consultas (0-2 anos)', element: BDesenvolvimentoInfantil },
  { path: '/aps/desenvolvimento-infantil/peso-altura-2-anos', name: 'C. Peso e Altura (0-2 anos)', element: CDesenvolvimentoInfantil },
  { path: '/aps/desenvolvimento-infantil/visitas-acs-tacs', name: 'D. Visitas ACS/TACS', element: DDesenvolvimentoInfantil },
  { path: '/aps/desenvolvimento-infantil/vacinacao-completa', name: 'E. Vacinação Completa', element: EDesenvolvimentoInfantil },

  // ROTAS PARA CUIDADO DA GESTANTE E PUÉRPERA (AJUSTADAS)
  // A rota base '/aps/gestante-puerpera' foi atualizada para ACuidadoGestantePuerpera
  { path: '/aps/gestante-puerpera', name: 'Cuidado da Gestante e Puérpera', element: ACuidadoGestantePuerpera, exact: true },
  { path: '/aps/gestante-puerpera/consulta-prenatal', name: 'A. 1ª Consulta Pré-Natal', element: ACuidadoGestantePuerpera },
  { path: '/aps/gestante-puerpera/consultas-gestacao', name: 'B. 7+ Consultas Pré-Natal', element: BGestantePuerpera },
  { path: '/aps/gestante-puerpera/reg-pressao-arterial', name: 'C. Pressão Arterial', element: CGestantePuerpera },
  { path: '/aps/gestante-puerpera/reg-peso-altura', name: 'D. Peso e Altura', element: DGestantePuerpera },
  { path: '/aps/gestante-puerpera/visitas-domiciliares', name: 'E. Visitas ACS/TACS', element: EGestantePuerpera },
  { path: '/aps/gestante-puerpera/vacina-dtpa', name: 'F. Dose dTpa', element: FGestantePuerpera },



  // ROTAS PARA CUIDADO DA PESSOA COM DIABETES (AJUSTADAS)
  { path: '/aps/diabetes', name: 'Cuidado da Pessoa com Diabetes', element: ACuidadoDiabetes, exact: true },
  { path: '/aps/diabetes/consulta-med-enf', name: 'A. Consultas Médico/Enfermeiro', element: ACuidadoDiabetes },
  { path: '/aps/diabetes/pressao-arterial', name: 'B. Pressão Arterial', element: BCuidadoDiabetes },
  { path: '/aps/diabetes/visitas-domiciliares', name: 'C. Visitas ACS/TACS', element: CCuidadoDiabetes }, // Rota para o Gráfico C de Diabetes
  { path: '/aps/diabetes/peso-altura', name: 'D. Peso e Altura', element: DCuidadoDiabetes },
  { path: '/aps/diabetes/hemoglobina-glicada', name: 'E. Hemoglobina Glicada', element: ECuidadoDiabetes },
  { path: '/aps/diabetes/exame-pe', name: 'F. Exame do Pé', element: FCuidadoDiabetes },




  // ROTAS PARA CUIDADO DA PESSOA COM HIPERTENSAO ARTERIAL
  { path: '/aps/hipertensao', name: 'Cuidado da Pessoa com Hipertensão Arterial', element: ACuidadoHipertensao, exact: true },
  { path: '/aps/hipertensao/consulta-med-enf', name: 'A. Consultas Hipertensos', element: ACuidadoHipertensao },
  { path: '/aps/hipertensao/reg-afericao-pressao', name: 'B. Aferição Pressão Hipertensos', element: BCuidadoHipertensao },
  { path: '/aps/hipertensao/visitas-domiciliares', name: 'C. Visitas Domiciliares Hipertensos', element: CCuidadoHipertensaoHipertensos },
  { path: '/aps/hipertensao/reg-peso-altura', name: 'D. Peso e Altura Hipertensos', element: DCuidadoHipertensao },

  // ROTAS PARA CUIDADO INTEGRAL DA PESSOA IDOSA
  { path: '/aps/idosa', name: 'Cuidado da Pessoa Idosa', element: ACuidadoIdoso, exact: true },
  { path: '/aps/idosa/consulta-med-enf', name: 'A. Consultas Idosos', element: ACuidadoIdoso },
  { path: '/aps/idosa/reg-peso-altura', name: 'B. Peso e Altura Idosos', element: BCuidadoIdoso },
  { path: '/aps/idosa/visitas-domiciliares', name: 'C. Visitas Domiciliares Idosos', element: CCuidadoIdoso },
  { path: '/aps/idosa/vacina-influenza', name: 'D. Vacina Influenza Idosos', element: DCuidadoIdoso },

  // ROTAS PARA CUIDADO DA MULHER NA PREVENÇÃO DO CÂNCER
  { path: '/aps/cancer-mulher/rastreamento-colo-utero', name: 'A. Rastreamento Câncer Colo Útero', element: ACuidadoMulherCancer },
  { path: '/aps/cancer-mulher/vacina-hpv', name: 'B. Vacinação HPV', element: BCuidadoMulherCancer },
  { path: '/aps/cancer-mulher/atendimento-saude-sexual', name: 'C. Atendimento SSR', element: CCuidadoMulherCancer },
  { path: '/aps/cancer-mulher/cancer-mama', name: 'D. Câncer de Mama', element: DCuidadoMulherCancer },

  // --- ROTAS PARA SAÚDE BUCAL ---
  { path: '/saude-bucal', name: 'Saúde Bucal', element: SaudeBucalPrimeiraConsulta, exact: true },
  { path: '/saude-bucal/primeira-consulta', name: '1ª Consulta Odontológica programada na APS', element: SaudeBucalPrimeiraConsulta },
  { path: '/saude-bucal/tratamento-concluido', name: 'Tratamento Odontológico concluído na APS', element: SaudeBucalTratamentoConcluido },
  { path: '/saude-bucal/taxa-exodontias', name: 'Taxa de exodontias na APS', element: SaudeBucalTaxaExodontias },
  { path: '/saude-bucal/escovacao-supervisionada', name: 'Escovação Supervisionada na APS', element: SaudeBucalEscovacaoSupervisionada },
  { path: '/saude-bucal/procedimentos-preventivos', name: 'Procedimentos Odontológicos preventivos na APS', element: SaudeBucalProcedimentosPreventivos },
  { path: '/saude-bucal/tratamento-restaurador-atraumatico', name: 'Tratamento Restaurador Atraumático na APS', element: SaudeBucalTratamentoRestauradorAtraumatico },

  // As rotas de eMulti ainda precisam de componentes
  { path: '/emulti', name: 'eMulti no cuidado integral', element: ADesenvolvimentoInfantil, exact: true },
  { path: '/emulti/media-atendimento-por-pessoa', name: 'Média de atendimento da eMulti por pessoa', element: ADesenvolvimentoInfantil },
  { path: '/emulti/acoes-interprofissionais', element: ADesenvolvimentoInfantil },
]

export default routes;