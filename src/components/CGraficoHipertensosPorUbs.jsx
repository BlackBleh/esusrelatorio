// src/components/CGraficoHipertensosPorUbs.jsx
import React, { useEffect, useState } from 'react';
import { CChartPie } from '@coreui/react-chartjs';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CSpinner, CCard, CCardHeader, CCardBody } from '@coreui/react';

import api from '../service/api'; // Ajuste o caminho se necessário

Chart.register(...registerables, ChartDataLabels);

const CGraficoHipertensosPorUbs = ({ dataInicial, dataFinal, alturaGrafico, selectedUbsId }) => {
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: ['Hipertensos com Visitas ACS/TACS', 'Hipertensos sem Visitas ACS/TACS'], // Rótulos específicos para C
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#28a745', '#ffc107'], // Cores específicas para C (verde e laranja)
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

    // ENDPOINT ATUALIZADO PARA O GRÁFICO C POR UBS
    const endpoint = `/api/hipertensos/estatisticas-visitas-acs-tacs-por-ubs`;
    api.get(endpoint, {
      params: {
        dataInicial: dataInicialFormatada,
        dataFinal: dataFinalFormatada,
        coUnidadeSaude: selectedUbsId // Passa o ID da UBS para o backend
      }
    })
    .then((res) => {
      // Assumimos que o DTO do backend para este gráfico tem 'comVisitaAcsTacs' e 'semVisitaAcsTacs'
      const { comVisitaAcsTacs, semVisitaAcsTacs } = res.data;
      setDadosGrafico({
        labels: ['Hipertensos com Visitas ACS/TACS', 'Hipertensos sem Visitas ACS/TACS'],
        datasets: [
          {
            data: [comVisitaAcsTacs, semVisitaAcsTacs],
            backgroundColor: ['#28a745', '#ffc107'],
          },
        ],
      });
      setCarregando(false);
    })
    .catch(err => {
      console.error(`Erro ao carregar estatísticas de visitas ACS/TACS de hipertensos por UBS:`, err);
      setErro(`Erro ao carregar dados do gráfico de visitas ACS/TACS por UBS.`);
    })
    .finally(() => {
      setCarregando(false);
    });
  }, [dataInicial, dataFinal, alturaGrafico, selectedUbsId]); // selectedUbsId nas dependências para re-renderizar ao mudar a UBS

  return (
    <CCard className="mb-4">
        <CCardHeader>
            <h5 className="mb-0">C. Estatísticas de Visitas Domiciliares por ACS/TACS (Hipertensos) por UBS</h5> {/* Título específico para C por UBS */}
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
                                    return label + value + ' (' + percentage + ')';
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Estatísticas de Visitas Domiciliares por ACS/TACS (Hipertensos) por UBS', // Título atualizado
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

export default CGraficoHipertensosPorUbs;