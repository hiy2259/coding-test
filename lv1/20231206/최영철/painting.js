/**
 * 덧칠하기: https://school.programmers.co.kr/learn/courses/30/lessons/161989
 */

function solution(n, m, section) {
  // n: 구역 개수
  // m: 롤러 길이
  // section: 페인트를 칠해야 하는 구역들
  const minN = section[0];
  const maxN = section[section.length - 1];
  const totalLength = maxN - minN + 1;

  if (totalLength < m) {
    return 1;
  } else {
    let lastPaintingN = -1;
    let cnt = 0;

    for (const n of section) {
      // 이미 칠한 구역이면 넘어감
      if (lastPaintingN >= n) {
        continue;
      }

      lastPaintingN = n; // 칠하는 시작 위치 설정
      cnt++; // 칠했다
      lastPaintingN += m - 1; // 칠한 위치

      // maxN 까지 칠했다면 종료
      if (lastPaintingN >= maxN) {
        break;
      }
    }
    return cnt;
  }
}

function solutionOther(n, m, section) {
  var answer = 0;
  return answer;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    { n: 8, m: 4, section: [2, 3, 5], result: 1 },
    { n: 8, m: 4, section: [2, 3, 6], result: 2 },
    { n: 8, m: 4, section: [2, 3, 7, 8], result: 2 },
    { n: 5, m: 4, section: [1, 3], result: 1 },
    { n: 4, m: 1, section: [1, 2, 3, 4], result: 4 },
    { n: 4, m: 2, section: [1, 2, 3, 4], result: 2 },
    { n: 4, m: 2, section: [1, 4], result: 2 },
    { n: 1000, m: 30, section: [1, 500, 999], result: 3 }
  ];

  const success = testCases.every((tc) => {
    console.log(solution(tc.n, tc.m, tc.section), tc.result);
    return require("lodash").isEqual(solution(tc.n, tc.m, tc.section), tc.result);
  });
  console.log(success);
}

module.exports = solution;
