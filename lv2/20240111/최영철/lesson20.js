/**
 * 괄호 회전하기: https://school.programmers.co.kr/learn/courses/30/lessons/76502
 */

function solution(s) {
  // 홀수면 올바른 괄호 문자열 불가능
  if (s.length % 2 === 1) {
    return 0;
  }

  let answer = 0;
  let sLength = s.length;

  while (sLength--) {
    let rotated = s.slice(sLength) + s.slice(0, sLength);
    const n = s.length / 2;

    // NOTE: 경우에 따라 500번 순회하므로 매우 느림. 다르게 풀어야 함.
    for (let i = 0; i < n; i++) {
      // 괄호 종류만큼 반복 제거
      // ex) {[()]} -> {[]} -> {} ->
      let rst = rotated.replace(/\(\)|\[\]|\{\}/g, "");

      // 모두 제거되었으면 올바른 문자열
      if (!rst.length) {
        answer += 1;
        break;
      }
      // 제거한게 하나도 없으면 올바르지 않음
      else if (rst.length === rotated.length) {
        break;
      }

      rotated = rst;
    }
  }

  return answer;
}

function solutionOther(s) {
  var answer = -1;
  return answer;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    { s: "[](){}", result: 3 },
    { s: "}]()[{", result: 2 },
    { s: "[)(]", result: 0 },
    { s: "}}}", result: 0 },

    { s: "{(}[)]", result: 0 },
    { s: "{[()]}", result: 1 },
    { s: "()(", result: 0 },
    { s: "(", result: 0 },
    { s: "{{{{{{", result: 0 }
  ];

  const success = testCases.every((tc) => {
    console.log(solution(tc.s), tc.result);
    return require("lodash").isEqual(solution(tc.s), tc.result);
  });
  console.log(success);
}

module.exports = solution;
