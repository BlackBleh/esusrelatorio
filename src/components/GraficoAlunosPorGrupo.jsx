import React, { useEffect, useState } from 'react'
import { CChartBar } from '@coreui/react-chartjs' // Importar CChartBar para gráfico de colunas
import api from '../service/api' // Caminho correto para o seu api.js

const GraficoAlunosPorGrupo = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Número de Alunos',
      backgroundColor: '#f87979', // Cor padrão
      data: [],
    }],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true);
    api.get(`/aluno-atipico/estatisticas/alunos-por-grupo`).then((res) => {
      const { comServidorApoio, semServidorNaoNecessita, semServidorNecessita, semServidorImprescindivel } = res.data;

      setChartData({
        labels: [
          'Com Servidor de Apoio',
          'Sem Servidor (Não Necessita)',
          'Sem Servidor (Necessita)',
          'Sem Servidor (Imprescindível)',
        ],
        datasets: [
          {
            label: 'Número de Alunos',
            backgroundColor: [
              '#42A5F5', // Cor para Com Servidor
              '#FFCA28', // Cor para Não Necessita
              '#66BB6A', // Cor para Necessita
              '#EF5350', // Cor para Imprescindível
            ],
            data: [
              comServidorApoio,
              semServidorNaoNecessita,
              semServidorNecessita,
              semServidorImprescindivel,
            ],
            // Ajustes para o gráfico de barras
            barPercentage: 0.7, // Largura das barras
            categoryPercentage: 0.8, // Espaçamento entre categorias
          },
        ],
      });
      setLoading(false);
    }).catch(err => {
      console.error("Erro ao carregar estatísticas de alunos por grupo:", err);
      setError("Erro ao carregar dados do gráfico.");
      setLoading(false);
    });
  }, [])

  if (loading) {
    return <div>Carregando gráfico...</div>;
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
            display: false, // Não mostra a legenda do dataset, pois a label já está na barra
          },
          title: {
            display: true,
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
              callback: function(value) { // Garante que os rótulos do eixo Y sejam inteiros
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

export default GraficoAlunosPorGrupo
