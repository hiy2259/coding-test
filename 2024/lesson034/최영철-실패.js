/**
 * [디펜스 게임](https://school.programmers.co.kr/learn/courses/30/lessons/142085)
 */

function solution(n, k, enemy) {
  let oldEnemy = [];
  let round = 0;

  while (enemy.length) {
    const e = enemy.shift();

    // 일단 무적권 쓰지 않고 싸운다.
    n -= e;
    oldEnemy.push(e);

    // 막혔는데
    if (n < 0) {
      // 무적권이 있는 경우
      if (k) {
        // 지금까지 만난 적 중에 가장 많은 적을 찾아서
        const maxE = Math.max(...oldEnemy);
        oldEnemy.splice(oldEnemy.indexOf(maxE), 1);

        // 무적권 사용하고 병력 복구
        k--;
        n += maxE;
      } else {
        break;
      }
    }
    // 라운드 통과
    round++;
  }

  return round;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    { n: 7, k: 3, enemy: [4, 2, 4, 5, 3, 3, 1], answer: 5 },
    { n: 7, k: 3, enemy: [7, 2, 4, 5, 3, 3, 1], answer: 5 },
    { n: 2, k: 4, enemy: [3, 3, 3, 3], answer: 4 },
    { n: 4, k: 4, enemy: [2, 2, 2, 2, 3, 3], answer: 6 },
    { n: 4, k: 4, enemy: [2, 2, 2, 2, 3, 3, 1], answer: 6 },
    { n: 4, k: 4, enemy: [2, 2, 2, 2, 3, 3, 9], answer: 6 },
    { n: 10, k: 2, enemy: [5, 5, 5, 5, 5], answer: 4 },
    { n: 10, k: 1, enemy: [5, 5, 5, 5, 5], answer: 3 },
    { n: 10, k: 3, enemy: [12, 11, 4, 2, 1, 5, 8, 6, 7], answer: 6 },
    { n: 7, k: 3, enemy: [5, 5, 5, 5, 2, 3, 1], answer: 5 },
    { n: 1, k: 6, enemy: [2, 2, 2, 2, 3, 3, 1], answer: 7 },
    { n: 10, k: 1, enemy: [2, 2, 2, 2, 2, 10], answer: 6 },
    { n: 10, k: 1, enemy: [2, 2, 2, 2, 10], answer: 5 },
    { n: 5, k: 2, enemy: [99, 1, 99], answer: 3 },
    { n: 7, k: 1, enemy: [2, 1, 5, 1], answer: 4 },
    { n: 7, k: 2, enemy: [2, 1, 99, 99], answer: 4 }
  ];

  testCases.forEach((tc) => {
    const answer = solution(tc.n, tc.k, tc.enemy);
    const rst = require("lodash").isEqual(answer, tc.answer) + "";
    console.log(answer, tc.answer, rst);
  });
}

module.exports = solution;
