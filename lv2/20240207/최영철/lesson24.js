/**
 * 무인도 여행: https://school.programmers.co.kr/learn/courses/30/lessons/154540
 */
function solution(maps) {
  const rl = maps.length;
  const cl = maps[0].length;

  const visitedMap = {};
  const foods = [];
  let numIsland = 0;

  function canVisitTile(r, c) {
    return maps[r][c] !== "X" && !isVisitedTile(r, c);
  }
  function visitTile(r, c) {
    visitedMap[r] = visitedMap[r] || {};
    visitedMap[r][c] = true;
  }
  function isVisitedTile(r, c) {
    return visitedMap[r] && visitedMap[r][c];
  }

  function searchLand(r, c, number) {
    if (!canVisitTile(r, c)) {
      return;
    }

    // 식량 합산
    const food = +maps[r][c];
    foods[number] = foods[number] ? foods[number] + food : food;

    // 섬 번호 마크
    visitTile(r, c);

    if (r > 0) searchLand(r - 1, c, number); // move up
    if (r < rl - 1) searchLand(r + 1, c, number); // move down
    if (c > 0) searchLand(r, c - 1, number); // move left
    if (c < cl - 1) searchLand(r, c + 1, number); // move right
  }

  for (let r = 0; r < rl; r++) {
    for (let c = 0; c < cl; c++) {
      if (canVisitTile(r, c)) {
        searchLand(r, c, numIsland++);
      }
    }
  }

  return foods.length ? foods.sort((a, b) => a - b) : [-1];
}

function solutionOther(maps) {
  var answer = [];
  return answer;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    { maps: ["X591X", "X1X5X", "X231X", "1XXX1"], result: [1, 1, 27] },
    { maps: ["XXX", "X7X", "XXX"], result: [7] },
    { maps: ["1X1", "X3X", "1X1"], result: [1, 1, 1, 1, 3] },
    { maps: ["XXX", "XXX", "XXX"], result: [-1] }
  ];

  const success = testCases.every((tc) => {
    console.log(solution(tc.maps), tc.result);
    return require("lodash").isEqual(solution(tc.maps), tc.result);
  });
  console.log(success);
}

module.exports = solution;
