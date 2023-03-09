<script>
  import { game } from "./stores";
  export let id;
  export let color;

  const onDragPiece = (e) => {
    game.update((n) => ({
      ...n,
      activePiece: id,
    }));
  };
</script>

<div
  {id}
  data-testid={id}
  on:drag={onDragPiece}
  draggable="true"
  class={`piece ${color}`}
/>

<style>
  .piece {
    width: 20px;
    height: 20px;
    cursor: grab;
    border: 1px solid black;
  }
  .white {
    background-color: azure;
  }

  .black {
    background-color: slategray;
  }
</style>
