/**
 * Lv3: [인사고과](https://school.programmers.co.kr/learn/courses/30/lessons/152995)
 * 인센티브 석차 구하기
 *
 */

function solution(scores) {
  function someLtBoth(score) {
    return scores.some((s) => score[0] < s[0] && score[1] < s[1]);
  }

  // 완호가 인센티브 못 받음
  const wanho = scores[0];
  if (someLtBoth(scores[0])) {
    return -1;
  }

  const sorted = scores
    .filter((s) => {
      // 인센티브 못받는 사원 제외
      return !someLtBoth(s);
    })
    // 두 점수의 합으로 석차를 결정
    .map((s) => s[0] + s[1])
    .sort((sa, sb) => {
      // 두 점수의 합으로 내림차순 정렬
      return sb - sa;
    });

  // 석차이므로 +1
  return sorted.indexOf(wanho[0] + wanho[1]) + 1;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    { scores: [ [2, 2], [1, 4], [3, 2], [3, 2], [2, 1] ], answer: 4 },
    { scores: [ [3, 2], [2, 3], [3, 2], [2, 3] ],         answer: 1 },
    { scores: [ [2, 1], [2, 2], [2, 3], [3, 1] ],         answer: 4 },
    { scores: [ [7, 1], [6, 6], [5, 4], [5, 4], [6, 6] ], answer: 3 },
    { scores: [ [3, 1], [2, 5], [2, 10] ],                answer: 3 },
    { scores: [ [4, 0], [2, 3], [4, 4], [2, 6] ],         answer: 3 },
    { scores: [ [100, 2], [100, 1], [50, 1] ],            answer: 1 },
    { scores: [ [5, 5], [11, 2], [10, 1] ],               answer: 2 },
    { scores: [ [2, 2], [2, 2], [2, 3], [3, 2] ],         answer: 3 },
    { scores: [ [1, 1], [1, 1], [1, 1], [1, 1], [1, 1] ], answer: 1 },
    { scores: [ [3, 1], [1, 4], [2, 3], [2, 3], [1, 5], [1, 0], [1, 0] ], answer: 5 },
    { scores: [ [1, 1], [2, 2], [3, 3], [4, 4], [5, 5] ], answer: -1 }
  ];

  testCases.forEach((tc) => {
    const answer = solution(tc.scores);
    console.log(answer, tc.answer, require("lodash").isEqual(answer, tc.answer));
  });
}

module.exports = solution;
