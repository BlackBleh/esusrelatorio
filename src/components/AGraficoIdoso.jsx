import React, { useEffect, useState } from 'react';
import { CChartPie } from '@coreui/react-chartjs';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import api from '../service/api';

Chart.register(...registerables, ChartDataLabels);

const AGraficoIdoso = ({ dataInicial, dataFinal, alturaGrafico }) => {
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: ['Idosos com Consulta Méd/Enf', 'Idosos sem Consulta Méd/Enf'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#4bc0c0', '#ff9f40'],
    }],
  });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  console.log("AGraficoIdoso: Componente renderizado"); // Log 1: Confirma que o componente é renderizado

  useEffect(() => {
    console.log("AGraficoIdoso: useEffect acionado"); // Log 2: Confirma que o useEffect é acionado

    if (!dataInicial || !dataFinal) {
      console.log("AGraficoIdoso: Datas iniciais ou finais não fornecidas."); // Log 3: Verifica se as datas estão presentes
      setErro("Datas inicial e final são necessárias para o gráfico.");
      setCarregando(false);
      return;
    }

    setCarregando(true);
    setErro(null);

    // Formatação de data mais robusta para LocalDateTime no backend
    const formataDataParaBackend = (data) => {
      // Garante que os componentes de data e hora tenham dois dígitos
      const year = data.getFullYear();
      const month = String(data.getMonth() + 1).padStart(2, '0');
      const day = String(data.getDate()).padStart(2, '0');
      const hours = String(data.getHours()).padStart(2, '0');
      const minutes = String(data.getMinutes()).padStart(2, '0');
      const seconds = String(data.getSeconds()).padStart(2, '0');
      // Retorna no formato 'YYYY-MM-DDTHH:mm:ss'
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    const dataInicialFormatada = formataDataParaBackend(dataInicial);
    const dataFinalFormatada = formataDataParaBackend(dataFinal);

    console.log("AGraficoIdoso: Datas formatadas para backend:", dataInicialFormatada, dataFinalFormatada); // Log 4: Mostra as datas formatadas
    console.log("AGraficoIdoso: Base URL do Axios:", api.defaults.baseURL); // Log 5: Mostra a URL base do Axios

    const endpoint = `/api/idosos/estatisticas-consulta-med-enf`;
    const params = new URLSearchParams({
      dataInicial: dataInicialFormatada,
      dataFinal: dataFinalFormatada,
    }).toString();
    const fullUrlForDebug = `${api.defaults.baseURL}${endpoint}?${params}`;
    console.log("AGraficoIdoso: URL COMPLETA da requisição para o backend:", fullUrlForDebug); // Log 6: URL completa da requisição

    api.get(endpoint, {
      params: {
        dataInicial: dataInicialFormatada,
        dataFinal: dataFinalFormatada,
      }
    })
    .then((res) => {
      console.log("AGraficoIdoso: Dados recebidos do backend:", res.data); // Log 7: Sucesso na requisição
      const { comCriterio, semCriterio, totalIdosos } = res.data;
      setDadosGrafico({
        labels: ['Idosos com Consulta Méd/Enf', 'Idosos sem Consulta Méd/Enf'],
        datasets: [
          {
            data: [comCriterio, semCriterio],
            backgroundColor: ['#4bc0c0', '#ff9f40'],
          },
        ],
      });
      setCarregando(false);
    })
    .catch(err => {
      console.error(`AGraficoIdoso: Erro ao carregar estatísticas de idosos:`, err); // Log 8: Erro na requisição
      setErro(`Erro ao carregar dados do gráfico de idosos. Verifique a URL: ${fullUrlForDebug} e o console do backend para detalhes.`);
      setCarregando(false);
    });
  }, [dataInicial, dataFinal, alturaGrafico]); // Adicione alturaGrafico às dependências do useEffect

  if (carregando) {
    return <div>Carregando dados do gráfico de idosos (Consulta Méd/Enf)...</div>;
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
              text: 'Estatísticas de Idosos com Consulta Méd/Enf',
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

export default AGraficoIdoso;
