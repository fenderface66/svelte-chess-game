<script>
  const onDragPiece = (e) => {};
</script>

<div
  id="test-piece"
  data-testid="test-piece"
  on:drag={onDragPiece}
  draggable="true"
  class="test-piece"
/>

<style>
  .test-piece {
    width: 20px;
    height: 20px;
    background-color: gray;
    cursor: grab;
  }
</style>
