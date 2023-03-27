import { resolveMovement } from '../resolveMovement';

describe('resolveMovement', () => {
    it('will return the correct legal squares for vertical moves', () => {
        const legalWhiteSquares = resolveMovement({
            type: 'pawn',
            color: 'white',
            position: 'a2',
            id: 'white-pawn-2'
        });
        const legalBlackSquares = resolveMovement({
            type: 'pawn',
            color: 'black',
            position: 'b7',
            id: 'black-pawn-2'
        });
        expect(legalWhiteSquares).toEqual(expect.arrayContaining(['a3', 'a4']))
        expect(legalBlackSquares).toEqual(expect.arrayContaining(['b6', 'b5']))
    })
    it('will return the correct legal squares for diagonal moves', () => {
        const legalWhiteSquares = resolveMovement({
            type: 'bishop',
            color: 'white',
            position: 'c1',
            id: 'white-bishop-1'
        });
        const legalBlackSquares = resolveMovement({
            type: 'bishop',
            color: 'black',
            position: 'c8',
            id: 'black-bishop-1'
        });
        expect(legalWhiteSquares).toEqual(expect.arrayContaining(['b7', 'a6', 'd7', 'e6', 'f5', 'g4', 'h3']))
        expect(legalBlackSquares).toEqual(expect.arrayContaining(['c1', 'b2', 'a3', 'd2', 'e3', 'f4', 'g5', 'h6']))
    })
})