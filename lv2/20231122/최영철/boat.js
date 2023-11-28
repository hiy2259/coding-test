/**
 * 구명보트 (탐욕법): https://school.programmers.co.kr/learn/courses/30/lessons/42885
 */

// NOTE: 결과 실패
function solution(people, limit) {
  people = people.slice(0);

  let answer = 0;

  while (people.length) {
    const currP = people.shift();
    let otherI = -1;

    for (let i = 0; i < people.length; i++) {
      const otherP = people[i];
      // 같이 탈 수 있는 사람이 있으면
      if (currP + otherP <= limit) {
        // 태우고
        answer++;
        // 같이 탄 사람 기억
        otherI = i;
        break;
      }
    }

    // 같이 탄 사람이 있는 경우
    if (otherI !== -1) {
      // 같이 탄 사람을 제거
      people.splice(otherI, 1);
    } else {
      // 사람들을 구출할 수 없는 경우는 없으므로 태우기
      answer++;
    }
  }

  return answer;
}

function solutionOther(people, limit) {
  people = people.slice(0).sort();

  let answer = 0;
  let front = 0;
  let rear = people.length - 1;

  while (front <= rear) {
    if (people[front] + people[rear] <= limit) {
      ++front;
    }
    --rear;
    ++answer;
  }

  return answer;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    {
      people: [70, 50, 80, 50],
      limit: 100,
      answer: 3
    },
    {
      people: [70, 80, 50],
      limit: 100,
      answer: 3
    },
    {
      people: [40, 40, 40, 40, 50],
      limit: 200,
      answer: 3
    },
    {
      people: [40, 40, 50, 50],
      limit: 200,
      answer: 2
    },
    {
      people: [60, 60, 51, 51, 100],
      limit: 100,
      answer: 5
    },
    {
      people: [40],
      limit: 40,
      answer: 1
    },
    {
      people: [40, 55, 55, 60, 60, 60, 70, 80],
      limit: 100,
      answer: 7
    }
  ];

  const success = testCases.every((item) => {
    console.log(solution(item.people, item.limit), item.answer);
    return require("lodash").isEqual(solution(item.people, item.limit), item.answer);
  });
  console.log(success);
}

module.exports = solution;
