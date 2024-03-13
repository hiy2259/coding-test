/**
 * 삼각 달팽이: https://school.programmers.co.kr/learn/courses/30/lessons/68645
 */
function solution(n) {
  const snail = Array(n)
    .fill()
    .map(() => []);

  let num = 1; // 시작 숫자
  let [y, x, dir, len] = [0, 0, "d", n];

  while (len) {
    switch (dir) {
      case "d":
        for (let i = 0; i < len; i++) {
          snail[y++][x] = num++;
        }
        [y, x, dir, len] = [y - 1, x + 1, "l", len - 1];
        break;
      case "l":
        for (let i = 0; i < len; i++) {
          snail[y][x++] = num++;
        }
        [y, x, dir, len] = [y - 1, x - 2, "u", len - 1];
        break;
      case "u":
        for (let i = 0; i < len; i++) {
          snail[y--][x--] = num++;
        }
        [y, x, dir, len] = [y + 2, x + 1, "d", len - 1];
        break;
    }
  }

  console.table(snail);

  // return snail.reduce((arr, cur) => arr.concat(cur), []);
  return snail.flat();
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    { n: 4, result: [1, 2, 9, 3, 10, 8, 4, 5, 6, 7] },
    { n: 5, result: [1, 2, 12, 3, 13, 11, 4, 14, 15, 10, 5, 6, 7, 8, 9] },
    { n: 6, result: [1, 2, 15, 3, 16, 14, 4, 17, 21, 13, 5, 18, 19, 20, 12, 6, 7, 8, 9, 10, 11] },
    {
      n: 7,
      result: [1, 2, 18, 3, 19, 17, 4, 20, 27, 16, 5, 21, 28, 26, 15, 6, 22, 23, 24, 25, 14, 7, 8, 9, 10, 11, 12, 13]
    },
    {
      n: 8,
      result: [
        1, 2, 21, 3, 22, 20, 4, 23, 33, 19, 5, 24, 34, 32, 18, 6, 25, 35, 36, 31, 17, 7, 26, 27, 28, 29, 30, 16, 8, 9,
        10, 11, 12, 13, 14, 15
      ]
    },
    {
      n: 9,
      result: [
        1, 2, 24, 3, 25, 23, 4, 26, 39, 22, 5, 27, 40, 38, 21, 6, 28, 41, 45, 37, 20, 7, 29, 42, 43, 44, 36, 19, 8, 30,
        31, 32, 33, 34, 35, 18, 9, 10, 11, 12, 13, 14, 15, 16, 17
      ]
    },
    {
      n: 10,
      result: [
        1, 2, 27, 3, 28, 26, 4, 29, 45, 25, 5, 30, 46, 44, 24, 6, 31, 47, 54, 43, 23, 7, 32, 48, 55, 53, 42, 22, 8, 33,
        49, 50, 51, 52, 41, 21, 9, 34, 35, 36, 37, 38, 39, 40, 20, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
      ]
    }
  ];

  const success = testCases.every((tc) => {
    const answer = solution(tc.n);
    // console.log(answer, tc.result);
    return require("lodash").isEqual(answer, tc.result);
  });
  console.log(success);
}

module.exports = solution;
