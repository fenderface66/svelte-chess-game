<script lang="ts">
  import { identifyEndpoints } from "./identifyEndpoints";

  // import { identifyEndpoints } from "./identifyEndpoints";
  import { identifyPath } from "./identifyPath";
  import { resolveMovement } from "./resolveMovement";
  import { Store, game } from "./stores";
  export let id;
  export let color;

  let gameState: Store = {
    activePiece: null,
    pieces: [],
  };

  game.subscribe((value) => {
    gameState = value;
  });

  const onDragPiece = (e) => {
    const pieceData = gameState.pieces.find((piece) => piece.id === id);
    const legalSquareMovements = resolveMovement(pieceData, gameState);
    const endpoints = identifyEndpoints(pieceData.type, legalSquareMovements);
    const paths = endpoints.map((movement) => {
      return identifyPath(pieceData.position, movement);
    });
    const interceptedPaths =
      pieceData.type === "knight"
        ? paths
        : paths.map((path) => {
            let pathBlocked = false;
            return path
              .map((square) => {
                if (!!pathBlocked) {
                  return false;
                }
                const squareIsOccupied = gameState.pieces.find(
                  (piece) =>
                    piece.position === square && piece.id !== pieceData.id
                );
                if (!!squareIsOccupied) {
                  pathBlocked = true;
                }
                return square;
              })
              .filter((x) => x);
          });
    game.update((n) => ({
      ...n,
      activePiece: {
        id,
        paths: interceptedPaths,
      },
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
