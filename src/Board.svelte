<script>
  import Row from "./Row.svelte";
</script>

<div class="board">
  <Row rank="1" />
  <Row rank="2" />
  <Row rank="3" />
  <Row rank="4" />
  <Row rank="5" />
  <Row rank="6" />
  <Row rank="7" />
  <Row rank="8" />
</div>

<style>
  .board {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
