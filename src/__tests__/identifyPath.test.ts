import { identifyPath } from "../identifyPath";

describe('identifyPath', () => {
    it('returns a list of squares that are in a direct line between the two squares', () => {
        const verticalPath = identifyPath('c5', 'c1');
        const horizontalPath = identifyPath('c1', 'h1');
        const diagonalPath = identifyPath('c1', 'g5');
        expect(verticalPath).toEqual(expect.arrayContaining(['c1', 'c2', 'c3', 'c4']));
        expect(horizontalPath).toEqual(expect.arrayContaining(['d1', 'e1', 'f1', 'g1', 'h1']));
        expect(diagonalPath).toEqual(expect.arrayContaining(['d2', 'e3', 'f4', 'g5']));
    })
})