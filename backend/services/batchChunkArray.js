export const batchChunkArray = (arr) => {
    let batches = []
    for(let i=0;i<arr.length;i+=96){
        batches.push(arr.slice(i,i+96));
    }
    return batches;
}