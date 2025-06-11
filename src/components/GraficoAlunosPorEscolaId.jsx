import React, { useEffect, useState } from 'react'
import { CChartPie } from '@coreui/react-chartjs' // Pode ser CChartBar ou CChartPie
import api from '../service/api' // Caminho correto para o seu api.js

const GraficoAlunosPorEscolaId = ({ escolaId }) => {
  const [chartData, setChartData] = useState({
    labels: ['Com Servidor de Apoio', 'Sem Servidor de Apoio'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#4dc9f6', '#f67019'],
    }],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!escolaId) {
      setError("ID da escola não fornecido para o gráfico.");
      setLoading(false);
      return;
    }

    setLoading(true);
    // Faz a requisição para o novo endpoint filtrado por escolaId
    api.get(`/aluno-atipico/estatisticas/servidor-apoio/escola/${escolaId}`).then((res) => {
      const { comServidorApoio, semServidorApoio } = res.data;
      setChartData({
        labels: ['Com Servidor de Apoio', 'Sem Servidor de Apoio'],
        datasets: [
          {
            data: [comServidorApoio, semServidorApoio],
            backgroundColor: ['#4dc9f6', '#f67019'],
          },
        ],
      });
      setLoading(false);
    }).catch(err => {
      console.error(`Erro ao carregar estatísticas para a escola ${escolaId}:`, err);
      setError("Erro ao carregar dados do gráfico para esta escola.");
      setLoading(false);
    });
  }, [escolaId]); // O useEffect será re-executado se o escolaId mudar

  if (loading) {
    return <div>Carregando dados do gráfico da escola...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <CChartPie // Ou CChartBar, dependendo da sua preferência
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false, // Pode ser false para mais controle de tamanho
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: 'var(--cui-body-color)' // Ajusta a cor da legenda para o tema
            }
          },
          title: {
            display: true,
            color: 'var(--cui-body-color)', // Adapta a cor do título ao tema
          },
        },
        // Adicionando padding para evitar que o gráfico fique muito na borda
        
      }}
    />
  );
};

export default GraficoAlunosPorEscolaId;
