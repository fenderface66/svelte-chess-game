import { Writable, writable } from 'svelte/store';

export type Piece = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king'

export type PieceData = {
    id: string;
    position: string;
    color: string;
    type: Piece
}

export type Store = {
    activePiece: {
        id: string,
        legalSquares: string[],
    };
    pieces: PieceData[],
}

export const gameData: Store = {
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
}

export const game: Writable<Store> = writable(gameData);