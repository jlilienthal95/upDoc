<script>
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import Company from "../lib/Company.svelte";
    //fetch JSON containing user data
        //API Endpoint: GET https://jsonplaceholder.typicode.com/users
        //user:
            //company: { company data}
        //use returned data to generate list of company objects
            //use forEach to render company cards from this list
    // onMount(() => {
    async function fetchUsers() {
        const users = await fetch("https://jsonplaceholder.typicode.com/users");
        const json = await users.json();
        console.log("json:", json);
        return json;
    }
    // })

    async function getCompanies(){
        const users = await fetchUsers();
        const companies = [];
        users.forEach(user => {
            companies.push(user.company);
        })
        return companies;
    }
    //grid of all companies - click a company to navigates to /employees for said company
    //company component
        //company name
        //catch phrase
        ///number of employees
</script>

<div>
    <div>
        <div id='companyGrid' class="">
            <h1>Companies</h1>
            {#await getCompanies()}
                <div>Loading companies...</div>
            {:then companies}
                {#each companies as company}
                    <Company name={company.name} catchPhrase={company.catchPhrase} employeeCount=1></Company>
                {/each}
            {:catch error}
                <div>Could not load company list.</div>
            {/await}
        </div>    
    </div>    


</div>    
