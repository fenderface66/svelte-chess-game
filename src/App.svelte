<script lang="ts">
  import { onDestroy } from "svelte";
  import { get } from "svelte/store";
  import Board from "./Board.svelte";
  import Piece from "./Piece.svelte";
  import { game, PieceData, Store } from "./stores";

  let board;
  let piece;

  let gameState: Store = {};

  const unsubscribe = game.subscribe((value) => {
    gameState = value;
    const piece = document.querySelector("#test-piece");
    const newPosition = document.querySelector(
      `#${gameState["test-piece"].position}`
    );
    if (newPosition) {
      newPosition.appendChild(piece);
    }
  });
  const startGame = () => {
    Object.keys(gameState).map((key) => {
      const pieceData: PieceData = gameState[key];
      const piece = document.querySelector(`#${pieceData.id}`);
      const startingSquareNode = document.querySelector(
        `#${pieceData.position}`
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
