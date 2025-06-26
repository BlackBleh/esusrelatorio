// src/components/AGraficoIdosoPorUbs.jsx
import React, { useEffect, useState } from 'react';
import { CChartPie } from '@coreui/react-chartjs';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CSpinner, CCard, CCardHeader, CCardBody } from '@coreui/react';

import api from '../service/api';

Chart.register(...registerables, ChartDataLabels);

const AGraficoIdosoPorUbs = ({ dataInicial, dataFinal, alturaGrafico, selectedUbsId }) => {
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: ['Idosos com Consulta', 'Idosos sem Consulta'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#28a745', '#dc3545'], // Exemplo de cores (verde para com, vermelho para sem)
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

    const dataInicialFormatada = formataDataParaBackend(dataInicial);
    const dataFinalFormatada = formataDataParaBackend(dataFinal);

    // Chamar o novo endpoint para estatísticas por UBS (Categoria A)
    api.get(`/api/idosos/estatisticas-consulta-med-enf-por-ubs`, {
      params: {
        dataInicial: dataInicialFormatada,
        dataFinal: dataFinalFormatada,
        coUnidadeSaude: selectedUbsId, // Passa o ID da UBS aqui
      },
    })
    .then((res) => {
      const { comCriterio, semCriterio } = res.data; // comCriterio = com consulta, semCriterio = sem consulta
      setDadosGrafico({
        labels: ['Idosos com Consulta', 'Idosos sem Consulta'],
        datasets: [
          {
            data: [comCriterio, semCriterio],
            backgroundColor: ['#28a745', '#dc3545'],
          },
        ],
      });
    })
    .catch(err => {
      console.error(`Erro ao carregar estatísticas de consulta de idosos por UBS:`, err);
      setErro(`Erro ao carregar dados do gráfico de consulta por UBS.`);
    })
    .finally(() => {
      setCarregando(false);
    });
  }, [dataInicial, dataFinal, selectedUbsId, alturaGrafico]); // Adicionado selectedUbsId às dependências

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h5 className="mb-0">A. Estatísticas de Idosos com Consulta Méd/Enf por UBS</h5>
      </CCardHeader>
      <CCardBody>
        {carregando ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: alturaGrafico, minHeight: '200px' }}>
            <CSpinner color="primary" />
            <span className="ms-2">Carregando gráfico de consulta por UBS...</span>
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
                      weight: 'bold',
                    },
                  },
                  legend: {
                    display: true,
                    position: 'top',
                    labels: {
                      color: 'var(--cui-body-color)',
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        let label = context.label || '';
                        if (label) {
                          label += ': ';
                        }
                        const value = context.parsed;
                        const dataset = context.dataset;
                        const total = dataset.data.reduce((sum, dataValue) => sum + dataValue, 0);
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';
                        return label + value + ' (' + percentage + ')';
                      },
                    },
                  },
                  title: {
                    display: true,
                    text: 'Estatísticas de Idosos com Consulta Méd/Enf por UBS',
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

export default AGraficoIdosoPorUbs;