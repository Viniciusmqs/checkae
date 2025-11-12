import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const getConsultas = async () => {
  const res = await api.get("/consultas");
  return res.data;
};

export const getConsultaById = async (id: string) => {
  const res = await api.get(`/consultas/${id}`);
  return res.data;
};
