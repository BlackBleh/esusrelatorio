// src/components/DGraficoIdosoPorUbs.jsx
import React, { useEffect, useState } from 'react';
import { CChartPie } from '@coreui/react-chartjs';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CSpinner, CCard, CCardHeader, CCardBody } from '@coreui/react'; // Adicionado CCard imports

import api from '../service/api';

Chart.register(...registerables, ChartDataLabels);

// Este componente agora recebe selectedUbsId como uma prop
const DGraficoIdosoPorUbs = ({ dataInicial, dataFinal, alturaGrafico, selectedUbsId }) => {
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: ['Vacinados Influenza', 'Não Vacinados Influenza'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#20c997', '#6f42c1'], // Cores para vacinação influenza
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

    const endpoint = `/api/idosos/estatisticas-vacinacao-influenza-por-ubs`; // NOVO ENDPOINT
    api.get(endpoint, {
      params: {
        dataInicial: dataInicialFormatada,
        dataFinal: dataFinalFormatada,
        coUnidadeSaude: selectedUbsId // PASSA O ID DA UBS AQUI
      }
    })
    .then((res) => {
      const { comCriterio, semCriterio } = res.data; // comCriterio = vacinados, semCriterio = não vacinados
      setDadosGrafico({
        labels: ['Vacinados Influenza', 'Não Vacinados Influenza'],
        datasets: [
          {
            data: [comCriterio, semCriterio],
            backgroundColor: ['#20c997', '#6f42c1'],
          },
        ],
      });
    })
    .catch(err => {
      console.error(`Erro ao carregar estatísticas de vacinação de idosos por UBS:`, err);
      setErro(`Erro ao carregar dados do gráfico de vacinação por UBS.`);
    })
    .finally(() => {
      setCarregando(false);
    });
  }, [dataInicial, dataFinal, alturaGrafico, selectedUbsId]); // selectedUbsId como dependência

  return (
    <CCard className="mb-4"> {/* Envolve o gráfico em um card */}
        <CCardHeader>
            <h5 className="mb-0">D. Estatísticas de Vacinação contra Influenza por UBS</h5>
        </CCardHeader>
        <CCardBody>
            {carregando ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: alturaGrafico, minHeight: '200px' }}>
                <CSpinner color="primary" />
                <span className="ms-2">Carregando gráfico por UBS...</span>
                </div>
            ) : erro ? (
                <div className="text-danger text-center mt-3">{erro}</div>
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
                        text: 'Estatísticas de Idosos Vacinados contra Influenza por UBS',
                        color: 'var(--cui-body-color)',
                        },
                    },
                    }}
                    width={'100%'}
                    height={alturaGrafico}
                />
                </div>
            )}
        </CCardBody>
    </CCard>
  );
};

export default DGraficoIdosoPorUbs;