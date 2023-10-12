import axios from "axios";

export async function  fetchVillaInfo() {
    // return axios.get("mongodb+srv://nimblehemant:gw4gPrVGNCTWVF9m@cluster0.kekmg0k.mongodb.net/");
    try {
        const response = await axios.get("http://localhost:3000/villas");
        return response.data;
    } catch (error) {
        // Handle the error, log it, or throw it further.
        console.error("Error fetching villa data:", error);
        throw error; // Optionally re-throw the error for higher-level handling.
    }
}


