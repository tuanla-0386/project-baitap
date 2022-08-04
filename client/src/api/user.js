import axios from "./axios";

export const getListUser = async () => {
    try {
        const response = await axios.get('/users')
        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }
}

export const editUser = async (editForm, id) => {
    try {
        const response = await axios.post(`/update/${id}`, editForm)
        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await axios.get(`/delete/${id}`)
        return response.data
    } catch (error) {
        return { success: 'false', message: error.message }
    }
}
