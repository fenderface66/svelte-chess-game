<script>
  export let rank;
  export let file;

  const squareId = `${file}${rank}`;

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
