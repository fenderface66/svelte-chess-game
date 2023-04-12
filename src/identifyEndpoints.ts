import { pieceMovementMap } from "./boardUtils";
import type { Piece, PieceData } from "./stores";

export const identifyEndpoints = (legalSquares: string[]) => {
    const endpoints = legalSquares.filter(square => {
        const [squareFile, squareRank] = square.split('');
        return ['a', 'h'].includes(squareFile) || ['1', '8'].includes(squareRank);
    })
    return endpoints;
}