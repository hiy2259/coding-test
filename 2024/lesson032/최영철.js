/**
 * [귤 고르기](https://school.programmers.co.kr/learn/courses/30/lessons/138476)
 */

function solution(k, tangerine) {
  // 귤 크기별 집계
  const cntMap = {};
  for (const t of tangerine) {
    cntMap[t] = (cntMap[t] || 0) + 1;
  }

  // 귤 개수별 정렬 (내림차순)
  const cntArr = Object.entries(cntMap).sort((a, b) => b[1] - a[1]);

  // 정렬된 귤에서 k만큼 꺼내기
  let cntT = 0; // 꺼낸 귤의 종류
  let sumT = 0; // 꺼낸 귤의 개수
  while (k > sumT) {
    sumT += cntArr.shift()[1];
    cntT++;
  }
  return cntT;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    { k: 6, tangerine: [1, 3, 2, 5, 4, 5, 2, 3], answer: 3 },
    { k: 4, tangerine: [1, 3, 2, 5, 4, 5, 2, 3], answer: 2 },
    { k: 2, tangerine: [1, 1, 1, 1, 2, 2, 2, 3], answer: 1 },
    { k: 6, tangerine: [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9], answer: 4 },
    { k: 5, tangerine: [2, 1, 3, 3, 3, 3, 3, 9, 7, 8, 9], answer: 1 },
    { k: 3, tangerine: [1, 1, 2, 2], answer: 2 },
    { k: 2, tangerine: [1000, 2000, 2000, 1000], answer: 1 },
    { k: 1, tangerine: [1], answer: 1 }
  ];

  const success = testCases.every((tc) => {
    const answer = solution(tc.k, tc.tangerine);
    console.log(answer, tc.answer);
    return require("lodash").isEqual(answer, tc.answer);
  });
  console.log(success);
}

module.exports = solution;
