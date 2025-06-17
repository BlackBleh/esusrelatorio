// src/service/api.js
import axios from 'axios';

const api = axios.create({
  // A URL base da sua API será carregada de uma variável de ambiente (VITE_API_BASE_URL)
  // Certifique-se de que você tem um arquivo .env na raiz do seu projeto Vite com, por exemplo:
  // VITE_API_BASE_URL=http://localhost:8081
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação a cada requisição, se disponível
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Pega o token do localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adiciona o cabeçalho Authorization
  }
  return config;
});

export default api;
