const API_URL = 'https://dev.strango.me/api';

const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('auth_token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
    }
    return data;
};

export const api = {
    auth: {
        signup: async (email, password) => {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ email, password }),
            });
            return handleResponse(response);
        },
        verify: async (email, otp) => {
            const response = await fetch(`${API_URL}/auth/verify`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ email, otp }),
            });
            return handleResponse(response);
        },
        login: async (email, password) => {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ email, password }),
            });
            return handleResponse(response);
        },
    },
    projects: {
        getAll: async () => {
            const response = await fetch(`${API_URL}/projects`, {
                method: 'GET',
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        getOne: async (id) => {
            const response = await fetch(`${API_URL}/projects/${id}`, {
                method: 'GET',
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        create: async (name, description, data) => {
            const response = await fetch(`${API_URL}/projects`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ name, description, data }),
            });
            return handleResponse(response);
        },
        update: async (id, updates) => {
            const response = await fetch(`${API_URL}/projects/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(updates),
            });
            return handleResponse(response);
        },
        delete: async (id) => {
            const response = await fetch(`${API_URL}/projects/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
    },
    payment: {
        createOrder: async () => {
            const response = await fetch(`${API_URL}/payment/create-order`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({}),
            });
            return handleResponse(response);
        },
        verifyPayment: async (data) => {
            const response = await fetch(`${API_URL}/payment/verify`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },
        deduct: async (tokens) => {
            const response = await fetch(`${API_URL}/payment/deduct`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ tokens }),
            });
            return handleResponse(response);
        },
        getHistory: async () => {
            const response = await fetch(`${API_URL}/payment/history`, {
                method: 'GET',
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
    },
    story: {
        generate: async (storyData) => {
            const response = await fetch(`${API_URL}/generate-story`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(storyData),
            });
            return handleResponse(response);
        },
        generateEnhanced: async (storyData) => {
            const response = await fetch(`${API_URL}/agents/generate-story-enhanced`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(storyData),
            });
            return handleResponse(response);
        },
        enhanceExisting: async (storyData) => {
            const response = await fetch(`${API_URL}/agents/enhance-existing-story`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(storyData),
            });
            return handleResponse(response);
        },
    }
};
