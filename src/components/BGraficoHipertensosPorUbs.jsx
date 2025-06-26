// src/components/BGraficoHipertensosPorUbs.jsx
import React, { useEffect, useState } from 'react';
import { CChartPie } from '@coreui/react-chartjs';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CSpinner, CCard, CCardHeader, CCardBody } from '@coreui/react';

import api from '../service/api';

Chart.register(...registerables, ChartDataLabels);

const BGraficoHipertensosPorUbs = ({ dataInicial, dataFinal, alturaGrafico, selectedUbsId }) => {
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: ['Hipertensos com Aferição de Pressão', 'Hipertensos sem Aferição de Pressão'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#20c997', '#fd7e14'], // Exemplo de cores (verde claro para com, laranja escuro para sem)
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

    // Chamar o novo endpoint para estatísticas de AFERIÇÃO DE PRESSÃO POR UBS
    api.get(`/api/hipertensos/estatisticas-afericao-pressao-por-ubs`, {
      params: {
        dataInicial: dataInicialFormatada,
        dataFinal: dataFinalFormatada,
        coUnidadeSaude: selectedUbsId, // Passa o ID da UBS aqui
      },
    })
    .then((res) => {
      const { comConsulta, semConsulta } = res.data; // Reutiliza DTO, 'comConsulta' é 'comAfericao'
      setDadosGrafico({
        labels: ['Hipertensos com Aferição de Pressão', 'Hipertensos sem Aferição de Pressão'],
        datasets: [
          {
            data: [comConsulta, semConsulta],
            backgroundColor: ['#20c997', '#fd7e14'],
          },
        ],
      });
    })
    .catch(err => {
      console.error(`Erro ao carregar estatísticas de aferição de pressão de hipertensos por UBS:`, err);
      setErro(`Erro ao carregar dados do gráfico de aferição de pressão por UBS.`);
    })
    .finally(() => {
      setCarregando(false);
    });
  }, [dataInicial, dataFinal, selectedUbsId, alturaGrafico]); // selectedUbsId como dependência

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h5 className="mb-0">B. Estatísticas de Aferição da Pressão Arterial de Hipertensos por UBS</h5>
      </CCardHeader>
      <CCardBody>
        {carregando ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: alturaGrafico, minHeight: '200px' }}>
            <CSpinner color="primary" />
            <span className="ms-2">Carregando gráfico de aferição de pressão por UBS...</span>
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
                    text: 'Estatísticas de Aferição da Pressão Arterial de Hipertensos por UBS',
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

export default BGraficoHipertensosPorUbs;