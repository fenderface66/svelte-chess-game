import { writable } from 'svelte/store';

export type PieceData = {
    id: string;
    startingPosition: string;
}

export type Store = {
    [pieceName: string]: PieceData
}

export const game = writable({
    "test-piece": {
        id: 'test-piece',
        startingPosition: 'a2',
    }
});