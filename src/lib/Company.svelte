<script>
    export let name;
    export let catchPhrase;
    export let employeeCount;
</script>

<div id="companyCard" class="flex flex-col bg-green-500 p-6 border border-gray-200 w-[450px]">
    <div id="title">
        Company name: {name}
    </div>
    <div id="catchPhrase">
        Catch Phrase: {catchPhrase}
    </div>
    <div id="employeeCount">
        Employee Count: {employeeCount}
    </div>
</div>