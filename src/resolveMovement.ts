import type { Piece } from "./stores"


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

export const resolveMovement = (pieceType: Piece, currentSquare: string) => {
    const legalSquares = [];
     const pieceMovement = pieceMovementMap[pieceType];
     if (!pieceMovement.order) {

     }
    const [file, rank] = currentSquare.split('');
    pieceMovement.vertical.map(vDistance => {
        const newRank = parseInt(rank) + vDistance;
        console.log({newRank});
        pieceMovement.horizontal.map(hDistance => {
            const currentFileIndex = virtualBoard[newRank].indexOf(file);
            const newFile = virtualBoard[newRank][currentFileIndex + hDistance];
            legalSquares.push(`${newFile}${newRank}`)
        })
    })
    return legalSquares;
}