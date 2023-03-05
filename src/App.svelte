<script lang="ts">
  import { onDestroy } from "svelte";
  import { get } from "svelte/store";
  import Board from "./Board.svelte";
  import Piece from "./Piece.svelte";
  import { game, PieceData, Store } from "./stores";

  let board;
  let piece;

  let gameState: Store = {};

  const unsubscribe = game.subscribe((value) => (gameState = value));
  const startGame = () => {
    Object.keys(gameState).map((key) => {
      const pieceData: PieceData = gameState[key];
      const piece = document.querySelector(`#${pieceData.id}`);
      const startingSquareNode = document.querySelector(
        `#${pieceData.startingPosition}`
      );
      startingSquareNode.appendChild(piece);
    });
  };

  console.log(gameState);
  onDestroy(unsubscribe);
</script>

<main>
  <Board {startGame} />
  <Piece />
</main>
