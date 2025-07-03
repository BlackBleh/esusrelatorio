// src/components/CGraficoIdoso.jsx

import React, { useEffect, useState } from 'react';
import { CChartPie } from '@coreui/react-chartjs';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CSpinner } from '@coreui/react';

import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../service/api';

Chart.register(...registerables, ChartDataLabels);

const CGraficoIdoso = ({ dataInicial, dataFinal, alturaGrafico }) => {
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: ['Idosos com Visitas ACS/TACS', 'Idosos sem Visitas ACS/TACS'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#28a745', '#ffc107'],
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

    const params = {
      dataInicial: dataInicialFormatada,
      dataFinal: dataFinalFormatada,
    };

    // ALTERAÇÃO AQUI: Altera o endpoint para /api/idosos/...
    const endpoint = `/api/idosos/estatisticas-visitas-acs-tacs-idosos`; // <<< AQUI É A MUDANÇA
    
    api.get(endpoint, { params })
    .then((res) => {
      const { comCriterio, semCriterio, totalIdosos } = res.data;
      setDadosGrafico({
        labels: ['Idosos com Visitas ACS/TACS', 'Idosos sem Visitas ACS/TACS'],
        datasets: [
          {
            data: [comCriterio, semCriterio],
            backgroundColor: ['#28a745', '#ffc107'],
          },
        ],
      });
    })
    .catch(err => {
      console.error(`Erro ao carregar estatísticas de visitas ACS/TACS para idosos (gráfico):`, err);
      setErroGrafico(`Erro ao carregar dados do gráfico de idosos. Detalhes: ${err.message}`);
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
          <span className="ms-2">Carregando gráfico de idosos (Visitas ACS/TACS)...</span>
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
                  text: 'Estatísticas de Visitas Domiciliares ACS/TACS (Idosos)',
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

export default CGraficoIdoso;