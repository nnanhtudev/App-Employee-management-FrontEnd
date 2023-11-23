import axios from "../config/axios";

const createRoles = (roleData) => {
  return axios.post(`/v1/role/create`, [...roleData]);
};

export { createRoles };
