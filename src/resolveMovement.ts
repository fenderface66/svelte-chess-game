import type { PieceData } from "./stores"


type PieceMovementMap = {
    [piece: string]: Movement
}

export type Axis = 'vertical' | 'horizontal' | 'diagonal'

export type Movement = {
    vertical: number[],
    horizontal: number[],
    diagonal: number[],
    order: null | Axis[], 
}

const pieceMovementMap: PieceMovementMap = {
    pawn: {
        vertical: [1, 2],
        horizontal: [0],
        diagonal: [0],
        order: null
    }
}

const virtualBoard = {
    '1': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    '2': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    '3': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    '4': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    '5': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    '6': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    '7': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
}

export const resolveMovement = (pieceData: PieceData) => {
    const { type, position, color } = pieceData
    const legalSquares = [];
     const pieceMovement = pieceMovementMap[type];
     if (!pieceMovement.order) {
        
     }
    const [file, rank] = position.split('');
    pieceMovement.vertical.map(vDistance => {
        const newRank = color === 'white' ? parseInt(rank) + vDistance : parseInt(rank) - vDistance;
        pieceMovement.horizontal.map(hDistance => {
            const currentFileIndex = virtualBoard[newRank].indexOf(file);
            const newFile = color === 'white' ? virtualBoard[newRank][currentFileIndex + hDistance] : virtualBoard[newRank][currentFileIndex - hDistance];
            legalSquares.push(`${newFile}${newRank}`)
        })
    })
    return legalSquares;
}