import React, { useEffect, useState } from 'react';
import { CChartPie } from '@coreui/react-chartjs';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CSpinner, CCard, CCardHeader, CCardBody } from '@coreui/react'; // Adicionado CCard imports

import api from '../service/api'; // Certifique-se de que este caminho está correto para sua instância Axios

Chart.register(...registerables, ChartDataLabels);

// Este componente agora recebe selectedUbsId como uma prop
const DGraficoHipertensosPorUbs = ({ dataInicial, dataFinal, alturaGrafico, selectedUbsId }) => {
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: ['Hipertensos com Peso e Altura Registrados', 'Hipertensos sem Peso e Altura Registrados'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#6f42c1', '#fd7e14'], // Cores para peso e altura (roxo, laranja escuro)
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

    // Endpoint para estatísticas de PESO E ALTURA POR UBS
    const endpoint = `/api/hipertensos/estatisticas-peso-altura-por-ubs`;
    api.get(endpoint, {
      params: {
        dataInicial: dataInicialFormatada,
        dataFinal: dataFinalFormatada,
        coUnidadeSaude: selectedUbsId // PASSA O ID DA UBS AQUI
      }
    })
    .then((res) => {
      const { comConsulta, semConsulta } = res.data; // Reutiliza DTO, 'comConsulta' é 'comRegistro'
      setDadosGrafico({
        labels: ['Hipertensos com Peso e Altura Registrados', 'Hipertensos sem Peso e Altura Registrados'],
        datasets: [
          {
            data: [comConsulta, semConsulta],
            backgroundColor: ['#6f42c1', '#fd7e14'], // Novas cores
          },
        ],
      });
      setCarregando(false);
    })
    .catch(err => {
      console.error(`Erro ao carregar estatísticas de peso/altura de hipertensos por UBS:`, err);
      setErro(`Erro ao carregar dados do gráfico de peso/altura por UBS.`);
    })
    .finally(() => {
      setCarregando(false);
    });
  }, [dataInicial, dataFinal, alturaGrafico, selectedUbsId]); // selectedUbsId como dependência

  return (
    <CCard className="mb-4"> {/* Envolve o gráfico em um card */}
        <CCardHeader>
            <h5 className="mb-0">D. Estatísticas de Peso e Altura de Hipertensos por UBS</h5>
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
                        text: 'Estatísticas de Peso e Altura de Hipertensos por UBS', // Título específico
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

export default DGraficoHipertensosPorUbs;
