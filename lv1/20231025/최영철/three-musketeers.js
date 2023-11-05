/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/131705
 * - 3 ≤ number의 길이 ≤ 13
 * - -1,000 ≤ number의 각 원소 ≤ 1,000
 * - 서로 다른 학생의 정수 번호가 같을 수 있습니다.
 *
 * => 배열을 순회하면서 중복되지 않는 3개의 원소 조합을 만드는 문제 (값은 같을 수 있음)
 */

function solution(numbers) {
  if (!(3 <= numbers.length && numbers.length <= 13 && numbers.every((n) => -1000 <= n && n <= 1000))) {
    throw new Error("Invalid arguments: " + JSON.stringify(numbers));
  }

  let cnt = 0;
  let length = numbers.length;
  let n = 0;

  for (let a = 0; a + 2 < length; a++) {
    for (let b = a + 1; b + 1 < length; b++) {
      for (let c = b + 1; c < length; c++) {
        if (numbers[a] + numbers[b] + numbers[c] === 0) {
          cnt++;
        }
        n++;
      }
    }
  }
  console.log(n);

  return cnt;
}

function solutionOther(arr) {
  const result = [];

  function findCombinations(current, index) {
    if (current.length === 3 && current.reduce((a, b) => a + b, 0) === 0) {
      result.push([...current]);
      return;
    }

    if (index === arr.length) {
      return;
    }

    // Include the current element in the combination
    current.push(arr[index]);
    findCombinations(current, index + 1);
    current.pop(); // Backtrack

    // Skip the current element
    findCombinations(current, index + 1);
  }

  findCombinations([], 0);
  console.log(result);
  return result.length;
}


/**
 * run & test
 */
if (require.main === module) {
  const _ = require("lodash");

  const rdCase = _.map(new Array(Math.floor(Math.random() * 10 + 3)), () => Math.floor(Math.random() * 20 - 10));
  const testCases = [
    [-2, 3, 0, 2, -5],
    [-3, -2, -1, 0, 1, 2, 3],
    [-1, 1, -1, 1],

    [0, -2, 9, -6, 9, 4, 1, 8, -6, 0],
    [-2, 4, 0, -2, -9, 7, -8, 7, 9, 8],
    [5, 5, -8, 0, 0, -7, 6, 4, 0],
    [6, -6, -10, -1, 4],
    [-3, -6, 6, -10, 5, 5, -9, 2, 5, -2],
    [9, 2, -5, 6, 2, -9, -2, 9, 0],
    [-5, -3, 6, 3, 2, 6, 9, -6, -8, 1, 1, -9],
    rdCase
  ];
  const results = [2, 5, 0, 2, 3, 1, 1, 6, 4, 8, solution(rdCase)];

  const success = testCases.every((params, index) => {
    // console.log(params, solutionOther(params), results[index]);
    return _.isEqual(solutionOther(params), results[index]);
  });
  console.log(success);
}

module.exports = solution;
