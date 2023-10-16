import axios from "axios";

export async function fetchVillaInfo() {
    try {
        const response = await axios.get("http://localhost:3000/villas");
        return response.data;
    } catch (error) {
        console.error("Error fetching villa data:", error);
        throw error;
    }
}


