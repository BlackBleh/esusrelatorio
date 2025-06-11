import React, { useEffect, useState } from 'react'
import { CChartBar } from '@coreui/react-chartjs' // Importar CChartBar para gráfico de colunas
import api from '../service/api' // Caminho correto para o seu api.js

const GraficoAlunosPorGrupoPorEscolaId = ({ escolaId }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Número de Alunos',
      backgroundColor: [], // Cores dinâmicas
      data: [],
    }],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!escolaId) {
      setError("ID da escola não fornecido para o gráfico de grupos.");
      setLoading(false);
      return;
    }

    setLoading(true);
    // Faz a requisição para o novo endpoint filtrado por escolaId
    api.get(`/aluno-atipico/estatisticas/alunos-por-grupo/escola/${escolaId}`).then((res) => {
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
              '#42A5F5', // Azul para Com Servidor
              '#FFCA28', // Amarelo para Não Necessita
              '#66BB6A', // Verde para Necessita
              '#EF5350', // Vermelho para Imprescindível
            ],
            data: [
              comServidorApoio,
              semServidorNaoNecessita,
              semServidorNecessita,
              semServidorImprescindivel,
            ],
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
        ],
      });
      setLoading(false);
    }).catch(err => {
      console.error(`Erro ao carregar estatísticas de alunos por grupo para a escola ${escolaId}:`, err);
      setError("Erro ao carregar dados do gráfico de alunos por grupo.");
      setLoading(false);
    });
  }, [escolaId]); // Depende do escolaId para recarregar se o ID da URL mudar

  if (loading) {
    return <div>Carregando gráfico de grupos da escola...</div>;
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
            display: false, // Não mostra a legenda do dataset
          },
          title: {
            display: true,
            color: 'var(--cui-body-color)',
          },
        },
        scales: {
          x: {
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              color: 'var(--cui-body-color)',
            },
          },
          y: {
            ticks: {
              beginAtZero: true,
              color: 'var(--cui-body-color)',
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

export default GraficoAlunosPorGrupoPorEscolaId
