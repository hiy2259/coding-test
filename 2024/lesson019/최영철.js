/**
 * [3차] 파일명 정렬: https://school.programmers.co.kr/learn/courses/30/lessons/17686
 */

function solution(files) {
  // 영문 대소문자, 숫자, 공백(" "), 마침표("."), 빼기 부호("-")
  const re = /^(\D+)(\d{1,5})/;

  return files.sort((fa, fb) => {
    // 정규식 capturing group
    // SEE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Capturing_group
    const ma = re.exec(fa);
    const mb = re.exec(fb);
    if (!ma || !mb) {
      return 0; // arg error 상황
    }

    let [headA, numberA] = ma.slice(1);
    let [headB, numberB] = mb.slice(1);
    // 대소문자 무시
    headA = headA.toLowerCase();
    headB = headB.toLowerCase();
    if (headA !== headB) {
      return headA > headB ? 1 : -1;
    } else {
      return +numberA - +numberB;
    }
  });
}

function solution2(files) {
  // SEE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator
  const replacer = (file) => {
    // 비교 기준이 되는 문자열을 제외하고 제거
    // ex) img1.png -> img1
    // ex) A-10 Thunderbolt II -> A-10
    return file.replace(/^(\D+)(\d{1,5}).*/, "$1$2");
  };
  const compare = new Intl.Collator(undefined, { sensitivity: "case", numeric: true }).compare;

  return files.sort((fa, fb) => {
    return compare(replacer(fa), replacer(fb));
  });
}

function solutionOther(files) {
  var answer = [];
  return answer;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    {
      input: ["img12.png", "img10.png", "img02.png", "img1.png", "IMG01.GIF", "img2.JPG"],
      output: ["img1.png", "IMG01.GIF", "img02.png", "img2.JPG", "img10.png", "img12.png"]
    },
    {
      input: ["F-5 Freedom Fighter", "B-50 Superfortress", "A-10 Thunderbolt II", "F-14 Tomcat"],
      output: ["A-10 Thunderbolt II", "B-50 Superfortress", "F-5 Freedom Fighter", "F-14 Tomcat"]
    }
  ];

  const success = testCases.every((tc) => {
    console.log(solution2(tc.input), tc.output);
    return require("lodash").isEqual(solution2(tc.input), tc.output);
  });
  console.log(success);
}

module.exports = solution;
