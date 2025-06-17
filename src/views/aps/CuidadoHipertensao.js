import React from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import AGraficoHipertensos from '../../components/AGraficoHipertensos'; // Ajuste o caminho conforme sua estrutura de pastas

const CuidadoHipertensao = () => {
  // Definindo datas de exemplo para o gráfico (últimos 6 meses até a data atual)
  const dataFinalGrafico = new Date(); // Data atual
  const dataInicialGrafico = new Date();
  dataInicialGrafico.setMonth(dataInicialGrafico.getMonth() - 6); // 6 meses atrás

  // Definindo a altura desejada para o gráfico
  // Reduzindo a altura de 750px para 500px para deixá-lo menor
  const alturaDoGrafico = '400px'; 

  return (
    <CCard>
      <CCardHeader>
        <h2>C.5. Cuidado da Pessoa com Hipertensão Arterial</h2>
      </CCardHeader>
      <CCardBody>
        <p>Esta é a página para exibir os dados e gráficos do indicador "Cuidado da Pessoa com Hipertensão Arterial".</p>
        <p>Aqui você fará as chamadas à sua API para obter os dados relevantes.</p>
        
        {/* Implementação do gráfico de hipertensos dentro de um novo CCard */}
        <CCard className="mb-4"> {/* Adiciona margem inferior */}
          <CCardHeader>
            <h5 className="mb-0">Estatísticas de Consultas de Hipertensos por Período</h5>
          </CCardHeader>
          <CCardBody>
            <div style={{ height: alturaDoGrafico, margin: '20px 0' }}> 
              <AGraficoHipertensos // Usando o componente AGraficoHipertensos
                dataInicial={dataInicialGrafico}
                dataFinal={dataFinalGrafico}
                alturaGrafico={alturaDoGrafico} // Passando a altura como prop
              />
            </div>
          </CCardBody>
        </CCard>

        {/* Exemplo de dados da API: */}
        {/* <p>Média nacional: 58,67% </p> */}
        {/* <p>Total de equipes na classificação "Ótimo": 7.908 (13,8%) </p> */}
      </CCardBody>
    </CCard>
  );
};

export default CuidadoHipertensao;
