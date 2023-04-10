type PieceMovementMap = {
    [piece: string]: Movement
}

export type Axis = 'vertical' | 'horizontal' | 'diagonal'

export type Movement = {
    vertical: number[],
    horizontal: number[],
    diagonal: number[],
    pattern?: {
        vertical: number;
        horizontal: number;
    }[]
}

export const pieceMovementMap: PieceMovementMap = {
    pawn: {
        vertical: [1, 2],
        horizontal: [],
        diagonal: [],
    },
    bishop: {
        vertical: [],
        horizontal: [],
        diagonal: [8],
    },
    knight: {
        vertical: [],
        horizontal: [],
        diagonal: [],
        pattern: [{
            vertical: 1,
            horizontal: 2,
        }, {
            vertical: 2,
            horizontal: 1
        }]
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