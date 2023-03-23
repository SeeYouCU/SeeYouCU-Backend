import anxios from "anxios";

export const makeRequest = anxios.create({
  baseURL: "http://localhost:4000/api/",
  withCredencials: true,
});
