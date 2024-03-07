/**
 * 가장 큰 정사각형 찾기: https://school.programmers.co.kr/learn/courses/30/lessons/12905
 */
function solution(board) {
  const rowLength = board.length;
  const colLength = board[0].length;

  let answer = 0;
  for (let r = 1; r < rowLength; r++) {
    for (let c = 1; c < colLength; c++) {
      if (board[r][c]) {
      }
    }
  }
  return answer ** 2;
}

function solutionOther(board) {
  const rowLength = board.length;
  const colLength = board[0].length;

  let answer = 0;
  for (let r = 1; r < rowLength; r++) {
    for (let c = 1; c < colLength; c++) {
      if (board[r][c]) {
        board[r][c] = Math.min(board[r - 1][c], board[r][c - 1], board[r - 1][c - 1]) + 1;
        answer = Math.max(board[r][c], answer);
      }
    }
  }
  return answer ** 2;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    {
      board: [
        [0, 1, 1, 1], // 1, 3 - 3
        [1, 1, 1, 1], // 0, 3 - 4
        [1, 1, 1, 1], // 0, 3 - 4
        [0, 0, 1, 0] // 2, 2 - 1
      ],
      answer: 9
    },
    {
      board: [
        [0, 0, 1, 1],
        [1, 1, 1, 1]
      ],
      answer: 4
    },
    {
      board: [
        [1, 1, 0, 0],
        [1, 1, 1, 1]
      ],
      answer: 4
    },
    {
      board: [
        [0, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 0, 1, 0]
      ],
      answer: 4
    },
    {
      board: [
        [1, 0, 1, 1],
        [0, 0, 1, 1],
        [1, 1, 1, 1],
        [1, 0, 1, 0]
      ],
      answer: 4
    },
    {
      board: [
        [0, 0, 1, 1],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 0]
      ],
      answer: 1
    },
    {
      board: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      answer: 0
    }
  ];

  const success = testCases.every((tc) => {
    console.log(solution(tc.board), tc.answer);
    return require("lodash").isEqual(solution(tc.board), tc.answer);
  });
  console.log(success);
}

module.exports = solution;
