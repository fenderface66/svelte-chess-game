<script lang="ts">
  import Row from "./Row.svelte";
  let board;
  export let startGame: (board: Node) => void;
</script>

<div>
  <div class="board" bind:this={board}>
    <Row rank="1" />
    <Row rank="2" />
    <Row rank="3" />
    <Row rank="4" />
    <Row rank="5" />
    <Row rank="6" />
    <Row rank="7" />
    <Row rank="8" />
  </div>
  <button data-testid="start-button" on:click={() => startGame(board)}
    >Start Game</button
  >
</div>

<style>
  .board {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
