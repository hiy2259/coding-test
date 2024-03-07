/**
 * 기능개발: https://school.programmers.co.kr/learn/courses/30/lessons/42586
 */

function solution(progresses, speeds) {
  const workDays = progresses.map((p, i) => Math.ceil((100 - p) / speeds[i]));
  const answer = [];
  let currWd = workDays[0];
  let i = 0;

  for (const wd of workDays) {
    if (currWd < wd) {
      currWd = wd;
      i++;
    }
    answer[i] = answer[i] ? answer[i] + 1 : 1;
  }
  return answer;
}

function solutionOther(progresses, speeds) {
  var answer = [];
  return answer;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    { progresses: [94, 94, 30, 55], speeds: [5, 5, 30, 5], result: [2, 1, 1] },
    { progresses: [94, 30, 55], speeds: [5, 30, 5], result: [1, 1, 1] },
    { progresses: [93, 30, 55], speeds: [1, 30, 5], result: [2, 1] },
    { progresses: [93, 30, 30, 55], speeds: [1, 30, 30, 5], result: [3, 1] },
    { progresses: [95, 90, 99, 99, 80, 99], speeds: [1, 1, 1, 1, 1, 1], result: [1, 3, 2] },
    { progresses: [99, 97, 55, 0], speeds: [1, 1, 4, 100], result: [1, 1, 2] },
  ];

  const success = testCases.every((tc) => {
    console.log(solution(tc.progresses, tc.speeds), tc.result);
    return require("lodash").isEqual(solution(tc.progresses, tc.speeds), tc.result);
  });
  console.log(success);
}

module.exports = solution;
