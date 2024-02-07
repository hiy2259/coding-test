/**
 * 가장 많이 받은 선물: https://school.programmers.co.kr/learn/courses/30/lessons/258712
 */
function solution(friends, gifts) {
  const giftMap = {};
  const coefMap = {};
  const answerMap = {};

  // 초기화
  friends.forEach((f1) => {
    giftMap[f1] = {};
    friends.forEach((f2) => {
      giftMap[f1][f2] = 0;
    });
    coefMap[f1] = 0;
    answerMap[f1] = 0;
  });

  // 집계
  gifts.forEach((log) => {
    const [g, r] = log.split(" ");
    giftMap[g][r] = giftMap[g][r] + 1;
    coefMap[g] = coefMap[g] + 1;
    coefMap[r] = coefMap[r] - 1;
  });

  // 계산
  friends.forEach((g) => {
    friends.forEach((r) => {
      if (g === r || giftMap[g][r] < giftMap[r][g]) {
        return;
      }

      if (giftMap[g][r] > giftMap[r][g] || coefMap[g] > coefMap[r]) {
        answerMap[g] += 1;
      }
    });
  });

  return Math.max(...Object.values(answerMap));
}

function solutionOther(friends, gifts) {
  var answer = 0;
  return answer;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    {
      friends: ["muzi", "ryan", "frodo", "neo"],
      gifts: [
        "muzi frodo",
        "muzi frodo",
        "ryan muzi",
        "ryan muzi",
        "ryan muzi",
        "frodo muzi",
        "frodo ryan",
        "neo muzi"
      ],
      result: 2
    },
    {
      friends: ["joy", "brad", "alessandro", "conan", "david"],
      gifts: ["alessandro brad", "alessandro joy", "alessandro conan", "david alessandro", "alessandro david"],
      result: 4
    },
    { friends: ["a", "b", "c"], gifts: ["a b", "b a", "c a", "a c", "a c", "c a"], result: 0 }
  ];

  const success = testCases.every((tc) => {
    console.log(solution(tc.friends, tc.gifts), tc.result);
    return require("lodash").isEqual(solution(tc.friends, tc.gifts), tc.result);
  });
  console.log(success);
}

module.exports = solution;
