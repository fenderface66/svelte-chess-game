const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g','h'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8']

export const identifyPath = (currentSquare, newSquare) => {

    let direction = null;
    const [currentSquareFile, currentSquareRank] = currentSquare.split('');
    const [newSquareFile, newSquareRank] = newSquare.split('');
    const currentSquareFileIndex = files.findIndex(file => file === currentSquareFile);
    const currentSquareRankIndex = ranks.findIndex(rank => rank === currentSquareRank);
    const newSquareFileIndex = files.findIndex(file => file === newSquareFile);
    const newSquareRankIndex = ranks.findIndex(rank => rank === newSquareRank);
    if (currentSquareFileIndex === newSquareFileIndex) {
        direction = 'vertical';
        const startingSliceIndex = Math.min(currentSquareRankIndex, newSquareRankIndex);
        const endingSliceIndex =  Math.max(currentSquareRankIndex, newSquareRankIndex) + 1;
        const rankPath = ranks.slice(startingSliceIndex, endingSliceIndex)
        return rankPath.map(rank => `${currentSquareFile}${rank}`);
    } else if (currentSquareRankIndex === newSquareRankIndex) {
        direction = 'horizontal';
        const startingSliceIndex = Math.min(currentSquareFileIndex, newSquareFileIndex);
        const endingSliceIndex =  Math.max(currentSquareFileIndex, newSquareFileIndex) + 1;
        const filePath = files.slice(startingSliceIndex, endingSliceIndex)
        return filePath.map(file => `${file}${currentSquareRank}`);
    } else {
        direction = 'diagonal'
        const startingRankSliceIndex = Math.min(currentSquareRankIndex, newSquareRankIndex);
        const endingRankSliceIndex =  Math.max(currentSquareRankIndex, newSquareRankIndex) + 1;
        const startingFileSliceIndex = Math.min(currentSquareFileIndex, newSquareFileIndex);
        const endingFileSliceIndex =  Math.max(currentSquareFileIndex, newSquareFileIndex) + 1;
        const rankPath = ranks.slice(startingRankSliceIndex, endingRankSliceIndex)
        const filePath = files.slice(startingFileSliceIndex, endingFileSliceIndex)
        return rankPath.map((rank, index) => `${filePath[index]}${rank}`);
    }
}