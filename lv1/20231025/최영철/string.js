/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/12915
 * - strings는 길이 1 이상, 50이하인 배열입니다.
 * - strings의 원소는 소문자 알파벳으로 이루어져 있습니다.
 * - strings의 원소는 길이 1 이상, 100이하인 문자열입니다.
 * - 모든 strings의 원소의 길이는 n보다 큽니다.
 * - 인덱스 1의 문자가 같은 문자열이 여럿 일 경우, 사전순으로 앞선 문자열이 앞쪽에 위치합니다.
 *
 * => 단순 문자열 비교 연산 문제 ?
 */

function validString(str, n) {
  return new RegExp(`^[a-z]{${n},100}$`).test(str);
}

function solution(strings, n) {
  if (!(0 <= n && n < 100)) {
    throw new Error("Invalid arguments n: " + n);
  }
  if (!(1 <= strings.length && strings.length <= 50 && strings.every((str) => validString(str, n)))) {
    throw new Error("Invalid arguments strings: " + JSON.stringify(strings));
  }

  const compare = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    if (a === b) return 0;
  };

  return strings.slice(0).sort((sa, sb) => {
    return compare(sa[n], sb[n]) || compare(sa, sb);
  });
}

function solutionOther() {
  return null;
}

/**
 * run & test
 */
if (require.main === module) {
  const _ = require("lodash");

  const makeRdChar = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 97)); // a-z
  };
  const makeRdString = () => {
    let str = "";
    for (let i = 0; i < Math.floor(Math.random() * 98 + 3); i++) { // 3~100
      str = str + makeRdChar();
    }
    return str;
  };
  const makeRdStringArray = () => {
    let arr = [];
    for (let i = 0; i < Math.floor(Math.random() * 48 + 3); i++) { // 3~50
      arr.push(makeRdString());
    }
    return arr;
  };

  const rdStrings = makeRdStringArray();
  const rdN = Math.min(...rdStrings.map((str) => str.length)) - 1;

  const testCases = [
    { strings: ["sun", "bed", "car"], n: 1 },
    { strings: ["abce", "abcd", "cdx"], n: 2 },
    { strings: rdStrings, n: rdN }
  ];
  const results = [
    ["car", "bed", "sun"],
    ["abcd", "abce", "cdx"],
    solution(rdStrings, rdN)
  ];

  const success = testCases.every((params, index) => {
    console.log(params.strings, params.n, solution(params.strings, params.n), results[index]);
    return _.isEqual(solution(params.strings, params.n), results[index]);
  });
  console.log(success);
}

module.exports = solution;
