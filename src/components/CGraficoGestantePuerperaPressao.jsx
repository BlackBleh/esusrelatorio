// src/components/CGraficoGestantePuerperaPressao.jsx
import React, { useEffect, useState } from 'react';
import { CChartPie } from '@coreui/react-chartjs';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CSpinner } from '@coreui/react';

import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../service/api';

Chart.register(...registerables, ChartDataLabels);

const CGraficoGestantePuerperaPressao = ({ dataInicial, dataFinal, alturaGrafico }) => {
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: ['Gestantes com 7+ Registros PA', 'Gestantes sem 7+ Registros PA'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#20c997', '#fd7e14'], // Cores verde-água e laranja
    }],
  });

  const [carregandoGrafico, setCarregandoGrafico] = useState(true);
  const [erroGrafico, setErroGrafico] = useState(null);

  const formataDataParaBackend = (data) => {
    if (!(data instanceof Date) || isNaN(data)) {
        return null;
    }
    const year = data.getFullYear();
    const month = String(data.getMonth() + 1).padStart(2, '0');
    const day = String(data.getDate()).padStart(2, '0');
    const hours = String(data.getHours()).padStart(2, '0');
    const minutes = String(data.getMinutes()).padStart(2, '0');
    const seconds = String(data.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (!dataInicial || !dataFinal) {
      setErroGrafico("Datas inicial e final são necessárias para o gráfico.");
      setCarregandoGrafico(false);
      return;
    }

    setCarregandoGrafico(true);
    setErroGrafico(null);

    const dataInicialFormatada = formataDataParaBackend(dataInicial);
    const dataFinalFormatada = formataDataParaBackend(dataFinal);

    // Endpoint da API para o gráfico de pressão arterial
    api.get(`/api/gestante-puerpera/estatisticas-pressao-arterial`, {
      params: {
        dataInicial: dataInicialFormatada,
        dataFinal: dataFinalFormatada,
      }
    })
    .then((res) => {
      const { comPrevencao, semPrevencao } = res.data; // Reutilizando os nomes do DTO
      setDadosGrafico({
        labels: ['Gestantes com 7+ Registros PA', 'Gestantes sem 7+ Registros PA'],
        datasets: [
          {
            data: [comPrevencao, semPrevencao],
            backgroundColor: ['#20c997', '#fd7e14'],
          },
        ],
      });
    })
    .catch(err => {
      console.error(`Erro ao carregar estatísticas de pressão arterial para o gráfico:`, err);
      setErroGrafico(`Erro ao carregar dados do gráfico de pressão arterial.`);
    })
    .finally(() => {
      setCarregandoGrafico(false);
    });
  }, [dataInicial, dataFinal, alturaGrafico]);

  return (
    <>
      {carregandoGrafico ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: alturaGrafico, minHeight: '200px' }}>
          <CSpinner color="primary" />
          <span className="ms-2">Carregando gráfico...</span>
        </div>
      ) : erroGrafico ? (
        <div className="text-danger text-center mt-3">{erroGrafico}</div>
      ) : (
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
                  text: 'Estatísticas de Registros de Pressão Arterial (7+ em Gestação)',
                  color: 'var(--cui-body-color)',
                },
              },
            }}
            width={'100%'}
            height={alturaGrafico}
          />
        </div>
      )}
    </>
  );
};

export default CGraficoGestantePuerperaPressao;