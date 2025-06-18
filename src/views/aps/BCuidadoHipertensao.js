import React from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';
import BGraficoHipertensos from '../../components/BGraficoHipertensos'; // Ajuste o caminho conforme sua estrutura de pastas

const BCuidadoHipertensao = () => {
  // Definindo datas de exemplo para o gráfico (últimos 6 meses até a data atual)
  // O período de 6 meses é para aferição de pressão, conforme o SQL.
  const dataFinalGrafico = new Date(); // Data atual
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setMonth(dataInicialGrafico.getMonth() - 6); // 6 meses atrás

  // Definindo a altura desejada para o gráfico
  const alturaDosGraficos = '500px'; 

  return (
    <CCard>
      <CCardHeader>
        <h2>C.5. Cuidado da Pessoa com Hipertensão Arterial - B. Aferição da Pressão Arterial</h2> {/* Título atualizado */}
      </CCardHeader>
      <CCardBody>
        <p>Este gráfico mostra as estatísticas de registro de aferição da pressão arterial para pessoas hipertensas nos últimos 6 meses.</p> {/* Descrição atualizada */}
        
        {/* Gráfico B: Hipertensos com Registro de Aferição da Pressão Arterial */}
        <CRow>
          <CCol md={12}> {/* Ocupa 12 colunas para o gráfico ficar centralizado em sua própria página */}
            <CCard className="mb-4">
              <CCardHeader>
                <h5 className="mb-0">B. Estatísticas de Aferição da Pressão Arterial de Hipertensos</h5> {/* Título do card do gráfico atualizado */}
              </CCardHeader>
              <CCardBody>
                <div style={{ height: alturaDosGraficos, margin: '20px 0' }}> 
                  <BGraficoHipertensos
                    dataInicial={dataInicialGrafico}
                    dataFinal={dataFinalGrafico}
                    alturaGrafico={alturaDosGraficos}
                  />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default BCuidadoHipertensao;
