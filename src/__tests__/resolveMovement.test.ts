import { resolveMovement } from '../resolveMovement';

describe('resolveMovement', () => {
    it('will return the correct legal squares', () => {
        const legalSquares = resolveMovement('pawn', 'a2');

        expect(legalSquares).toEqual(expect.arrayContaining(['a3', 'a4']))
    })
})