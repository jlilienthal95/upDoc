<script>
    export let name;
    export let catchPhrase;
    export let employeeCount;

</script>

<div id="companyCard" class="flex flex-col">
    <div id="title">
        {name}
    </div>
    <div id="catchPhrase">
        {catchPhrase}
    </div>
    <div id="employeeCount">
        {employeeCount}
    </div>
</div>