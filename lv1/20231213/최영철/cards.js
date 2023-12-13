/**
 * 카드 뭉치: https://school.programmers.co.kr/learn/courses/30/lessons/159994
 */

// 카드를 반드시 사용
function solution(cards1, cards2, goal) {
  const possible = goal.every((gWord) => {
    if (cards1[0] === gWord) {
      cards1.shift();
      return true;
    } else if (cards2[0] === gWord) {
      cards2.shift();
      return true;
    } else {
      return false;
    }
  });
  return possible ? "Yes" : "No";
}

// 불필요한 카드는 버릴 수 있음
function solution2(cards1, cards2, goal) {
  const possible = goal.every((gWord) => {
    const c1Idx = cards1.indexOf(gWord);
    const c2Idx = cards2.indexOf(gWord);

    if (c1Idx !== -1) {
      cards1.splice(0, c1Idx + 1);
      return true;
    } else if (c2Idx !== -1) {
      cards2.splice(0, c2Idx + 1);
      return true;
    } else {
      return false;
    }
  });

  return possible ? "Yes" : "No";
}

function solutionOther(cards1, cards2, goal) {
  var answer = "";
  return answer;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    {
      cards1: ["i", "drink", "water"],
      cards2: ["want", "to"],
      goal: ["i", "want", "to", "drink", "water"],
      result: "Yes"
    },
    {
      cards1: ["i", "water", "drink"],
      cards2: ["want", "to"],
      goal: ["i", "want", "to", "drink", "water"],
      result: "No"
    },
    {
      cards1: ["we", "love", "you", "three", "thousand"],
      cards2: [],
      goal: ["we", "love", "you", "three", "thousand"],
      result: "Yes"
    },
    {
      cards1: [],
      cards2: ["we", "love", "you", "three", "thousand"],
      goal: ["we", "love", "you", "three", "thousand"],
      result: "Yes"
    },
    {
      cards1: ["a", "b", "c"],
      cards2: ["d", "e", "f"],
      goal: ["a", "d", "f"],
      result: "No"
    },
    {
      cards1: ["def", "bcd"],
      cards2: ["b", "c", "d"],
      goal: ["bcd"],
      result: "No"
    }
  ];

  const success = testCases.every((tc) => {
    console.log(solution(tc.cards1.slice(0), tc.cards2.slice(0), tc.goal), tc.result);
    return require("lodash").isEqual(solution(tc.cards1.slice(0), tc.cards2.slice(0), tc.goal), tc.result);
  });
  console.log(success);
}

module.exports = solution;
