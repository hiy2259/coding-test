/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/42587
 */

function validPriorities(priorities) {
  return 1 <= priorities.length && priorities.length <= 100 && priorities.every(validPriority);
}
function validPriority(priority) {
  return 1 <= priority && priority <= 9;
}
function validLocation(location, priorities) {
  return 0 <= location <= priorities.length - 1;
}

function solution(priorities, location) {
  if (!validPriorities(priorities)) {
    throw new Error("Invalid arguments: " + JSON.stringify(priorities));
  }
  if (!validLocation(location, priorities)) {
    throw new Error("Invalid arguments: " + JSON.stringify(location));
  }

  const targetP = priorities[location];
  const queue = priorities
    .map((p, i) => ({ p, i })) // 원래 위치를 저장
    .filter((item) => item.p >= targetP); // 더 낮은 우선 순위는 처리 불필요

  let answer = 0;

  while (queue.length) {
    // 큐에서 프로세스 꺼내기
    const curr = queue.shift();

    if (queue.find((item) => item.p > curr.p)) {
      // 큐에 우선순위가 더 높은 프로세스가 있으면 다시 큐에 넣기
      queue.push(curr);
    } else {
      // 실행
      answer++;
      // 실행한 프로세스의 초기 위치와 지정한 위치(location)이 같으면 중단
      if (curr.i === location) {
        break;
      }
    }
  }

  return answer;
}

function solutionOther(args) {
  return null;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    { priorities: [2, 1, 3, 2], location: 2, result: 1 },
    { priorities: [1, 1, 9, 1, 1, 1], location: 0, result: 5 },
    { priorities: [1, 1, 9, 1, 1, 1], location: 1, result: 6 },
    { priorities: [1, 1, 2, 7, 4, 1, 1], location: 0, result: 6 },
    { priorities: [1, 1, 2, 7, 4, 1, 1], location: 1, result: 7 },
    { priorities: [1, 1, 2, 7, 4, 1, 1], location: 2, result: 3 },
    { priorities: [1, 1, 2, 7, 4, 1, 1], location: 3, result: 1 },
    { priorities: [1, 4, 9, 9, 3, 5, 8, 9, 3], location: 4, result: 7 },
    { priorities: [1, 4, 9, 9, 3, 5, 8, 9, 3], location: 3, result: 2 },
    { priorities: [1, 4, 9, 9, 3, 5, 8, 9, 3], location: 8, result: 8 }
  ];

  const success = testCases.every((item) => {
    console.log(solution(item.priorities, item.location), item.result);
    return require("lodash").isEqual(solution(item.priorities, item.location), item.result);
  });
  console.log(success);
}

module.exports = solution;
