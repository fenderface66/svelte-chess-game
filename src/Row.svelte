<script>
  import Square from "./Square.svelte";
  export let rank;
</script>

<div class="row">
  <Square {rank} file="a" />
  <Square {rank} file="b" />
  <Square {rank} file="c" />
  <Square {rank} file="d" />
  <Square {rank} file="e" />
  <Square {rank} file="f" />
  <Square {rank} file="g" />
  <Square {rank} file="h" />
</div>

<style>
  .row {
    display: flex;
  }
</style>
