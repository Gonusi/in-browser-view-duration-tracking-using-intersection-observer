// Utility functions
// ---

// If idsByCategory shape is:
// [
//   landscape: [id1, id2, id3],
//   machinery: [id4, id5, id6],
//   ...moreCategories
// ]
// Return result in shape:
// [id1, id4, id2, id5, id3, id6];
//
// This way we'll "shuffle" the categories equally.
// Lets do this recursively.
export const getOrderedList = (imageData) => {
  let orderedImageIdList = [];
  (() => {
    const { idsByCategory } = imageData;
    const walk = (categoryIndex, photoIndex) => {
      if (!Object.values(idsByCategory)[categoryIndex]) {
        // we're out of categories, go over them all again but with incremented photo index
        return walk(0, photoIndex + 1);
      }
      if (!Object.values(idsByCategory)[categoryIndex][photoIndex]) {
        // we're out of photos, done
        return;
      }
      orderedImageIdList.push(
        Object.values(idsByCategory)[categoryIndex][photoIndex]
      );
      return walk(categoryIndex + 1, photoIndex);
    };

    walk(0, 0);
  })();
  return orderedImageIdList;
};

// Shuffle array in blocks
// If list is [1,2,3,4,5,6] and shuffleBlockSize is 2
// result may be [4,3,1,2,5,6]
export const getShuffledBlockList = (list, shuffleBlockSize) => {
  // Split list into blocks
  let block = 0;
  const blocks = list.reduce(
    (acc, el, i) => {
      if (!acc[block]) acc[block] = [];
      acc[block].push(el);
      if ((i + 1) / shuffleBlockSize === block + 1) block++;
      return acc;
    },
    [[]]
  );
  console.log("blocks", blocks);
  const blocksWithShuffledItems = blocks.map((block) =>
    getShuffledArray(block)
  );
  const shuffledBlocks = getShuffledArray(blocksWithShuffledItems);
  const result = [].concat.apply([], shuffledBlocks);
  console.log("final result:", result);
  return result;
};

export const getShuffledArray = (array) => {
  const shallowCopy = [...array];
  for (let i = shallowCopy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = shallowCopy[i];
    shallowCopy[i] = shallowCopy[j];
    shallowCopy[j] = temp;
  }
  return shallowCopy;
};
