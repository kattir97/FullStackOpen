import axios from "axios";

const baseUrl = "http://localhost:3010/persons";

const getAll = async () => {
  const req = await axios.get(baseUrl);
  return req.data;
};

const create = async (newPerson) => {
  const req = await axios.post(baseUrl, newPerson);
  return req.data;
};

const remove = async (id) => {
  const req = await axios.delete(`${baseUrl}/${id}`);
  return req.data;
};

const update = async (id, obj, num) => {
  const req = await axios.put(`${baseUrl}/${id}`, { ...obj, number: num });
  return req.data;
};

export default {
  getAll,
  create,
  remove,
  update,
};
