/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/181916
 * => 배열 내에서 중복이 존재하는 숫자 찾기 & 개수 구하기 + 중복이 없는 숫자 찾기
 */
/**
 */
function calcDuplicates(arr) {
  let dups = [];
  let others = [];
  // group by
  arr.forEach((item) => (arr.indexOf(item) !== arr.lastIndexOf(item) ? dups.push(item) : others.push(item)));
  // uniq
  dups = [...new Set(dups)];

  return {
    count: dups.length > 1 ? dups.length : arr.length - others.length,
    dups: dups,
    others: others
  };
}

function solution(/* a, b, c, d */) {
  let args = [...arguments]; // to array
  if (args.length !== 4 && args.some((n) => !(1 <= n && n <= 6 && n % 1 === 0))) {
    throw new Error("Invalid argumets: " + args);
  }

  const result = calcDuplicates(args);
  const dups = result.dups;
  const others = result.others;

  switch (result.count) {
    case 4: {
      // 네 주사위에서 나온 숫자가 모두 p로 같다면 1111 × p점을 얻습니다.
      const p = dups[0];
      return 1111 * p;
    }
    case 3: {
      // 세 주사위에서 나온 숫자가 p로 같고 나머지 다른 주사위에서 나온 숫자가 q(p ≠ q)라면 (10 × p + q)2 점을 얻습니다.
      const [p, q] = [dups[0], others[0]];
      return Math.pow(10 * p + q, 2);
    }
    case 2:
      if (dups.length > 1) {
        // 주사위가 두 개씩 같은 값이 나오고, 나온 숫자를 각각 p, q(p ≠ q)라고 한다면 (p + q) × |p - q|점을 얻습니다.
        const [p, q] = dups;
        return (p + q) * Math.abs(p - q);
      } else {
        const [q, r] = others;
        // 어느 두 주사위에서 나온 숫자가 p로 같고 나머지 두 주사위에서 나온 숫자가 각각 p와 다른 q, r(q ≠ r)이라면 q × r점을 얻습니다.
        return q * r;
      }
    case 0:
      // 네 주사위에 적힌 숫자가 모두 다르다면 나온 숫자 중 가장 작은 숫자 만큼의 점수를 얻습니다.
      return Math.min.apply(this, args);
  }
}

function solution2(/* a, b, c, d */) {
  let args = [...arguments]; // to array
  if (args.length !== 4 && args.some((n) => !(1 <= n && n <= 6 && n % 1 === 0))) {
    throw new Error("Invalid argumets: " + args);
  }

  args = args.sort((a, b) => a - b);

  if (args[0] === args[3]) {
    // 네 주사위에서 나온 숫자가 모두 p로 같다면 1111 × p점을 얻습니다.
    const p = args[0];
    return 1111 * p;
  } else if (args[0] === args[2] || args[1] === args[3]) {
    // 세 주사위에서 나온 숫자가 p로 같고 나머지 다른 주사위에서 나온 숫자가 q(p ≠ q)라면 (10 × p + q)2 점을 얻습니다.
    const [p, q] = args[0] === args[2] ? [args[0], args[3]] : [args[1], args[0]];
    return Math.pow(10 * p + q, 2);
  } else if (args[0] === args[1] && args[2] === args[3]) {
    // 주사위가 두 개씩 같은 값이 나오고, 나온 숫자를 각각 p, q(p ≠ q)라고 한다면 (p + q) × |p - q|점을 얻습니다.
    const [p, q] = [args[0], args[2]];
    return (p + q) * Math.abs(p - q);
  } else {
    const others = args.filter((item) => args.indexOf(item) === args.lastIndexOf(item));
    if (others.length === 2) {
      // 어느 두 주사위에서 나온 숫자가 p로 같고 나머지 두 주사위에서 나온 숫자가 각각 p와 다른 q, r(q ≠ r)이라면 q × r점을 얻습니다.
      const [q, r] = others;
      return q * r;
    } else {
      // 네 주사위에 적힌 숫자가 모두 다르다면 나온 숫자 중 가장 작은 숫자 만큼의 점수를 얻습니다.
      return Math.min(...args);
    }
  }
}

function solutionOther(a, b, c, d) {
  function count(arr) {
    const counter = new Map();
    for (const num of arr) {
      counter.set(num, (counter.get(num) || 0) + 1);
    }
    const sortedByCnt = [...counter.keys()].sort((a, b) => counter.get(b) - counter.get(a));
    const maxCnt = Math.max(...counter.values());
    return [sortedByCnt, maxCnt];
  }

  const [arr, maxCnt] = count([a, b, c, d]);
  const [p, q, r, s] = arr;
  if (arr.length === 1) {
    return p * 1111;
  }
  if (arr.length === 2) {
    return maxCnt === 2 ? (p + q) * Math.abs(p - q) : (10 * p + q) ** 2;
  }
  if (arr.length === 3) {
    return q * r;
  }
  return Math.min(p, q, r, s);
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    [2, 2, 2, 2],
    [4, 1, 4, 4],
    [6, 3, 3, 6],
    [2, 5, 2, 6],
    [6, 4, 2, 5]

    // [5, 5, 5, 5],
    // [2, 2, 5, 2],
    // [2, 1, 2, 1],
    // [1, 4, 3, 4],
    // [3, 6, 4, 5]
  ];
  const results = [2222, 1681, 27, 30, 2 /* , 5555, 625, 3, 3, 3 */];

  const success = testCases.every(function (arrCase, index) {
    console.log(arrCase, solution.apply(this, arrCase), results[index]);
    return solution.apply(this, arrCase) === results[index];
  });
  console.log(success);

  const success2 = testCases.every(function (arrCase, index) {
    console.log(arrCase, solution2.apply(this, arrCase), results[index]);
    return solution2.apply(this, arrCase) === results[index];
  });
  console.log(success2);
}

// N 번째 홀수의 합 : (1) + (1+2^1) + (1+2^2) + ... + (1+2^(N-1)) = N * N
// N 번째 짝수 제곱의 합 : 2^2 + (2*2)^2 + ... + (2^N)^2 = N*N(N*N + 1)

// (2*1)^2 + (2*2)^2 + (2*3)^2 + ... + (2*N)^2
// = 2^2 * (1^2 + 2^2 + 3^2 + ... + N^2)
// = 4 * (n * (n + 1) * (2 * n + 1)) / 6);

module.exports = solution;
