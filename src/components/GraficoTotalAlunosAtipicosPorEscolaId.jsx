import React, { useEffect, useState } from 'react';
import { CChartBar } from '@coreui/react-chartjs'; // Pode ser CChartBar ou CChartPie
import api from '../service/api'; // Caminho correto para o seu api.js

const GraficoTotalAlunosAtipicosPorEscolaId = ({ escolaId }) => {
  const [chartData, setChartData] = useState({
    labels: ['Total de Alunos Atípicos'], // Rótulo fixo para um único valor
    datasets: [{
      label: 'Número de Alunos',
      backgroundColor: '#36A2EB', // Cor azul padrão para a barra
      data: [0], // Valor inicial
    }],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!escolaId) {
      setError("ID da escola não fornecido para o gráfico de total de alunos.");
      setLoading(false);
      return;
    }

    setLoading(true);
    // Faz a requisição para o novo endpoint filtrado por escolaId
    api.get(`/aluno-atipico/estatisticas/total-alunos-escola/${escolaId}`).then((res) => {
      const { totalAlunosAtipicos } = res.data; // Pega o valor do DTO

      setChartData({
        labels: [`Total na Escola ${escolaId}`], // Rótulo mais específico
        datasets: [
          {
            label: 'Total de Alunos Atípicos',
            backgroundColor: '#36A2EB',
            data: [totalAlunosAtipicos], // O valor único
            barPercentage: 0.5, // Ajuste para a largura da barra
            categoryPercentage: 0.6, // Ajuste para o espaçamento
          },
        ],
      });
      setLoading(false);
    }).catch(err => {
      console.error(`Erro ao carregar total de alunos para a escola ${escolaId}:`, err);
      setError("Erro ao carregar o total de alunos atípicos para esta escola.");
      setLoading(false);
    });
  }, [escolaId]); // Depende do escolaId

  if (loading) {
    return <div>Carregando total de alunos da escola...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <CChartBar // Pode ser CChartPie se preferir, mas o de barra é mais intuitivo para um único número
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
            max: chartData.datasets[0].data[0] > 0 ? chartData.datasets[0].data[0] + 2 : 5, // Ajusta o Y-axis para ser visível
          },
        },
      }}
    />
  );
};

export default GraficoTotalAlunosAtipicosPorEscolaId;
