import { Writable, writable } from 'svelte/store';

export type Piece = 'pawn'

export type PieceData = {
    id: string;
    position: string;
    color: string;
    type: Piece
}

export type Store = {
    activePiece: null | string;
    pieces: PieceData[],
}

export const gameData: Store = {
    activePiece: null,
    "pieces": [
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
        }
    ]
}

export const game: Writable<Store> = writable(gameData);