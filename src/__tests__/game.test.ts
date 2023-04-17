import App from '../App.svelte';
import {render, fireEvent, screen, cleanup} from '@testing-library/svelte';
import { gameData, game } from '../stores';

describe('Chess game', () => {
  afterEach(() => {
    game.set(gameData);
  })
  describe('starting the game', () => {
    it('moves all pieces to their correct starting position', () => {
      render(App);
      const startButton = screen.getByTestId('start-button');
      fireEvent.click(startButton);
      gameData.pieces.map(piece => {
        const pieceElement = screen.getByTestId(piece.id);
        const containingPieceSquare = pieceElement.parentNode;
        expect(containingPieceSquare.textContent.trim()).toBe(piece.position);
      })
    })
  })
  describe('picking up pieces', () => {
    it('shows all possible drop points for a picked up piece', async () => {
      render(App);
      const piece = screen.getByTestId('white-pawn-1');
      await fireEvent.drag(piece)
      const firstSquare = screen.getByText('a3');
      const markers = screen.getAllByTestId("marker");
      const markerSquares = markers.map(marker => marker.parentElement);
      const squareIds = markerSquares.map(square => square.textContent.trim());
      expect(squareIds).toEqual(expect.arrayContaining(['a2','a3', 'a4']));
    })
  })
  describe('placing pieces', () => {
    it('places the piece in the empty square it was dropped in', () => {
      render(App);
      const piece = screen.getByTestId('white-pawn-1');
      const firstSquare = screen.getByText('a3');
      fireEvent.drag(piece)
      fireEvent.drop(firstSquare);
      const containingPieceSquare = piece.parentNode;
      expect(containingPieceSquare.textContent.trim()).toBe("a3");
    })
    it('prevents players from placing pieces in illegal squares', () => {
      render(App);
      const piece = screen.getByTestId('white-pawn-1');
      const startButton = screen.getByTestId('start-button');
      const illegalSquare = screen.getByText('a5');
      fireEvent.click(startButton);
      fireEvent.drag(piece)
      fireEvent.drop(illegalSquare);
      const containingPieceSquare = piece.parentNode;
      expect(containingPieceSquare.textContent.trim()).toBe("a2");
    })
  })
})