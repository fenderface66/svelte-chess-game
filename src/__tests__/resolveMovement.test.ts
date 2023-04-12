import { resolveMovement } from '../resolveMovement';
import type { Store } from '../stores';

const testStore = {
    activePiece: null,
    "pieces": [
        {
            id: 'white-rook-1',
            color: 'white',
            position: 'a1',
            type: 'rook',
        },
        {
            id: 'white-knight-1',
            color: 'white',
            position: 'b1',
            type: 'knight',
        },
        {
            id: 'white-bishop-1',
            color: 'white',
            position: 'c1',
            type: 'bishop',
        },
        {
            id: 'white-queen',
            color: 'white',
            position: 'd1',
            type: 'queen',
        },
        {
            id: 'white-king',
            color: 'white',
            position: 'e1',
            type: 'king',
        },
        {
            id: 'white-bishop-2',
            color: 'white',
            position: 'f1',
            type: 'bishop',
        },
        {
            id: 'white-knight-2',
            color: 'white',
            position: 'g1',
            type: 'knight',
        },
        {
            id: 'white-rook-2',
            color: 'white',
            position: 'h1',
            type: 'rook',
        },
        {
            id: 'white-pawn-1',
            color: 'white',
            position: 'a2',
            type: 'pawn',
        },
        {
            id: 'white-pawn-2',
            color: 'white',
            position: 'b2',
            type: 'pawn',
        },
        {
            id: 'white-pawn-3',
            color: 'white',
            position: 'c2',
            type: 'pawn',
        },
        {
            id: 'white-pawn-4',
            color: 'white',
            position: 'd2',
            type: 'pawn',
        },
        {
            id: 'white-pawn-5',
            color: 'white',
            position: 'e2',
            type: 'pawn',
        },
        {
            id: 'white-pawn-6',
            color: 'white',
            position: 'f2',
            type: 'pawn',
        },
        {
            id: 'white-pawn-7',
            color: 'white',
            position: 'g2',
            type: 'pawn',
        },
        {
            id: 'white-pawn-8',
            color: 'white',
            position: 'h2',
            type: 'pawn',
        },
        {
            id: 'black-rook-1',
            color: 'black',
            position: 'a8',
            type: 'rook',
        },
        {
            id: 'black-knight-1',
            color: 'black',
            position: 'b8',
            type: 'knight',
        },
        {
            id: 'black-bishop-1',
            color: 'black',
            position: 'c8',
            type: 'bishop',
        },
        {
            id: 'black-queen',
            color: 'black',
            position: 'd8',
            type: 'queen',
        },
        {
            id: 'black-king',
            color: 'black',
            position: 'e8',
            type: 'king',
        },
        {
            id: 'black-bishop-2',
            color: 'black',
            position: 'f8',
            type: 'bishop',
        },
        {
            id: 'black-knight-2',
            color: 'black',
            position: 'g8',
            type: 'knight',
        },
        {
            id: 'black-rook-2',
            color: 'black',
            position: 'h8',
            type: 'rook',
        },
        {
            id: 'black-pawn-1',
            color: 'black',
            position: 'a7',
            type: 'pawn',
        },
        {
            id: 'black-pawn-2',
            color: 'black',
            position: 'b7',
            type: 'pawn',
        },
        {
            id: 'black-pawn-3',
            color: 'black',
            position: 'c7',
            type: 'pawn',
        },
        {
            id: 'black-pawn-4',
            color: 'black',
            position: 'd7',
            type: 'pawn',
        },
        {
            id: 'black-pawn-5',
            color: 'black',
            position: 'e7',
            type: 'pawn',
        },
        {
            id: 'black-pawn-6',
            color: 'black',
            position: 'f7',
            type: 'pawn',
        },
        {
            id: 'black-pawn-7',
            color: 'black',
            position: 'g7',
            type: 'pawn',
        },
        {
            id: 'black-pawn-8',
            color: 'black',
            position: 'h7',
            type: 'pawn',
        }
    ]
} as Store

describe('resolveMovement', () => {
    it('will return the correct legal squares for vertical moves', () => {
        const legalWhiteSquares = resolveMovement({
            type: 'pawn',
            color: 'white',
            position: 'a2',
            id: 'white-pawn-2'
        }, testStore);
        const legalBlackSquares = resolveMovement({
            type: 'pawn',
            color: 'black',
            position: 'b7',
            id: 'black-pawn-2'
        }, testStore);
        expect(legalWhiteSquares).toEqual(expect.arrayContaining(['a3', 'a4']))
        expect(legalBlackSquares).toEqual(expect.arrayContaining(['b6', 'b5']))
    })
    it('will return the correct legal squares when a pawn capture is possible', () => {
        const storeWithCatchableBlackPawn = {
            ...testStore,
            pieces: testStore.pieces.map((piece) => {
                if (piece.id === 'black-pawn-8') {
                    return {
                        ...piece,
                        position: 'h3'
                    }
                }
                return piece;
            })
        }
        const storeWithCatchableWhitePawn = {
            ...testStore,
            pieces: testStore.pieces.map((piece) => {
                if (piece.id === 'white-pawn-8') {
                    return {
                        ...piece,
                        position: 'h6'
                    }
                }
                return piece;
            })
        }
        const legalWhiteSquares = resolveMovement({
            type: 'pawn',
            color: 'white',
            position: 'g2',
            id: 'white-pawn-7'
        }, storeWithCatchableBlackPawn);
        const legalBlackSquares = resolveMovement({
            type: 'pawn',
            color: 'black',
            position: 'g7',
            id: 'black-pawn-7'
        }, storeWithCatchableWhitePawn);
        expect(legalWhiteSquares).toEqual(expect.arrayContaining(['g3', 'g4', 'h3']))
        expect(legalBlackSquares).toEqual(expect.arrayContaining(['g5', 'g6', 'h6']))
    })
    it('will return the correct legal squares for diagonal moves', () => {
        const legalWhiteSquares = resolveMovement({
            type: 'bishop',
            color: 'white',
            position: 'c1',
            id: 'white-bishop-1'
        }, testStore);
        const legalBlackSquares = resolveMovement({
            type: 'bishop',
            color: 'black',
            position: 'c8',
            id: 'black-bishop-1'
        }, testStore);
        expect(legalWhiteSquares).toEqual(expect.arrayContaining(['c1', 'b2', 'a3', 'd2', 'e3', 'f4', 'g5', 'h6']))
        expect(legalBlackSquares).toEqual(expect.arrayContaining(['b7', 'a6', 'd7', 'e6', 'f5', 'g4', 'h3']))
    })
    it('will return the correct squares for non-linear moves', () => {
        const legalWhiteSquares = resolveMovement({
            type: 'knight',
            color: 'white',
            position: 'b1',
            id: 'white-knight-1'
        }, testStore);
        const legalBlackSquares = resolveMovement({
            type: 'knight',
            color: 'black',
            position: 'b8',
            id: 'black-knight-1'
        }, testStore);
        expect(legalWhiteSquares).toEqual(expect.arrayContaining(['a3', 'c3', 'd2']))
        expect(legalBlackSquares).toEqual(expect.arrayContaining(['a6', 'c6', 'd7']))
    })
    it('will prevent movement when a path is blocked for a non-knight piece', () => {
        const legalWhiteSquares = resolveMovement({
            type: 'bishop',
            color: 'white',
            position: 'c1',
            id: 'white-bishop-1'
        }, testStore);
        const legalBlackSquares = resolveMovement({
            type: 'bishop',
            color: 'black',
            position: 'c8',
            id: 'black-bishop-1'
        }, testStore);
        expect(legalWhiteSquares).toEqual([])
        expect(legalBlackSquares).toEqual([])
    })
})