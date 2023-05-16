type PieceMovementMap = {
    [piece: string]: Movement
}

export type Axis = 'vertical' | 'horizontal' | 'diagonal'

export type Movement = {
    vertical: number | null,
    horizontal: number | null,
    diagonal: number | null,
    pattern?: {
        vertical: number;
        horizontal: number;
    }[]
}

export const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g','h'];
export const ranks = ['1', '2', '3', '4', '5', '6', '7', '8']

export const pieceMovementMap: PieceMovementMap = {
    pawn: {
        vertical: 1,
        horizontal: null,
        diagonal: null,
    },
    bishop: {
        vertical: null,
        horizontal: null,
        diagonal: 8,
    },
    knight: {
        vertical: null,
        horizontal: null,
        diagonal: null,
        pattern: [{
            vertical: 1,
            horizontal: 2,
        }, {
            vertical: 2,
            horizontal: 1
        }]
    },
    rook: {
        vertical: 8,
        horizontal: null,
        diagonal: null,
    },
    queen: {
        vertical: 8,
        horizontal: 8,
        diagonal: 8,
    },
    king: {
        vertical: 1,
        horizontal: 1,
        diagonal: 1,
    }
}

export const virtualBoard = {
    '1': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    '2': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    '3': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    '4': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    '5': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    '6': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    '7': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
}