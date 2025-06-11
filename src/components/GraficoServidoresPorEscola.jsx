import React, { useEffect, useState } from 'react'
import { CChartBar } from '@coreui/react-chartjs' // Importar CChartBar
import api from '../service/api' // Caminho correto para o seu api.js

// Função auxiliar para gerar uma cor RGB aleatória
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 0.8)`; // 0.8 para um pouco de transparência
};

const GraficoServidoresPorEscola = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Número de Servidores',
      backgroundColor: [], // Vai ser preenchido com cores aleatórias
      data: [],
    }],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true);
    api.get(`/lotacao/estatisticas/servidores-por-escola`).then((res) => {
      const labels = res.data.map(item => item.nomeEscola);
      const dataValues = res.data.map(item => item.quantidadeServidores);
      
      // MUDANÇA AQUI: Gerar cores aleatórias para cada barra
      const newBackgroundColors = dataValues.map(() => getRandomColor());

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Servidores de Apoio por Escola',
            backgroundColor: newBackgroundColors, // Cores aleatórias
            data: dataValues,
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
        ],
      });
      setLoading(false);
    }).catch(err => {
      console.error("Erro ao carregar estatísticas de servidores por escola:", err);
      setError("Erro ao carregar dados do gráfico de servidores por escola.");
      setLoading(false);
    });
  }, [])

  if (loading) {
    return <div>Carregando gráfico de servidores por escola...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <CChartBar
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Servidores de Apoio por Escola (Lotações Ativas)',
            color: 'var(--cui-body-color)', // Adapta a cor do título ao tema
          },
        },
        scales: {
          x: {
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              color: 'var(--cui-body-color)', // Adapta a cor dos rótulos do eixo X ao tema
            },
          },
          y: {
            ticks: {
              beginAtZero: true,
              color: 'var(--cui-body-color)', // Adapta a cor dos rótulos do eixo Y ao tema
              callback: function(value) {
                if (Number.isInteger(value)) {
                  return value;
                }
                return null;
              },
            },
          },
        },
      }}
    />
  )
}

export default GraficoServidoresPorEscola
