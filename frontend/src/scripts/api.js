/* =================================
   JP SMART TECH LABS
   API CONFIGURATION
================================= */

// Backend API base URL
const API_BASE_URL = "http://localhost:8000/api/v1";

// Reusable API request function
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            }
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(
                data?.detail || "Something went wrong with the API request."
            );
        }

        return data;

    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
}

// GET request
export function getData(endpoint) {
    return apiRequest(endpoint, {
        method: "GET"
    });
}

// POST request
export function postData(endpoint, payload) {
    return apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}

// PUT request
export function updateData(endpoint, payload) {
    return apiRequest(endpoint, {
        method: "PUT",
        body: JSON.stringify(payload)
    });
}

// DELETE request
export function deleteData(endpoint) {
    return apiRequest(endpoint, {
        method: "DELETE"
    });
}
