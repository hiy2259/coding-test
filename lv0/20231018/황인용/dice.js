function isInRange(num) {
    return !(1 <= num && num <= 6);
}

function solution(a, b, c, d) {
    let answer = 0;

    if (isInRange(a) || isInRange(b) || isInRange(c) || isInRange(d)) {
        console.error('a, b, c, d는 1 이상 6 이하의 정수입니다.');
        return answer;
    }
    
    const duplicatedValue = {};
    const dice = [a, b, c, d];
    
    // [1, 2, 2, 3] -> {'1': [0], '2': [1, 2]. '3': [3]}
    dice.forEach((value, index) => {
        if (!duplicatedValue[value]) {
            duplicatedValue[value] = [index];
        } else {
            duplicatedValue[value].push(index);
        }
    });
    // {'1': [0], '2': [1, 2]. '3': [3]} -> [['2', [1, 2]], ['1', [0]], ['3'. [3]]]
    const result = Object.entries(duplicatedValue).sort((a, b) => b[1].length - a[1].length);

    switch (result.length) {
        case 1:
            answer = 1111 * result[0][0];
            break;
        case 2:
            const p = result[0][0] * 1;
            const q = result[1][0] * 1;
            if (result[0][1].length === 3 && p !== q) {
                answer = Math.pow((10 * p + q), 2)
            } else if (p !== q) {
                answer = (p + q) * Math.abs(p - q);
            }
            break;
        case 3:
            const p1 = result[0][0] * 1;
            const q1 = result[1][0] * 1;
            const r1 = result[2][0] * 1;
            answer = (![q1, r1].includes(p1) && q1 !== r1) ? q1 * r1 : answer;
            break;
        case 4:
            answer = Math.min(result[0][0], result[1][0], result[2][0], result[3][0])
            break;
    }

    return answer;
}

console.log(solution([1, 1, 1, 4]));
console.log(solution([3, 3, 3, 4]));
console.log(solution([5, 3, 6, 6]));
console.log(solution([5, 4, 6, 6]));
console.log(solution([4, 1, 4, 4]));
console.log(solution([1, 2, 2, 3]));
console.log(solution([1, 1, 5, 5]));
