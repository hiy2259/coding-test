/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/120876?language=javascript
 * * 제한사항
 * - lines의 길이 = 3
 * - lines의 원소의 길이 = 2
 * - 모든 선분은 길이가 1 이상입니다.
 * - lines의 원소는 [a, b] 형태이며, a, b는 각각 선분의 양 끝점 입니다.
 * - -100 ≤ a < b ≤ 100
 *
 * => 선분의 교집합 / 합집합 구하는 문제
 * => 세 선분이 모두 겹치는 경우 vs 아닌 경우 나누어 처리 필요
 *
 * !! 모든 선분의 교집합 선분을 구해서 길이 더한뒤
 * !! 교집합 선분 끼리의 교집합 선분을 구해서 빼기
 */

function validPoint(point) {
  return -100 <= point && point <= 100;
}
function validLine(line) {
  return line.length === 2 && line[1] - line[0] >= 1 && line.every(validPoint);
}

function isLineIntersection(la, lb) {
  return la[0] < lb[0] ? la[1] > lb[0] : lb[1] > la[0];
}
function getLineIntersection(la, lb) {
  return isLineIntersection(la, lb) ? [Math.max(la[0], lb[0]), Math.min(la[1], lb[1])] : null;
}

function solution(lines) {
  const linesLength = lines.length;
  if (!(linesLength === 3 && lines.every(validLine))) {
    throw new Error("Invalid arguments: " + JSON.stringify(lines));
  }

  let line01 = getLineIntersection(lines[0], lines[1]);
  let line02 = getLineIntersection(lines[0], lines[2]);
  let line12 = getLineIntersection(lines[1], lines[2]);

  // 세 선분이 모두 겹치면
  if (line01 && line02 && line12) {
    return Math.max(line01[1], line02[1], line12[1]) - Math.min(line01[0], line02[0], line12[0]);
  } else {
    return [line01, line02, line12].reduce((sum, b) => {
      return sum + (b ? b[1] - b[0] : 0);
    }, 0);
  }
}

function solution2(lines) {
  const linesLength = lines.length;
  if (!(linesLength === 3 && lines.every(validLine))) {
    throw new Error("Invalid arguments: " + JSON.stringify(lines));
  }

  let min = 100;
  let max = -100;
  for (const line of lines) {
    min = Math.min(min, line[0]);
    max = Math.max(max, line[1]);
  }

  let cnt = 0;
  for (let i = min; i < max; i++) {
    // is constains line 2 more
    if (lines.filter((line) => line[0] <= i && i + 1 <= line[1]).length > 1) {
      cnt++;
    }
  }
  return cnt;
}

function solutionOther(lines) {
  let line = new Array(200).fill(0);

  lines.forEach(([a, b]) => {
    for (; a < b; a++) {
      line[a + 100]++;
    }
  });

  return line.reduce((a, c) => (c > 1 ? a + 1 : a), 0);
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    [
      [0, 1],
      [2, 5],
      [3, 9]
    ],
    [
      [-1, 1],
      [1, 3],
      [3, 9]
    ],
    [
      [0, 5],
      [3, 9],
      [1, 10]
    ],

    [
      [1, 2],
      [1, 3],
      [1, 2]
    ],
    [
      [4, 7],
      [4, 5],
      [6, 7]
    ],
    [
      [1, 2],
      [2, 3],
      [3, 4]
    ],
    [
      [1, 3],
      [2, 5],
      [0, 7]
    ],
    [
      [1, 12],
      [3, 6],
      [2, 4]
    ],
    [
      [0, 9],
      [-1, 0],
      [2, 5]
    ],
    [
      [-1, 0],
      [0, 1],
      [1, 2]
    ],

    [
      [4, 9],
      [3, 6],
      [2, 4]
    ],
    [
      [0, 8],
      [3, 8],
      [8, 9]
    ],
    [
      [1, 9],
      [-1, 3],
      [2, 7]
    ]
  ];
  const results = [2, 0, 8, 1, 2, 0, 4, 4, 3, 0, 3, 5, 6];

  //    |---|
  //           |--------|
  //              |-----------------|
  // -1  0  1  2  3  4  5  6  7  8  9 10
  //  |-----|
  //        |-----|
  //              |-----------------|
  // -1  0  1  2  3  4  5  6  7  8  9 10
  //     |--------------|
  //              |-----------------|
  //        |--------------------------|
  // -1  0  1  2  3  4  5  6  7  8  9 10

  //        |--|
  //        |-----|
  //        |--|
  // -1  0  1  2  3  4  5  6  7  8  9 10
  //                 |--------|
  //                 |--|
  //                       |--|
  // -1  0  1  2  3  4  5  6  7  8  9 10
  //        |--|
  //           |--|
  //              |--|
  // -1  0  1  2  3  4  5  6  7  8  9 10
  //        |-----|
  //           |--------|
  //     |--------------------|
  // -1  0  1  2  3  4  5  6  7  8  9 10
  //        |--------------------------------|
  //              |--------|
  //           |-----|
  // -1  0  1  2  3  4  5  6  7  8  9 10 11 12
  //     |--------------------------|
  //  |--|
  //           |--------|
  // -1  0  1  2  3  4  5  6  7  8  9 10 11 12
  //  |--|
  //     |--|
  //        |--|
  // -1  0  1  2  3  4  5  6  7  8  9 10 11 12

  //                 |--------------|
  //              |--------|
  //           |-----|
  // -1  0  1  2  3  4  5  6  7  8  9 10 11 12

  //     |-----------------------|
  //              |--------------|
  //                          |-----|
  // -1  0  1  2  3  4  5  6  7  8  9 10 11 12
  //        |-----------------------|
  //  |-----------|
  //           |--------------|
  // -1  0  1  2  3  4  5  6  7  8  9 10 11 12

  const success = testCases.every((lines, index) => {
    // console.log(solution(lines), results[index]);
    return solution(lines) === results[index];
  });
  console.log(success);

  const success2 = testCases.every((lines, index) => {
    // console.log(solution2(lines), results[index]);
    return solution2(lines) === results[index];
  });
  console.log(success2);
}

module.exports = solution;
