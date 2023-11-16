/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/92334
2 ≤ id_list의 길이 ≤ 1,000
  1 ≤ id_list의 원소 길이 ≤ 10
  id_list의 원소는 이용자의 id를 나타내는 문자열이며 알파벳 소문자로만 이루어져 있습니다.
  id_list에는 같은 아이디가 중복해서 들어있지 않습니다.
1 ≤ report의 길이 ≤ 200,000
  3 ≤ report의 원소 길이 ≤ 21
  report의 원소는 "이용자id 신고한id"형태의 문자열입니다.
  예를 들어 "muzi frodo"의 경우 "muzi"가 "frodo"를 신고했다는 의미입니다.
  id는 알파벳 소문자로만 이루어져 있습니다.
  이용자id와 신고한id는 공백(스페이스)하나로 구분되어 있습니다.
  자기 자신을 신고하는 경우는 없습니다.
1 ≤ k ≤ 200, k는 자연수입니다.
return 하는 배열은 id_list에 담긴 id 순서대로 각 유저가 받은 결과 메일 수를 담으면 됩니다.
 */

function validId(id) {
  return /^[a-z]{1,10}$/.test(id);
}
function validIdList(list) {
  return 2 <= list.length && list.length <= 1000 && list.every(validId) && [...new Set(list)].length === list.length;
}
function validReport(list) {
  return (
    1 <= list.length &&
    list.length <= 200000 &&
    list.every((item) => {
      const spd = item.split(" ");
      return spd[0] !== spd[1] && spd.every(validId);
    })
  );
}
function validK(k) {
  return k % 1 === 0 && 1 <= k && k <= 200;
}

function solution(idList, report, k) {
  if (!validIdList(idList)) {
    throw new Error("Invalid arguments: " + JSON.stringify(idList));
  }
  if (!validReport(report)) {
    throw new Error("Invalid arguments: " + JSON.stringify(report));
  }
  if (!validK(k)) {
    throw new Error("Invalid arguments: " + k);
  }

  const mailCounts = Array(idList.length).fill(0);
  const reportInfo = {};

  report.forEach((item) => {
    const [reporter, target] = item.split(" ");
    reportInfo[target] = reportInfo[target] || {};
    reportInfo[target][reporter] = true;
  });

  for (const reporter of Object.values(reportInfo)) {
    const reporters = Object.keys(reporter);
    if (reporters.length >= k) {
      for (const reporter of reporters) {
        const idIdx = idList.indexOf(reporter);
        if (idIdx !== -1) {
          mailCounts[idIdx] += 1;
        }
      }
    }
  }

  return mailCounts;
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
      id_list: ["muzi", "frodo", "apeach", "neo"],
      report: ["muzi frodo", "apeach frodo", "frodo neo", "muzi neo", "apeach muzi"],
      k: 2
    },
    {
      id_list: ["con", "ryan"],
      report: ["ryan con", "ryan con", "ryan con", "ryan con"],
      k: 3
    }
  ];
  const results = [
    [2, 1, 1, 0],
    [0, 0]
  ];

  const success = testCases.every((item, index) => {
    console.log(solution(item.id_list, item.report, item.k), results[index]);
    return require("lodash").isEqual(solution(item.id_list, item.report, item.k), results[index]);
  });
  console.log(success);
}

module.exports = solution;
