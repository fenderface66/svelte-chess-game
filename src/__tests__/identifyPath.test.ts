import { identifyPath } from "../identifyPath";

describe('identifyPath', () => {
    it('returns a list of squares that are in a direct line between the two squares', () => {
        // const verticalPath = identifyPath('c5', 'c1');
        // const horizontalPath = identifyPath('c1', 'h1');
        const diagonalPath = identifyPath('f4', 'h2');
        // expect(verticalPath).toEqual(expect.arrayContaining(['c1', 'c2', 'c3', 'c4']));
        // expect(horizontalPath).toEqual(expect.arrayContaining(['d1', 'e1', 'f1', 'g1', 'h1']));
        expect(diagonalPath).toEqual(expect.arrayContaining(['g3', 'h2']));
    })
})