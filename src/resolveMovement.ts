import { pieceMovementMap, virtualBoard, files, ranks } from "./boardUtils";
import type { PieceData, Store } from "./stores"


export const resolveMovement = (pieceData: PieceData, gameState: Store) => {
    const { type, position, color } = pieceData
    const [positionFile, positionRank] = position.split('');
    const positionFileIndex = files.indexOf(positionFile);
    const positionRankIndex = ranks.indexOf(positionRank);
    const legalSquares = [];
    const pieceMovement = pieceMovementMap[type];
    if (!!pieceMovement.pattern) {
        pieceMovement.pattern.map((pattern) => {
            const patternMoves = [];
            const patternRanks = [ranks[positionRankIndex - pattern.vertical], ranks[positionRankIndex + pattern.vertical]];
            const patternFiles = [files[positionFileIndex - pattern.horizontal], files[positionFileIndex + pattern.horizontal]];
            patternFiles.forEach((file) => {
                patternMoves.push(`${file}${patternRanks[0]}`, `${file}${patternRanks[1]}`);
            });
            legalSquares.push(...patternMoves.filter(x => !x.includes('undefined')));
        })
    }
    if (!!pieceMovement.diagonal) {
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

    if (pieceMovement.vertical > 0) {
        for (let x = 0; x <= pieceMovement.vertical; x++) {
            legalSquares.push(`${positionFile}${color === 'white' ? parseInt(positionRank) + x : parseInt(positionRank)- x}`)
        } 
    }

    if (pieceMovement.horizontal > 0) {
        for (let x = 0; x <= pieceMovement.horizontal; x++) {
            legalSquares.push(`${files[positionFileIndex + x]}${positionRank}`);
            legalSquares.push(`${files[positionFileIndex - x]}${positionRank}`)
        } 
    }
    
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