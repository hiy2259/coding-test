/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/68644
 * numbers의 길이는 2 이상 100 이하입니다.
 * numbers의 모든 수는 0 이상 100 이하입니다.
 */

function solution(numbers) {
  if (!(2 <= numbers.length && numbers.length <= 100 && numbers.every((n) => 0 <= n && n <= 100))) {
    throw new Error("Invalid arguments: " + JSON.stringify(numbers));
  }

  const rst = [];
  const length = numbers.length;

  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j < length; j++) {
      const sum = numbers[i] + numbers[j];
      if (!rst.includes(sum)) {
        rst.push(sum);
      }
    }
  }

  return rst.sort((a, b) => a - b);
}

function solutionOther(args) {
  return null;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    [2, 1, 3, 4, 1],
    [5, 0, 2, 7]
  ];
  const results = [
    [2, 3, 4, 5, 6, 7],
    [2, 5, 7, 9, 12]
  ];

  const success = testCases.every((numbers, index) => {
    console.log(solution(numbers), results[index]);
    return require("lodash").isEqual(solution(numbers), results[index]);
  });
  console.log(success);
}

module.exports = solution;
