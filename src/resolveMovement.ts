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
        horizontal: [],
        diagonal: [],
        order: null
    },
    bishop: {
        vertical: [],
        horizontal: [],
        diagonal: [8],
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
    const [positionFile, positionRow] = position.split('');
    const legalSquares = [];
    const pieceMovement = pieceMovementMap[type];
    if (!pieceMovement.order) {
    
    }
    if (pieceMovement.diagonal.length) {
        const positionFileIndex = virtualBoard[1].indexOf(positionFile);
        Object.keys(virtualBoard).map(row => {
            const rowInt = parseInt(row);
            const verticalDiff = parseInt(positionRow) - rowInt;
            virtualBoard[row].map((file, index) => {
                const horizontalDiff = positionFileIndex - index;
                if (Math.abs(verticalDiff) === Math.abs(horizontalDiff)) {
                    legalSquares.push(`${file}${row}`)
                }
            })
        })
    }
    const [file, rank] = position.split('');
    pieceMovement.vertical.map(vDistance => {
        const newRank = color === 'white' ? parseInt(rank) + vDistance : parseInt(rank) - vDistance;
        const currentFileIndex = virtualBoard[newRank].indexOf(file);
        if (!pieceMovement.horizontal.length) {
            legalSquares.push(`${positionFile}${newRank}`)
        }
        pieceMovement.horizontal.map(hDistance => {
            const newFile = color === 'white' ? virtualBoard[newRank][currentFileIndex + hDistance] : virtualBoard[newRank][currentFileIndex - hDistance];
            legalSquares.push(`${newFile}${newRank}`)
        })
    })
    return legalSquares;
}