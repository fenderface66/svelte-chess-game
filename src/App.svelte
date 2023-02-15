<script lang="ts">
  import Board from "./Board.svelte";
  import { onDrag, onDrop } from "./drag&Drop";
</script>

<main>
  <Board />
  <div draggable="true" on:drag={onDrag} on:drop={onDrop} class="test-piece" />
</main>

<style>
  .test-piece {
    width: 20px;
    height: 20px;
    background-color: gray;
    cursor: grab;
  }
</style>
