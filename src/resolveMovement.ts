import type { PieceData } from "./stores"


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

const pieceMovementMap: PieceMovementMap = {
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
    const positionFileIndex = virtualBoard[1].indexOf(positionFile);
    const positionRowNumber = parseInt(positionRow);
    const legalSquares = [];
    const pieceMovement = pieceMovementMap[type];
    if (!!pieceMovement.pattern) {
        pieceMovement.pattern.map((pattern) => {
            const increasedFileIndex = positionFileIndex + pattern.horizontal;
            const increasedNewFile = virtualBoard[1][increasedFileIndex];
            const decreasedFileIndex = positionFileIndex - pattern.horizontal;
            const decreasedNewFile = virtualBoard[1][decreasedFileIndex];
            const increasedRow = positionRowNumber + pattern.vertical;
            const decreasedRow = positionRowNumber - pattern.vertical;
            const resolvedPatternPositions = [
                `${increasedNewFile}${increasedRow}`,
                `${increasedNewFile}${decreasedRow}`,
                `${decreasedNewFile}${increasedRow}`,
                `${decreasedNewFile}${decreasedRow}`
            ].filter((resolvedPatternPosition) => {
                if (resolvedPatternPosition.includes('-') || resolvedPatternPosition.includes('undefined') || resolvedPatternPosition.includes('0')) {
                    return false;
                } return true;
            })
            legalSquares.push(...resolvedPatternPositions)
        })
    }
    if (pieceMovement.diagonal.length) {
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