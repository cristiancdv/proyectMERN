
import instance from "../config/axios";

//CRUD read
export async function get(tabla, id,) {


    if (id) {
        //id

        return await instance.get(`/${tabla}/${id}`, { headers: { "Content-Type": "multipart/form-data" } })
    } else {
        //all
        return await instance.get(`/${tabla}`, { headers: { "Content-Type": "multipart/form-data" } })
    }

}

//CRUD create and update
export function add(data, tabla, id) {

    if (id) {
        //update
        return instance.post(`/${tabla}/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } })
    } else {
        //create
        return instance.post(`/${tabla}`, data, { headers: { "Content-Type": "multipart/form-data" } })
    }
}
//CRUD delete
export function deleted(tabla, id) {
    return instance.delete(`/${tabla}/${id}`, id)
}

//Session 
export function Auth(tabla, data) {
    return instance.post(`/auth/${tabla}`, data,)
}