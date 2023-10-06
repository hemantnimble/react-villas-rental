import axios from "axios";

export function fetchVillaInfo() {
    return axios.get("http://localhost:8080/villas");
}

