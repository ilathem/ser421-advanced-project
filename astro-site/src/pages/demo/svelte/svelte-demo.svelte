<script lang="js">
  let count = 0
</script>

<h1>Hello from svelte!</h1>
<p>{count}</p>
<button on:click={() => {count += 1}}>Increment</button>