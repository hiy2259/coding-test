// https://docs.google.com/spreadsheets/d/1Hk0cmTCeszyXt1N94wdi7AyzvBueFKjLhgEMl-L5FeM/edit?usp=sharing
function solution(number) {
    let answer = 0;
    const NUMBER_LENGTH = number.length;

    if (NUMBER_LENGTH < 3 || NUMBER_LENGTH > 13) {
        console.error("number의 길이는 3보다 크거나 같고, 13보자 작거나 같아야 합니다.");
        return answer;
    }

    let onePoint = 0;
    let twoPoint = 1;
    let threePoint = 2;
    let totalPoint = 0;
    const MAX_ONE_POINT = NUMBER_LENGTH - 3;
    const MAX_TWO_POINT = NUMBER_LENGTH - 2;
    const MAX_THREE_POINT = NUMBER_LENGTH - 1
    const MAX_SUM_INDEX = NUMBER_LENGTH * 3 - (1 + 2);

    while (totalPoint <= MAX_SUM_INDEX) {
        const FIRST = number[onePoint];
        const SECOND = number[twoPoint];
        const THIRD = number[threePoint];

        if ((-1000 > FIRST && FIRST > 1000) || (-1000 > SECOND && SECOND > 1000) || (-1000 > THIRD && THIRD > 1000)) {
            console.error("-1,000 ≤ number의 각 원소 ≤ 1,000");
            totalPoint = MAX_SUM_INDEX + 1;
            break;
        }

        let result = FIRST + SECOND + THIRD;

        if (result === 0) {
            ++answer;
        }

        if (threePoint < MAX_THREE_POINT) {
            ++threePoint;
        } else if (threePoint === MAX_THREE_POINT && twoPoint < MAX_TWO_POINT) {
            ++twoPoint;
            threePoint = twoPoint + 1;
        } else if (twoPoint === MAX_TWO_POINT && onePoint < MAX_ONE_POINT) {
            ++onePoint;
            twoPoint = onePoint + 1;
            threePoint = twoPoint + 1;
        } else if (onePoint === MAX_ONE_POINT && twoPoint === MAX_TWO_POINT && threePoint === MAX_THREE_POINT) {
            totalPoint = MAX_SUM_INDEX + 1;
            break;
        }

        totalPoint = onePoint + twoPoint + threePoint;
    }

    return answer;
}

console.log(solution([-2, 3, 0, 2, -5]) === 2);
console.log(solution([-3, -2, -1, 0, 1, 2, 3]) === 5);
console.log(solution([-1, 1, -1, 1]) === 0);
console.log(solution([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]) === 10);
console.log(solution([0, 0, 1, -1, 0]) === 4);
console.log(solution([-3, -2, -1, 0, 1, 2, 3]) === 5);
console.log(solution([-3, -2, -1, 0, 1, 2, 3, 1]) === 8);

// https://www.hackmath.net/en/calculator/n-choose-k?n=5&k=3&order=0&repeat=0
// 기호로 간단하게 n!로 나타내며 1부터 n까지의 자연수를 모두 곱하는 것을 팩토리얼이라고도 불린다.
// n = 정수의 갯수 / k = 선택 갯수 -> n!/k!(n−k)!
// [1, 2, 3, 4] / 3 -> 5!/3!(5−3)! = (4 * 3 * 2 * 1) / (3 * 2 * 1) * (1) = 24 / 6 = 4
// [1, 2, 3, 4, 5] / 3 -> 5!/3!(5−3)! = (5 * 4 * 3 * 2 * 1) / (3 * 2 * 1) * (2 * 1) = 120 / 12 = 10

function factorial(n) {
    let result = 1;

    for (let i = 1; i <= n; i++) {
        result *= i;
    }

    return result;
}

// console.log(factorial(4) / (factorial(3) * factorial(4-3)));
// console.log(factorial(5) / (factorial(3) * factorial(5-3)));
// console.log(factorial(13) / (factorial(3) * factorial(13-3)));

// [1, 2, 3, 4] -> 4
// value ->  index
// 123   ->  012
// 124   ->  013
// 134   ->  023
// 234   ->  123

// [1, 2, 3, 4, 5] -> 10
// value ->  index
// 123   ->  012
// 124   ->  013
// 125   ->  014
// 134   ->  023
// 135   ->  024
// 145   ->  034
// 234   ->  123
// 235   ->  124
// 245   ->  134
// 345   ->  234
