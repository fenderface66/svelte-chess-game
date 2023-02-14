<script>
  export let rank;
  export let file;

  const backgroundColour =
    (((["a", "c", "e", "g"].includes(file) && rank % 2 !== 0) ||
      (["b", "d", "f", "h"].includes(file) && rank % 2 === 0)) &&
      "black") ||
    "white";
</script>

<div class={backgroundColour === "black" ? "black square" : "white square"}>
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
