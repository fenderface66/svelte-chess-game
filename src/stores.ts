import { writable } from 'svelte/store';

export type PieceData = {
    id: string;
    position: string;
    color: string;
}

export type Store = {
    activePiece: null | string;
    pieces: PieceData[],
}

export const gameData = {
    activePiece: null,
    "pieces": [
        {
            id: 'white-pawn-1',
            color: 'white',
            position: 'a2'
        },
        {
            id: 'white-pawn-2',
            color: 'white',
            position: 'b2'
        },
        {
            id: 'white-pawn-3',
            color: 'white',
            position: 'c2'
        },
        {
            id: 'white-pawn-4',
            color: 'white',
            position: 'd2'
        },
        {
            id: 'white-pawn-5',
            color: 'white',
            position: 'e2'
        },
        {
            id: 'white-pawn-6',
            color: 'white',
            position: 'f2'
        },
        {
            id: 'white-pawn-7',
            color: 'white',
            position: 'g2'
        },
        {
            id: 'white-pawn-8',
            color: 'white',
            position: 'h2'
        }
    ]
}

export const game = writable(gameData);