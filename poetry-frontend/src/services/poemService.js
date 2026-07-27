import api from "../api/axios";

export async function getPoems() {
    const response = await api.get("/poems");
    return response.data;
}

export async function getPoem(slug) {
    const response = await api.get(`/poems/${slug}`);
    return response.data;
}

export async function getPoemById(id) {
    const response = await api.get(`/admin/poems/${id}`);
    return response.data;
}

export async function createPoem(poem) {
    const response = await api.post("/admin/poems", poem);
    return response.data;
}

export async function updatePoem(id, poem) {
    const response = await api.put(`/admin/poems/${id}`, poem);
    return response.data;
}
export async function getAdminPoems(page = 0) {

    const response = await api.get("/admin/poems", {
        params: {
            page,
            size: 10
        }
    });

    return response.data.content;
}
export async function deletePoem(id) {
    await api.delete(`/admin/poems/${id}`);
}