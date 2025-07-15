// src/components/AGraficoEMultiMediaAtendimentoPorPessoa.jsx
import React, { useEffect, useState } from 'react';
import { CChartPie } from '@coreui/react-chartjs';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CSpinner } from '@coreui/react';

import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../service/api';

Chart.register(...registerables, ChartDataLabels);

const AGraficoEMultiMediaAtendimentoPorPessoa = ({ dataInicial, dataFinal, alturaGrafico }) => {
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: ['Média de Atendimentos por Pessoa (%)', 'Diferença para 100%'],
    datasets: [{
      data: [0, 100],
      backgroundColor: ['#007bff', '#6c757d'], // Cores azul e cinza
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
    const dataFinalFormatada = dataFinal ? formataDataParaBackend(dataFinal) : null;

    // Endpoint da API para o gráfico
    api.get(`/api/emulti/estatisticas-media-atendimento-por-pessoa`, {
      params: {
        dataInicial: dataInicialFormatada,
        dataFinal: dataFinalFormatada,
      }
    })
    .then((res) => {
      const { comPrevencao, semPrevencao } = res.data; // comPrevencao é a média escalada, semPrevencao é o complemento
      setDadosGrafico({
        labels: [`Média de Atendimentos por Pessoa: ${res.data.comPrevencao / 10.0} (em 10 possíveis)`, 'Diferença para 10'], // Ajusta label para mostrar a média real
        datasets: [
          {
            data: [comPrevencao, semPrevencao],
            backgroundColor: ['#007bff', '#6c757d'],
          },
        ],
      });
    })
    .catch(err => {
      console.error(`Erro ao carregar estatísticas de média de atendimento por pessoa para o gráfico:`, err);
      setErroGrafico(`Erro ao carregar dados do gráfico de média de atendimento por pessoa.`);
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
                    // Aqui você decide como mostrar o rótulo.
                    // Para uma média, mostrar o valor numérico é mais informativo do que a porcentagem do pie.
                    const dataset = ctx.chart.data.datasets[0];
                    if (ctx.dataIndex === 0) { // Se for a fatia da média
                        return (value / 10.0).toFixed(1); // Retorna a média real
                    }
                    // Para a fatia do complemento, talvez não precise de rótulo ou mostre %.
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
                      if (context.dataIndex === 0) { // Para a fatia da média
                         return `${label} ${value / 10.0} atendimentos`;
                      }
                      const dataset = context.dataset;
                      const total = dataset.data.reduce((sum, dataValue) => sum + dataValue, 0);
                      const percentage = total > 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';
                      return label + percentage;
                    }
                  }
                },
                title: {
                  display: true,
                  text: 'Média de Atendimento da eMulti por Pessoa',
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

export default AGraficoEMultiMediaAtendimentoPorPessoa;