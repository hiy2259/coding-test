/**
 * 피로도 (완전탐색): https://school.programmers.co.kr/learn/courses/30/lessons/87946
 */

const getPermutations = function (arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((value) => [value]); // 1개씩 택할 때, 바로 모든 배열의 원소 return

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)]; // 해당하는 fixed를 제외한 나머지 배열
    const permutations = getPermutations(rest, selectNumber - 1); // 나머지에 대해 순열을 구한다.
    const attached = permutations.map((permutation) => [fixed, ...permutation]); // 돌아온 순열에 대해 떼 놓은(fixed) 값 붙이기
    results.push(...attached); // 배열 spread syntax 로 모두다 push
  });

  return results; // 결과 담긴 results return
};

// 던전 방문 횟수 계산
function clacVisitCount(k, dungeons, idxArr) {
  let cnt = 0;

  for (const idx of idxArr) {
    const [needK, useK] = dungeons[idx];

    // 던전 진입 가능 ?
    if (needK <= k && useK <= k) {
      // 피로도 소모
      k -= useK;
      cnt++;
    } else {
      break;
    }
  }

  return cnt;
}

function solution(k, dungeons) {
  let answer = -1;

  for (const idxArr of getPermutations(
    dungeons.map((d, i) => i),
    dungeons.length
  )) {
    const count = clacVisitCount(k, dungeons, idxArr);
    answer = Math.max(count, answer);
    // 던전을 모두 돌았다면 더 계산할 필요 없음
    if (answer === dungeons.length) {
      break;
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
    {
      k: 80,
      dungeons: [
        [80, 20],
        [50, 40],
        [30, 10]
      ],
      answer: 3
    },
    {
      k: 40,
      dungeons: [
        [40, 20],
        [10, 10],
        [10, 10],
        [10, 10],
        [10, 10]
      ],
      answer: 4
    },
    {
      k: 70,
      dungeons: [
        [70, 60],
        [50, 30],
        [40, 30]
      ],
      answer: 2
    },
    {
      k: 100,
      dungeons: [
        [80, 8],
        [90, 9],
        [100, 10]
      ],
      answer: 3
    }
  ];

  const success = testCases.every((item) => {
    // console.log(solution(item.k, item.dungeons), item.answer);
    return require("lodash").isEqual(solution(item.k, item.dungeons), item.answer);
  });
  console.log(success);
}

module.exports = solution;
