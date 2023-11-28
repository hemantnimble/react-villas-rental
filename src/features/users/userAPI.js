import axios from "axios";

export async function fetchUser() {
    try {
        const response = await axios.get("http://localhost:3000/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}


