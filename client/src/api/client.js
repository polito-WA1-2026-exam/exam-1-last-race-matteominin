const BASE_URL = "http://localhost:3001/api/v1";

async function request(path, options) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };
    
    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options?.headers
        }
    }

    try {
        return await fetch(`${BASE_URL}${path}`, config);
    } catch (err) {
        throw new Error(`Network error, try again later`);
    }
}

const client = {
    request
}

export default client;