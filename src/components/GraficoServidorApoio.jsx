import React, { useEffect, useState } from 'react'
import { CChartPie } from '@coreui/react-chartjs'
import axios from 'axios'
import api from '../service/api'
const GraficoServidorApoio = () => {
  const [data, setData] = useState({ comServidorApoio: 0, semServidorApoio: 0 })

  useEffect(() => {
    api.get(`/aluno-atipico/estatisticas/servidor-apoio`).then((res) => {
      setData(res.data)
      console.log("Renan");
      console.log(res.data);
    })
  }, [])

  return (
    <CChartPie
      data={{
        labels: ['Com Servidor de Apoio', 'Sem Servidor de Apoio'],
        datasets: [
          {
            data: [data.comServidorApoio, data.semServidorApoio],
            backgroundColor: ['#4dc9f6', '#f67019'],
          },
        ],
      }}
    />
  )
}

export default GraficoServidorApoio
