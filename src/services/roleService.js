import axios from "../config/axios";

const createRoles = (roleData) => {
  return axios.post(`/v1/role/create`, [...roleData]);
};

const getAllRole = () => {
  return axios.get(`/v1/role/read`);
};

const deleteRole = (role) => {
  return axios.delete(`/v1/role/delete`, { data: { id: role.id } });
};

export { createRoles, deleteRole, getAllRole };
