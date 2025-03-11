import { api } from "../uitls/api";

export async function getVets() {
  try {
    const results = await api.get("/vets/get-all-vets");
    console.log("The results:", results);
    console.log("The data results:", results.data);
    return results.data;
  } catch (error) {
    console.error(
      "Error fetching vets:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function findAvailableVets(searchParams) {
  try {
    const queryParams = new URLSearchParams(searchParams);

    const result = await api.get(`/vets/search-vet?${queryParams}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export const getAllSpecializations = async () => {
  try {
    const response = await api.get("/vets/vet/get-all-specialization");
    return response.data;
  } catch (error) {
    throw error;
  }
};
