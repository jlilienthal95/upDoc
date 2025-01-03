<script>
    import { users, companies } from "../lib/store.js";
    import { onMount } from "svelte";
	import { writable } from "svelte/store";
    import Company from "../lib/Company.svelte";
	import { error } from "@sveltejs/kit";
    //fetch JSON containing user data
        //API Endpoint: GET https://jsonplaceholder.typicode.com/users
        //user:
            //company: { company data}
        //use returned data to generate list of company objects
            //use forEach to render company cards from this list

    // const users = writable([]);
    // onMount(() => {
    
    async function fetchUsers() {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            users.set(data);
            return data;

        } catch(error) {
            console.error('unable to fetch users. Error:', error);
            throw error;
        }
    }

    async function getCompanies(){
        try{
            const userData = await fetchUsers();

            const companyData = userData.map((user) => user.company);
            companies.set(companyData); // Update companies store
            return companyData;
    } catch(error){
        console.error('unable to create companies array. Error:', error);
        throw error;
    }
    }
    //grid of all companies - click a company to navigates to /employees for said company
    //company component
        //company name
        //catch phrase
        ///number of employees
</script>

<div class="flex flex-col items-center justify-center bg-black w-screen h-screen">
    <div class="flex flex-col items-center bg-red-400 w-2/3 h-screen">
        <h1>Companies</h1>
        <div id="companyGrid" class="flex flex-wrap w-full justify-center p-6 bg-blue-200">
            {#await getCompanies()}
                <div>Loading companies...</div>
            {:then companyList}
                {#each companyList as company}
                    <Company name={company.name} catchPhrase={company.catchPhrase} employeeCount={1} />
                {/each}
            {:catch error}
                <div>Could not load company list: {error.message}</div>
            {/await}
        </div>
    </div>
</div>
