function solution(k, dungeons) {
    var cnt = 0;
    let answer = []
    let list = []
    list = getPermutations(dungeons, dungeons.length);

    for(let i in list) {
        cnt = 0;
        let hp = k
        for(let j in list[i]) {
            if(hp >= list[i][j][0]) {
                hp -= list[i][j][1];
                cnt++;
            } else {
                break;
            }
        }
        answer.push(cnt)
    }
    return Math.max(...answer);
}

const getPermutations = function (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((value) => [value]);

    arr.forEach((fixed, index, origin) => {
        const rest = [...origin.slice(0, index), ...origin.slice(index+1)]
        const permutations = getPermutations(rest, selectNumber - 1);
        const attached = permutations.map((permutation) => [fixed, ...permutation]);
        results.push(...attached);
    });

    return results;
};
