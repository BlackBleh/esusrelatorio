
import React, { useEffect, useState } from 'react';
import { CChartPie } from '@coreui/react-chartjs';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CSpinner, CCard, CCardHeader, CCardBody } from '@coreui/react'; // CCard, CCardHeader, CCardBody se o componente for auto-contido

import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../service/api';

Chart.register(...registerables, ChartDataLabels);

const CGraficoIdosoPorUbs = ({ dataInicial, dataFinal, alturaGrafico, selectedUbsId }) => {
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: ['Idosos com Visitas ACS/TACS', 'Idosos sem Visitas ACS/TACS'],
    datasets: [{
      data: [0, 0], // Valores iniciais
      backgroundColor: ['#28a745', '#ffc107'], // Cores: verde para 'com visita', amarelo para 'sem visita'
    }],
  });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Se a UBS não foi selecionada (selectedUbsId é null ou undefined),
    // ou se as datas não estão válidas, não faz a requisição.
    if (!dataInicial || !dataFinal) {
      setErro("Datas inicial e final são necessárias para o gráfico.");
      setCarregando(false);
      return;
    }

    setCarregando(true);
    setErro(null);

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

    const params = {
      dataInicial: dataInicialFormatada,
      dataFinal: dataFinalFormatada,
    };

    // Adiciona coUnidadeSaude apenas se um ID de UBS válido for selecionado
    if (selectedUbsId !== null) {
      params.coUnidadeSaude = selectedUbsId;
    }

    // Endpoint para buscar estatísticas de visitas ACS/TACS para idosos POR UBS
    const endpoint = `/api/idosos/estatisticas-visitas-acs-tacs-idosos-por-ubs`; // <<-- NOVO ENDPOINT PARA IDOSOS POR UBS

    api.get(endpoint, { params })
    .then((res) => {
      // O DTO esperado é PacientesIdososChartDto: { comCriterio, semCriterio, totalIdosos }
      const { comCriterio, semCriterio } = res.data; // Pega os dados relevantes para as fatias do gráfico

      setDadosGrafico({
        labels: ['Idosos com Visitas ACS/TACS', 'Idosos sem Visitas ACS/TACS'],
        datasets: [
          {
            data: [comCriterio, semCriterio],
            backgroundColor: ['#28a745', '#ffc107'],
          },
        ],
      });
      setCarregando(false);
    })
    .catch(err => {
      console.error(`Erro ao carregar estatísticas de visitas ACS/TACS para idosos por UBS (gráfico):`, err);
      setErro(`Erro ao carregar dados do gráfico de idosos por UBS. Detalhes: ${err.message}`);
      setCarregando(false);
    });
  }, [dataInicial, dataFinal, alturaGrafico, selectedUbsId]); // selectedUbsId nas dependências para re-renderizar ao mudar a UBS

  return (
    <CCard className="mb-4">
        <CCardHeader>
            <h5 className="mb-0">C. Estatísticas de Visitas Domiciliares por ACS/TACS (Idosos) por UBS</h5> {/* Título específico */}
        </CCardHeader>
        <CCardBody>
            {carregando ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: alturaGrafico, minHeight: '200px' }}>
                <CSpinner color="primary" />
                <span className="ms-2">Carregando gráfico de idosos por UBS...</span>
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
                            text: 'Estatísticas de Visitas Domiciliares por ACS/TACS (Idosos) por UBS', // Título do gráfico
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

export default CGraficoIdosoPorUbs;