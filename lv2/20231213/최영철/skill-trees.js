/**
 * 스킬트리: https://school.programmers.co.kr/learn/courses/30/lessons/49993
 */

function solution(skill, skill_trees) {
  // skill 비포함 문자를 찾는 정규식 생성
  const reExclude = new RegExp(`[^${skill}]+`, "g");

  return skill_trees.filter((st) => {
    // skill 에 포함되지 않은 문자를 모두 제거
    // ex) BACDE ∩ CBD = BCD, AECB ∩ CBD = CB
    const excluded = st.replace(reExclude, "");
    // skill 에 포함 & 시작 여부 검사
    // ex) CBD.startsWith(BCD) == false, CBD.startsWith(CB) == true
    return skill.startsWith(excluded);
  }).length;
}

function solutionOther(skill, skill_trees) {
  var answer = -1;
  return answer;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    {
      skill: "CBD",
      skill_trees: ["BACDE", "CBADF", "AECB", "BDA"],
      result: 2
    },
    {
      skill: "CBD",
      skill_trees: ["BACDE", "CBADF", "AECB", "BDA", "AQWER"],
      result: 3
    },
    {
      skill: "CBD",
      skill_trees: ["CBADE", "ADF", "ZYED", "BDA"],
      result: 1
    },
    {
      skill: "GTA",
      skill_trees: ["MICRSOFT", "SONY", "NITEDO", "SEGA", "ENIX", "FROM", "CDPR"],
      result: 4
    }
  ];

  const success = testCases.every((tc) => {
    console.log(solution(tc.skill, tc.skill_trees), tc.result);
    return require("lodash").isEqual(solution(tc.skill, tc.skill_trees), tc.result);
  });
  console.log(success);
}

module.exports = solution;
