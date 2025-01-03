import { writable, get } from "svelte/store";

export const companies = writable([]);

//populate the store with companies data
export async function populateCompanies() {
    if (get(companies).length === 0) {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await res.json();
            const companyData = data.map((user) => user.company);
            companies.set(companyData);
        } catch (error) {
            console.error("Error populating companies store:", error);
            throw error;
        }
    }
}
