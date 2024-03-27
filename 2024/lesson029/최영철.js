/**
 * [단속카메라](https://school.programmers.co.kr/learn/courses/30/lessons/42884)
 */

function isLineIntersection(la, lb) {
  return la[1] >= lb[0];
}
function getLineIntersection(la, lb) {
  return isLineIntersection(la, lb) ? [Math.max(la[0], lb[0]), Math.min(la[1], lb[1])] : null;
}

function solution(routes) {
  if (routes.length <= 1) {
    return routes.length;
  }

  routes = routes.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  let cntCross = 0;

  while (routes.length) {
    // 교차 route 찾기
    let line = routes.shift();
    const indexes = [];

    for (let i = 0; i < routes.length; i++) {
      const rst = getLineIntersection(line, routes[i]);
      if (rst) {
        line = rst;
        indexes.push(i);
      }
    }
    // 교차 route 일괄 제거
    indexes.reverse().forEach((index) => {
      routes.splice(index, 1);
    });

    cntCross++;
  }

  return cntCross;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    {
      routes: [
        [-20, -15],
        [-14, -5],
        [-18, -13],
        [-5, -3]
      ],
      result: 2
    },
    {
      routes: [
        [-2, -1],
        [1, 2],
        [-3, 0]
      ],
      result: 2
    },
    { routes: [[0, 0]], result: 1 },
    {
      routes: [
        [0, 1],
        [0, 1],
        [1, 2]
      ],
      result: 1
    },
    {
      routes: [
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7]
      ],
      result: 4
    },
    {
      routes: [
        [-20, -15],
        [-14, -5],
        [-18, -13],
        [-5, -3]
      ],
      result: 2
    },
    {
      routes: [
        [-20, 15],
        [-20, -15],
        [-14, -5],
        [-18, -13],
        [-5, -3]
      ],
      result: 2
    },
    {
      routes: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 8],
        [8, 9],
        [9, 10],
        [10, 11],
        [11, 12],
        [12, 13],
        [13, 14],
        [14, 15]
      ],
      result: 8
    },
    {
      routes: [
        [0, 12],
        [1, 12],
        [2, 12],
        [3, 12],
        [5, 6],
        [6, 12],
        [10, 12]
      ],
      result: 2
    },
    {
      routes: [
        [0, 0],
        [0, 10],
        [1, 1],
        [3, 3]
      ],
      result: 3
    },
    {
      routes: [
        [-100, 100],
        [50, 170],
        [150, 200],
        [-50, -10],
        [10, 20],
        [30, 40]
      ],
      result: 4
    },
    {
      routes: [
        [-20, 15],
        [-14, -5],
        [-18, -13],
        [-5, -3]
      ],
      result: 2
    },
    {
      routes: [
        [-2, -1],
        [1, 2],
        [-3, 0]
      ],
      result: 2
    },
    {
      routes: [
        [2, 2],
        [0, 1],
        [-10, 9]
      ],
      result: 2
    },
    {
      routes: [
        [-7, 0],
        [-6, -4],
        [-5, -3],
        [-3, -1],
        [-1, 4],
        [1, 2],
        [3, 4]
      ],
      result: 4
    },
    {
      routes: [
        [-5, -3],
        [-4, 0],
        [-4, -2],
        [-1, 2],
        [0, 3],
        [1, 5],
        [2, 4]
      ],
      result: 2
    },
    {
      routes: [
        [-191, -107],
        [-184, -151],
        [-150, -102],
        [-171, -124],
        [-120, -114]
      ],
      result: 2
    },
    {
      routes: [
        [0, 2],
        [2, 3],
        [3, 4],
        [4, 6]
      ],
      result: 2
    },
    {
      routes: [
        [0, 10],
        [1, 10],
        [2, 3],
        [4, 5]
      ],
      result: 2
    }
  ];

  const success = testCases.every((tc) => {
    const answer = solution(tc.routes);
    console.log(answer, tc.result);
    return require("lodash").isEqual(answer, tc.result);
  });
  console.log(success);
}

module.exports = solution;
