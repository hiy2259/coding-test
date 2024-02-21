/**
 * 광물 캐기: https://school.programmers.co.kr/learn/courses/30/lessons/172927
 */
function solution(picks, minerals) {
  const fatigueMap = {
    dia: { diamond: 1, iron: 1, stone: 1 },
    iron: { diamond: 5, iron: 1, stone: 1 },
    stone: { diamond: 25, iron: 5, stone: 1 }
  };
  let [dia, iron, stone] = picks;
  let fatigue = 0;

  // 곡괭이 개수 * 5 만큼만 캘 수 있다.
  const sum = picks.reduce((acc, cur) => acc + cur, 0);
  minerals = minerals.slice(0, sum * 5);

  // 5개씩 분할하며 광물 종류별 개수 세기
  const mineralsCntList = [];

  for (let i = 0; i < minerals.length; i += 5) {
    const mnrs = minerals.slice(i, i + 5);

    const countMap = { diamond: 0, iron: 0, stone: 0 };
    for (const mnr of mnrs) {
      countMap[mnr] += 1;
    }

    mineralsCntList.push(countMap);
  }

  // 광물 종류별 & 개수 순으로 역순 정렬 (피로도 높은 순으로, diamond > iron > stone)
  mineralsCntList.sort(function (idxs1, idxs2) {
    return idxs2.diamond - idxs1.diamond || idxs2.iron - idxs1.iron || idxs2.stone - idxs1.stone;
  });

  // 피로도 계산 (dia > iron > stone 순으로 사용)
  for (const countMap of mineralsCntList) {
    if (dia) {
      dia--;
      for (const [mnr, count] of Object.entries(countMap)) {
        fatigue += fatigueMap.dia[mnr] * count;
      }
    } else if (iron) {
      iron--;
      for (const [mnr, count] of Object.entries(countMap)) {
        fatigue += fatigueMap.iron[mnr] * count;
      }
    } else if (stone) {
      stone--;
      for (const [mnr, count] of Object.entries(countMap)) {
        fatigue += fatigueMap.stone[mnr] * count;
      }
    }
  }

  return fatigue;
}

function solutionOther(picks, minerals) {
  var answer = 0;
  return answer;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    {
      picks: [1, 3, 2],
      minerals: ["diamond", "diamond", "diamond", "iron", "iron", "diamond", "iron", "stone"],
      result: 12
    },
    {
      picks: [0, 1, 1],
      minerals: [
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "iron",
        "iron",
        "iron",
        "iron",
        "iron",
        "diamond"
      ],
      result: 50
    },
    {
      picks: [2, 1, 0],
      minerals: [
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "iron",
        "iron",
        "iron",
        "iron",
        "iron",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond"
      ],
      result: 15
    },
    {
      picks: [0, 1, 0],
      minerals: ["diamond", "iron", "iron", "iron", "iron", "diamond", "diamond", "iron", "iron", "iron"],
      result: 9
    },
    {
      picks: [1, 1, 0],
      minerals: ["stone", "stone", "iron", "stone", "diamond", "diamond", "diamond", "diamond", "diamond", "diamond"],
      result: 14
    },
    {
      picks: [1, 1, 1],
      minerals: [
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "iron",
        "iron",
        "iron",
        "iron",
        "iron",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond"
      ],
      result: 55
    },
    { picks: [1, 0, 1], minerals: ["iron", "iron", "iron", "iron", "diamond", "diamond", "diamond"], result: 47 },
    {
      picks: [5, 5, 5],
      minerals: [
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond",
        "diamond"
      ],
      result: 150
    }
  ];

  const success = testCases.every((tc) => {
    console.log(solution(tc.picks, tc.minerals), tc.result);
    return require("lodash").isEqual(solution(tc.picks, tc.minerals), tc.result);
  });
  console.log(success);
}

module.exports = solution;
