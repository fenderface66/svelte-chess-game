<script lang="ts">
  import { game, Store } from "./stores";
  export let rank;
  export let file;

  const squareId = `${file}${rank}`;

  let gameState: Store = {
    activePiece: null,
    pieces: [],
  };

  const backgroundColour =
    (((["a", "c", "e", "g"].includes(file) && rank % 2 !== 0) ||
      (["b", "d", "f", "h"].includes(file) && rank % 2 === 0)) &&
      "black") ||
    "white";

  const handleDragEnter = (e) => {
    console.log(`Entered Square ${squareId}`);
  };

  const handleDragLeave = (e) => {
    console.log(`Leaving Square ${squareId}`);
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    game.update((n) => ({
      ...n,
      pieces: n.pieces.map((piece) => {
        if (piece.id === n.activePiece) {
          console.log("ACTIVE PIECE DROPPED", n.activePiece);
          console.log({ squareId });
          return {
            ...piece,
            position: squareId,
          };
        }
        return piece;
      }),
    }));
    console.log(`Dropped in ${squareId}`);
  };
</script>

<div
  id="{file}{rank}"
  class={backgroundColour === "black" ? "black square" : "white square"}
  on:dragenter={handleDragEnter}
  on:dragleave={handleDragLeave}
  ondragover="return false"
  on:drop={handleDragDrop}
>
  {file}{rank}
</div>

<style>
  .square {
    width: 100px;
    height: 100px;
    border: 1px solid black;
  }

  .black {
    background-color: black;
  }

  .white {
    background-color: white;
  }
</style>
