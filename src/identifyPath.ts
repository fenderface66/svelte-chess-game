export const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g','h'];
export const ranks = ['1', '2', '3', '4', '5', '6', '7', '8']

export const identifyPath = (currentSquare, newSquare) => {

    const [currentSquareFile, currentSquareRank] = currentSquare.split('');
    const [newSquareFile, newSquareRank] = newSquare.split('');
    const currentSquareFileIndex = files.findIndex(file => file === currentSquareFile);
    const currentSquareRankIndex = ranks.findIndex(rank => rank === currentSquareRank);
    const newSquareFileIndex = files.findIndex(file => file === newSquareFile);
    const newSquareRankIndex = ranks.findIndex(rank => rank === newSquareRank);
    if (currentSquareFileIndex === newSquareFileIndex) {
        const startingSliceIndex = Math.min(currentSquareRankIndex, newSquareRankIndex);
        const endingSliceIndex =  Math.max(currentSquareRankIndex, newSquareRankIndex) + 1;
        const rankPath = ranks.slice(startingSliceIndex, endingSliceIndex)
        return rankPath.map(rank => `${currentSquareFile}${rank}`);
    } else if (currentSquareRankIndex === newSquareRankIndex) {
        const startingSliceIndex = Math.min(currentSquareFileIndex, newSquareFileIndex);
        const endingSliceIndex =  Math.max(currentSquareFileIndex, newSquareFileIndex) + 1;
        const filePath = files.slice(startingSliceIndex, endingSliceIndex)
        return filePath.map(file => `${file}${currentSquareRank}`);
    } else {
        const fileIndexDiff = currentSquareFileIndex - newSquareFileIndex;
        const path = [];
        const pathLength = Math.abs(fileIndexDiff);
        for (let i = 1; i < pathLength + 1; i++) {
            const newFileIndex = currentSquareFileIndex < newSquareFileIndex ? currentSquareFileIndex + i : currentSquareFileIndex - i; 
            const newRankIndex = currentSquareRankIndex < newSquareRankIndex ? currentSquareRankIndex + i : currentSquareRankIndex - i; 
            const newRank = ranks[newRankIndex];
            const newFile = files[newFileIndex];
            path.push(`${newFile}${newRank}`);
        }
        return path;
    }
}