/**
 * 마법의 엘리베이터: https://school.programmers.co.kr/learn/courses/30/lessons/148653
 * 참고: https://school.programmers.co.kr/questions/53928
 */
function solution(storey) {
  // 2554 -> [2, 5, 5, 4] -> [4, 5, 5, 2]
  const arrStorey = (storey + "")
    .split("")
    .map((s) => +s)
    .reverse();

  let sumCnt = 0;

  for (let i = 0; i < arrStorey.length; i++) {
    const currD = arrStorey[i];
    const nextD = arrStorey[i + 1];

    if (currD === 0) {
      continue;
    }

    // n  < 5 이면, n 만큼 내려간다(-)
    // n  > 5 이면, 10 - n 만큼 올라가고(+), 윗 자리수를 +1
    // n == 5 이면, 윗 자리수에 따라 올라가거나(+) 내려갈 수 있다(-)
    //              윗 자리수  < 5 이면, 윗 자리수를 +1 할 경우 손해이므로 내려간다(-)
    //              윗 자리수 >= 5 이면, 윗 자리수를 +1 할 경우 이득이므로 올라간다(+)
    if (currD < 5 || (currD === 5 && (!nextD || nextD < 5))) {
      sumCnt += currD;
    } else {
      sumCnt += 10 - currD;
      arrStorey[i + 1] = (arrStorey[i + 1] || 0) + 1;
    }
  }

  return sumCnt;
}

function solutionOther(storey) {
  var answer = 0;
  return answer;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    { storey: 16, result: 6 }, // +4 -2
    { storey: 2554, result: 16 }, // -4 -5 -5 -2
    { storey: 1000, result: 1 }, // 0 0 0 -1
    { storey: 999, result: 2 }, // +1 0 0 -1
    { storey: 678, result: 8 }, // +2 +2 +3 -1
    { storey: 155, result: 11 }, // +5 +4 -2
    { storey: 154, result: 10 }, // -4 -5 -1
    { storey: 545, result: 14 }, // -5 -4 -5
    { storey: 555, result: 14 }, // +5 +4 +4 -1
    { storey: 56, result: 9 }, // +4 +4 -1
    { storey: 46, result: 9 }, // +4 -5
    { storey: 55, result: 10 }, // +5 +4 -1
    { storey: 75, result: 8 }, // +5 +2 -1
    { storey: 95, result: 6 }, // +1 +4 -1
    { storey: 45, result: 9 }, // -4 -5

    { storey: 987654321, result: 22 }, // -1 -2 -3 -4 +5 +3 +2 +1 0 -1
    { storey: 123456789, result: 22 }, // +1 +1 +2 +3 +4 -5 -3 -2 -1
  ];

  const success = testCases.every((tc) => {
    console.log(solution(tc.storey), tc.result);
    return require("lodash").isEqual(solution(tc.storey), tc.result);
  });
  console.log(success);
}

module.exports = solution;
