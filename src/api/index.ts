import api from "./apiServices";

const loginApi = (payload: Object) => api.post(`/signin`, payload);
const signupApi = (payload: Object) => api.post(`/signup`, payload);

const Apis = {
     loginApi,
     signupApi
}
export default Apis;