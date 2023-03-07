import App from '../App.svelte';
import {render, fireEvent, screen} from '@testing-library/svelte';
import { gameData } from '../stores';

describe('Chess game', () => {
  describe('starting the game', () => {
    it.only('moves all pieces to their correct starting position', () => {
      render(App);
      const startButton = screen.getByTestId('start-button');
      fireEvent.click(startButton);
      gameData.pieces.map(piece => {
        const pieceElement = screen.getByTestId(piece.id);
        const containingPieceSquare = pieceElement.parentNode;
        expect(containingPieceSquare.textContent).toBe(piece.position);
      })
    })
  })
  describe('moving pieces', () => {
    it('places the piece in the empty square it was dropped in', () => {
      render(App);
      const piece = screen.getByTestId('white-pawn-1');
      const firstSquare = screen.getByText('a2');
      fireEvent.drag(piece)
      fireEvent.drop(firstSquare);
      const containingPieceSquare = piece.parentNode;
      expect(containingPieceSquare.textContent).toBe("a2");
    })
  })
})