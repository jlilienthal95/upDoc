<script>
    import { page } from '$app/stores';
    import { companies, populateCompanies } from "../../lib/store.js";
    import { get } from 'svelte/store';
    import Company from "../../lib/Company.svelte";

    let company = '';
    $: company = $page.url.searchParams.get('company');

    async function companyObj() {
        try {
            // Populate companies if not done already
            await populateCompanies();
            const allCompanies = get(companies);
            const match = allCompanies.find((curr) => curr.name === company);
            if (match) {
                console.log('Match found! curr:', match);
                return match;
            }

            console.log('No match?');
            // Explicitly return null if no match
            return null;
        } catch (error) {
            console.error('Error fetching Company Object. Error:', error);
            throw error;
        }
    }
</script>

<div>
    <div>
        Employees Page
    </div>
    {#if company}
        {#await companyObj()}
            <div>Loading company data...</div>
        {:then currComp}
            {#if currComp}
                <div>
                    <Company
                        bind:name={currComp.name}
                        bind:catchPhrase={currComp.catchPhrase}
                        employeeCount=1 />
                </div>
            {:else}
                <div>No company found matching "{company}"</div>
            {/if}
        {:catch error}
            <div>Error encountered: {error.message}</div>
        {/await}
    {:else}
        <div>No company value provided</div>
    {/if}
</div>
