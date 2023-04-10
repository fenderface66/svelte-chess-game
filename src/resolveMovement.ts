import { pieceMovementMap, virtualBoard } from "./boardUtils";
import type { PieceData, Store } from "./stores"


export const resolveMovement = (pieceData: PieceData, gameState: Store) => {
    const { type, position, color } = pieceData
    const [positionFile, positionRank] = position.split('');
    const positionFileIndex = virtualBoard[1].indexOf(positionFile);
    const positionRowNumber = parseInt(positionRank);
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
            const verticalDiff = parseInt(positionRank) - rowInt;
            virtualBoard[row].map((file, index) => {
                const horizontalDiff = positionFileIndex - index;
                if (Math.abs(verticalDiff) === Math.abs(horizontalDiff)) {
                    legalSquares.push(`${file}${row}`)
                }
            })
        })
    }
    pieceMovement.vertical.map(vDistance => {
        const newRank = color === 'white' ? parseInt(positionRank) + vDistance : parseInt(positionRank) - vDistance;
        const currentFileIndex = virtualBoard[newRank].indexOf(positionFile);
        if (!pieceMovement.horizontal.length) {
            legalSquares.push(`${positionFile}${newRank}`)
        }
        pieceMovement.horizontal.map(hDistance => {
            const newFile = color === 'white' ? virtualBoard[newRank][currentFileIndex + hDistance] : virtualBoard[newRank][currentFileIndex - hDistance];
            legalSquares.push(`${newFile}${newRank}`)
        })
    })
    if (pieceData.type === 'pawn') {
        const whiteCaptureZones = [`${virtualBoard['1'][positionFileIndex - 1]}${parseInt(positionRank) + 1}`, `${virtualBoard['1'][positionFileIndex + 1]}${parseInt(positionRank) + 1}`];
        const blackCaptureZones = [`${virtualBoard['1'][positionFileIndex - 1]}${parseInt(positionRank) - 1}`, `${virtualBoard['1'][positionFileIndex + 1]}${parseInt(positionRank) - 1}`];
        const captureZones = color === 'white' ? whiteCaptureZones : blackCaptureZones;
        const catchablePieces = gameState.pieces.filter(piece => {
            if (captureZones.includes(piece.position)) {
                return true
            }
            return false;
        }).map(gameStatePiece => gameStatePiece.position)
        legalSquares.push(...catchablePieces);
    }
    return legalSquares;
}