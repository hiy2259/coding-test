/**
 * 이모티콘 할인행사: https://school.programmers.co.kr/learn/courses/30/lessons/150368
 * 각 이모티콘별 최적 할인율 구하기 ?
 *
 */

// SEE: https://velog.io/@proshy/JS순열조합중복순열-구하기
function permutation(arr, selectNum) {
  const result = [];
  if (selectNum === 1) return arr.map((v) => [v]);

  arr.forEach((v, idx, arr) => {
    const fixed = v;
    const restArr = arr;
    const permutationArr = permutation(restArr, selectNum - 1);
    const combineFix = permutationArr.map((v) => [fixed, ...v]);
    result.push(...combineFix);
  });
  return result;
}

function calcResult(users, prices) {
  let cntJoin = 0; // 서비스 가입 수
  let sumAmount = 0; // 매출액

  for (const [uRate, uPrice] of users) {
    let purchased = 0;

    for (const [pRate, pPrice] of prices) {
      if (uRate <= pRate) {
        // NOTE: emoticon 가격은 100의 배수이므로 100으로 먼저 나누어 부동소수점 발생 방지
        // x * (1-0.4) = (x/100 * (100-40)/100) * 100 = x/100 * (100-40)
        let discounted = (pPrice / 100) * (100 - pRate); // 할인된 emoticon 가격
        purchased += discounted;

        // 구매 비용이 기준 이상이면
        if (purchased >= uPrice) {
          purchased = 0; // 구매 모두 취소
          cntJoin += 1; // 서비스 가입
          break;
        }
      }
    }

    sumAmount += purchased;
  }

  return [cntJoin, sumAmount];
}

function solution(users, emoticons) {
  // 할인율은 10/20/30/40% 중 하나
  const discountRates = [10, 20, 30, 40];
  const allCaseRates = permutation(discountRates, emoticons.length);

  const results = [];
  // let answer = null;

  for (const caseRates of allCaseRates) {
    const pairs = [];
    for (let i = 0; i < emoticons.length; i++) {
      pairs.push([caseRates[i], emoticons[i]]);
    }

    // 서비스 가입 수 우선, 매출액은 그 다음
    // const result = calcResult(users, pairs);
    // if (!answer || result[0] > answer[0] || (result[0] === answer[0] && result[1] >= answer[1])) {
    //   answer = result;
    // }
    results.push(calcResult(users, pairs));
  }

  // 0, 1 순서로 내림차순 정렬
  return results.sort((a, b) => {
    return b[0] - a[0] || b[1] - a[1];
  })[0]; // 가장 큰 값
}

function solutionOther(users, emoticons) {
  var answer = [];
  return answer;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    {
      users: [
        [40, 10000],
        [25, 10000]
      ],
      emoticons: [7000, 9000],
      result: [1, 5400]
    },
    {
      users: [
        [40, 2900],
        [23, 10000],
        [11, 5200],
        [5, 5900],
        [40, 3100],
        [27, 9200],
        [32, 6900]
      ],
      emoticons: [1300, 1500, 1600, 4900],
      result: [4, 13860]
    }
  ];

  const success = testCases.every((tc) => {
    console.log(solution(tc.users, tc.emoticons), tc.result);
    return require("lodash").isEqual(solution(tc.users, tc.emoticons), tc.result);
  });
  console.log(success);
}

module.exports = solution;
