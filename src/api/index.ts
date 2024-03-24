import api from "./apiServices";

const loginApi = (payload: Object) => api.post(`/signin`, payload);
const signupApi = (payload: Object) => api.post(`/signup`, payload);
const fetchUser = () => api.get('/fetchuser');
const addDrugApi = (payload:Object)=> api.post(`additem`,payload);
const fetchItems = () => api.get(`/getmydrugs`);
const updatePharmacyItem = (payload:Object) => api.put(`/updateitem`,payload);

const Apis = {
     loginApi,
     signupApi,
     fetchUser,
     addDrugApi,
     fetchItems,
     updatePharmacyItem
}
export default Apis;