import axios from "axios";


const API = axios.create({
    baseURL: "https://pineleaflaravel.sunmence.com.ng"
})




export const fetchAllProperty = ()=>API.get(`/public/api/properties`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
export const fetchEachUser = ()=> API.get(`/public/api/user`, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
export const fetchAllUser = ()=> API.get(`public/api/admin/allusers`)
export const fetchSearchUser = ()=> API.get(`public/api/admin/users/search?enabled=1`)
export const createUser = (data:object)=> API.post(`/public/api/realtor/register`, data)
export const loginUSer = (data:object)=> API.post(`/public/api/realtor/login`, data)
export const logoutUser = (data:object)=> API.post(`public/api/realtor/logout`, data)
export const deleteUser = (user_id:number)=> API.delete(`public/api/admin/deleteuser/${user_id}`)

export const fetchSearchProperty = ()=>API.get(`/public/api/properties/search`)
export const fetchEachProperty = (user_id:number, token:string)=> API.get(`/public/api/properties/${user_id}`, {headers: {Authorization: `Bearer ${token}`}})

export const fetchActivityLog = (user_id:number)=> API.get(`/public/api/activity-logs/user/${user_id}`,{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
export const fetchNotification = (user_id:number)=> API.get(`/public/api/notification/user/${user_id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
export const updateProfile = (data:object)=> API.post(`public/api/profile/update`, data, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})

export const fetchLatestProperty = ()=> API.get(`public/api/admin/latest-properties`)
export const updateProperty = (user_id:object)=> API.put(`public/properties/${user_id}`)
export const createProperty = (data:object)=> API.post(`/public/api/properties/create`, data)
export const fetchManualPurchase = ()=> API.get(`/public/api/manual-purchase-info`)
export const fetchTransaction = ()=> API.get(`public/api/admin/transactions`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
export const fetchPurchase = ()=> API.get(`public/api/admin/purchase`)
export const fetchReferral = ()=> API.get(`public/api/admin/referrals?level=2`)
export const deleteProperty = (user_id:number)=> API.delete(`public/api/admin/properties/${user_id}`)


export const fetchAllSubscriber = ()=> API.get(`public/api/subscribers`)
export const fetchEachSubscriber = (user_id:number)=> API.get(`public/api/subscribers/${user_id}`)
export const deleteEachSubscriber = (user_id:number)=> API.delete(`public/api/subscribers/${user_id}`)
export const subscriber = (data:object)=> API.post(`public/api/subscribers`, data)

export const fetchAllContact = ()=> API.get(`public/api/contacts`)
export const fetchEachContact = (user_id:number)=> API.get(`public/api/contacts/${user_id}`)
export const deleteEachContact = (user_id:number)=> API.delete(`public/api/contacts/${user_id}`)
export const contactUs = (data:object)=> API.post(`public/api/contacts`, data)

export const fetchAllTestimonial = ()=> API.get(`public/api/testimonials`)
export const fetchEachTestimonial = (user_id:number)=> API.get(`public/api/testimonials/${user_id}`)
export const deleteEachTestimonial = (user_id:number)=> API.delete(`public/api/testimonials/${user_id}`)
export const createTestimonial = (data:object)=> API.post(`public/api/testimonials`, data)

export const fetchAllGallery = ()=> API.get(`public/api/gallery`)
export const fetchAllGalleryType = ()=> API.get(`public/api/gallery/type`)
export const fetchGallerySearch = ()=> API.get(`public/api/gallery?type=award`)
export const fetchEachGallery = (user_id:number)=> API.get(`public/api/gallery/${user_id}`)
export const deleteEachGallery = (user_id:number)=> API.delete(`public/api/gallery/${user_id}`)
export const createGallery = (data:object)=> API.post(`public/api/gallery`, data)

// export const fetchAllLocation = ()=> API.get(`public/api/locations`)
export const fetchEachLocation = (user_id:number)=> API.get(`public/api/location/${user_id}`)
// export const deleteEachLocation = (user_id:number)=> API.delete(`public/api/locations/${user_id}`)
export const createLocation = (data:object)=> API.post(`public/api/locations`, data)

export const purchase = (data:object)=> API.post(`/public/api/purchase`, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
export const installmentPayment = (data:object)=> API.post(`/public/api/installment`, data)
export const withdraw = (data:object)=> API.post(`/public/api/withdraw`, data, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
export const withdrawConfirmation = (data:object)=> API.post(`/public/api/withdraw/confirm`, data)
export const verifyManualRegistration = (data:object)=> API.post(`/public/api/manual/verify`, data)
export const verifyManualLandPurchase = (data:object)=> API.post(`/public/api/manual-confirm-payment`, data)
export const verifyManualInstallmentPayment = (data:object)=> API.post(`/public/api/manual-confirm-installment`, data)