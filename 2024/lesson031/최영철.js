/**
 * Lv3: [인사고과](https://school.programmers.co.kr/learn/courses/30/lessons/152995)
 *
 * 참고: https://godgjwnsgur7.tistory.com/195
 * 참고: forEach, some 등의 함수가 for 문에 비해 시간이 오래 걸린다.
 * 점수: +16
 */

function solution(scores) {
  function isLtBoth(score, s) {
    return score[0] < s[0] && score[1] < s[1];
  }

  const wanho = scores[0];
  const wanhoSum = wanho[0] + wanho[1];
  let wanhoRank = 1;

  // 완호보다 총합이 높은 사원만 추출
  const filtered = [];

  for (let i = 1; i < scores.length; i++) {
    const s = scores[i];

    s[2] = s[0] + s[1]; // sum
    if (s[2] > wanhoSum) {
      filtered.push(s);
    }
  }

  // 총합 기준 내림차순 정렬
  filtered.sort((sa, sb) => sb[2] - sa[2]);

  for (let i = 0; i < filtered.length; i++) {
    const s = filtered[i];

    // 완호가 인센티브 못 받음
    if (isLtBoth(wanho, s)) {
      return -1;
    }

    let isSomeLt = false;
    // 해당 사원보다 총합이 같거나 큰 대상하고만 비교
    // 인센티브 못받는 사원은 석차에서 제외
    for (let j = 0; j < i; j++) {
      // 해당 사원이 인센티브를 받지 못하는지 체크
      if (isLtBoth(s, filtered[j])) {
        isSomeLt = true;
        break;
      }
    }

    if (!isSomeLt) {
      wanhoRank++;
    }
  }

  return wanhoRank;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    {
      scores: [
        [2, 2],
        [1, 4],
        [3, 2],
        [3, 2],
        [2, 1]
      ],
      answer: 4
    },
    {
      scores: [
        [3, 2],
        [2, 3],
        [3, 2],
        [2, 3]
      ],
      answer: 1
    },
    {
      scores: [
        [2, 1],
        [2, 2],
        [2, 3],
        [3, 1]
      ],
      answer: 4
    },
    {
      scores: [
        [7, 1],
        [6, 6],
        [5, 4],
        [5, 4],
        [6, 6]
      ],
      answer: 3
    },
    {
      scores: [
        [3, 1],
        [2, 5],
        [2, 10]
      ],
      answer: 3
    },
    {
      scores: [
        [4, 0],
        [2, 3],
        [4, 4],
        [2, 6]
      ],
      answer: 3
    },
    {
      scores: [
        [100, 2],
        [100, 1],
        [50, 1]
      ],
      answer: 1
    },
    {
      scores: [
        [5, 5],
        [11, 2],
        [10, 1]
      ],
      answer: 2
    },
    {
      scores: [
        [2, 2],
        [2, 2],
        [2, 3],
        [3, 2]
      ],
      answer: 3
    },
    {
      scores: [
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1]
      ],
      answer: 1
    },
    {
      scores: [
        [3, 1],
        [1, 4],
        [2, 3],
        [2, 3],
        [1, 5],
        [1, 0],
        [1, 0]
      ],
      answer: 5
    },
    {
      scores: [
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5]
      ],
      answer: -1
    }
  ];

  testCases.forEach((tc) => {
    const answer = solution(tc.scores);
    console.log(answer, tc.answer, require("lodash").isEqual(answer, tc.answer));
  });
}

module.exports = solution;
