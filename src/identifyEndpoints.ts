import type { Piece } from "./stores";

export const identifyEndpoints = (pieceType: Piece, legalSquares: string[]) => {
    if (['bishop', 'queen', 'rook'].includes(pieceType)) {
        return legalSquares.filter(square => {
            const [squareFile, squareRank] = square.split('');
            return ['a', 'h'].includes(squareFile) || ['1', '8'].includes(squareRank);
        })
    } else {
        return legalSquares;
    }
}