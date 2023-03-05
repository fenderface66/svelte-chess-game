import App from '../App.svelte';
import {render, fireEvent, screen} from '@testing-library/svelte';

describe('Chess game', () => {
  describe('moving pieces', () => {
    it('places the piece in the empty square it was dropped in', () => {
      render(App);
      screen.debug();
      const piece = screen.getByTestId('test-piece');
      const firstSquare = screen.getByText('a2');
      fireEvent.drag(piece)
      fireEvent.drop(firstSquare);
      const containingPieceSquare = piece.parentNode;
      expect(containingPieceSquare.textContent).toBe("a2");
    })
  })
})