import React, { useEffect, useState } from 'react';
import { CChartPie } from '@coreui/react-chartjs';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import api from '../service/api'; // Certifique-se de que este caminho está correto para sua instância Axios

Chart.register(...registerables, ChartDataLabels);

const DGraficoIdoso = ({ dataInicial, dataFinal, alturaGrafico }) => {
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: ['Idosos Vacinados Influenza', 'Idosos Não Vacinados Influenza'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#20c997', '#6f42c1'], // Cores para vacinação influenza (verde, roxo)
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

    // Endpoint para estatísticas de vacinação influenza para idosos
    const endpoint = `/api/idosos/estatisticas-vacinacao-influenza`;
    const params = new URLSearchParams({
      dataInicial: dataInicialFormatada,
      dataFinal: dataFinalFormatada,
    }).toString();
    const fullUrlForDebug = `${api.defaults.baseURL}${endpoint}?${params}`;
    console.log("URL da requisição para o backend (Idosos - Vacina Influenza):", fullUrlForDebug);

    api.get(endpoint, {
      params: {
        dataInicial: dataInicialFormatada,
        dataFinal: dataFinalFormatada,
      }
    })
    .then((res) => {
      const { comCriterio, semCriterio, totalIdosos } = res.data; // DTO de idosos
      setDadosGrafico({
        labels: ['Idosos Vacinados Influenza', 'Idosos Não Vacinados Influenza'],
        datasets: [
          {
            data: [comCriterio, semCriterio],
            backgroundColor: ['#20c997', '#6f42c1'], // Cores para vacinação
          },
        ],
      });
      setCarregando(false);
    })
    .catch(err => {
      console.error(`Erro ao carregar estatísticas de idosos (Vacina Influenza):`, err);
      setErro(`Erro ao carregar dados do gráfico de idosos (Vacina Influenza). Verifique a URL: ${fullUrlForDebug} e o console do backend para detalhes.`);
      setCarregando(false);
    });
  }, [dataInicial, dataFinal, alturaGrafico]);

  if (carregando) {
    return <div>Carregando dados do gráfico de idosos (Vacina Influenza)...</div>;
  }

  if (erro) {
    return <div className="text-danger">{erro}</div>;
  }

  return (
    <div style={{ height: alturaGrafico }}>
      <CChartPie
        data={dadosGrafico}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              formatter: (value, ctx) => {
                const dataset = ctx.chart.data.datasets[0];
                const total = dataset.data.reduce((sum, dataValue) => sum + dataValue, 0);
                const percentage = total > 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';
                return percentage;
              },
              color: 'white',
              font: {
                weight: 'bold'
              }
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: 'var(--cui-body-color)'
              }
            },
            tooltip: {
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
              text: 'Estatísticas de Idosos Vacinados contra Influenza', // Título específico
              color: 'var(--cui-body-color)',
            },
          },
        }}
        width={'100%'}
        height={alturaGrafico}
      />
    </div>
  );
};

export default DGraficoIdoso;
