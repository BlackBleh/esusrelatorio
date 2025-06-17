import React, { useEffect, useState } from 'react';
import { CChartPie } from '@coreui/react-chartjs';
// Importe o Chart e o plugin necessário para registrá-los
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importa o plugin

import api from '../service/api'; // Certifique-se de que este caminho está correto para sua instância Axios

// Registra todos os componentes do Chart.js e o plugin datalabels
Chart.register(...registerables, ChartDataLabels);

const AGraficoHipertensos = ({ dataInicial, dataFinal, alturaGrafico }) => { // Recebendo a nova prop alturaGrafico
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: ['Hipertensos com Consulta', 'Hipertensos sem Consulta'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#4dc9f6', '#f67019'],
    }],
  });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!dataInicial || !dataFinal) {
      setErro("Datas inicial e final são necessárias para o gráfico.");
      setCarregando(false);
      return;
    }

    setCarregando(true);
    setErro(null);

    const formataDataParaBackend = (data) => {
      const year = data.getFullYear();
      const month = String(data.getMonth() + 1).padStart(2, '0');
      const day = String(data.getDate()).padStart(2, '0');
      const hours = String(data.getHours()).padStart(2, '0');
      const minutes = String(data.getMinutes()).padStart(2, '0');
      const seconds = String(data.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    const dataInicialFormatada = formataDataParaBackend(dataInicial);
    const dataFinalFormatada = formataDataParaBackend(dataFinal);

    const endpoint = `/api/hipertensos/estatisticas-consulta`;
    const params = new URLSearchParams({
      dataInicial: dataInicialFormatada,
      dataFinal: dataFinalFormatada,
    }).toString();
    const fullUrlForDebug = `${api.defaults.baseURL}${endpoint}?${params}`;
    console.log("URL da requisição para o backend:", fullUrlForDebug);

    api.get(endpoint, {
      params: {
        dataInicial: dataInicialFormatada,
        dataFinal: dataFinalFormatada,
      }
    })
    .then((res) => {
      const { comConsulta, semConsulta, totalHipertensos } = res.data; // Pega o total também do DTO
      setDadosGrafico({
        labels: ['Hipertensos com Consulta', 'Hipertensos sem Consulta'],
        datasets: [
          {
            data: [comConsulta, semConsulta],
            backgroundColor: ['#4dc9f6', '#f67019'],
          },
        ],
      });
      setCarregando(false);
    })
    .catch(err => {
      console.error(`Erro ao carregar estatísticas de hipertensos:`, err);
      setErro(`Erro ao carregar dados do gráfico de hipertensos. Verifique a URL: ${fullUrlForDebug} e o console do backend para detalhes.`);
      setCarregando(false);
    });
  }, [dataInicial, dataFinal, alturaGrafico]); // Adicione alturaGrafico às dependências do useEffect

  if (carregando) {
    return <div>Carregando dados do gráfico...</div>;
  }

  if (erro) {
    return <div className="text-danger">{erro}</div>;
  }

  return (
    // Envolvendo CChartPie em um div com a altura vinda da prop
    // Removido 'position: relative' e 'width: 100%' para simplicidade,
    // já que o height é o foco e o pai já deve gerenciar largura.
    <div style={{ height: alturaGrafico }}> 
      <CChartPie
        data={dadosGrafico}
        options={{
          responsive: true,
          maintainAspectRatio: false, // Continua FALSE para permitir o redimensionamento pelo pai
          plugins: {
            datalabels: { // Configuração do plugin datalabels
              formatter: (value, ctx) => {
                const dataset = ctx.chart.data.datasets[0];
                const total = dataset.data.reduce((sum, dataValue) => sum + dataValue, 0);
                const percentage = total > 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';
                return percentage;
              },
              color: 'white', // Cor do texto do rótulo
              font: {
                weight: 'bold' // Deixa o texto em negrito
              }
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: 'var(--cui-body-color)'
              }
            },
            tooltip: { // Configuração do tooltip para exibir porcentagem
              callbacks: {
                label: function(context) {
                  let label = context.label || '';
                  if (label) {
                    label += ': ';
                  }
                  const value = context.parsed;
                  const dataset = context.dataset;
                  const total = dataset.data.reduce((sum, dataValue) => sum + dataValue, 0);
                  const percentage = total > 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';
                  return label + percentage;
                }
              }
            },
            title: {
              display: true,
              text: 'Estatísticas de Consultas de Hipertensos',
              color: 'var(--cui-body-color)',
            },
          },
        }}
        // ADICIONADO: Força o width e height no próprio componente CChartPie
        width={'100%'} // Garante que o gráfico preencha a largura disponível
        height={alturaGrafico} // Passa a altura exata do div pai para o CChartPie
      />
    </div>
  );
};

export default AGraficoHipertensos;
