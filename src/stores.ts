import { writable } from 'svelte/store';

export type PieceData = {
    id: string;
    position: string;
}

export type Store = {
    [pieceName: string]: PieceData
}

export const game = writable({
    "test-piece": {
        id: 'test-piece',
        position: 'a2',
    }
});