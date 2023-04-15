<script lang="ts">
  import { onDestroy } from "svelte";
  import { get } from "svelte/store";
  import Board from "./Board.svelte";
  import Piece from "./Piece.svelte";
  import { game, gameData, PieceData, Store } from "./stores";

  let board;
  let piece;

  let gameState: Store = {
    activePiece: null,
    pieces: [],
  };

  const unsubscribe = game.subscribe((value) => {
    gameState = value;
    if (!!gameState.activePiece) {
      const activePieceData = gameState.pieces.find(
        (piece) => piece.id === gameState.activePiece.id
      );
      const activePieceElement = document.querySelector(
        `#${activePieceData.id}`
      );
      const newSquarePosition = document.querySelector(
        `#${activePieceData.position}`
      );
      newSquarePosition.appendChild(activePieceElement);
    }
  });
  const startGame = () => {
    gameState.pieces.map((piece) => {
      const pieceData: PieceData = piece;
      const pieceElement = document.querySelector(`#${pieceData.id}`);
      const startingSquareNode = document.querySelector(
        `#${pieceData.position}`
      );
      startingSquareNode.appendChild(pieceElement);
    });
  };

  onDestroy(unsubscribe);
</script>

<main>
  <Board {startGame} />
  {#each gameData.pieces as piece}
    <Piece id={piece.id} color={piece.color} />
  {/each}
</main>
