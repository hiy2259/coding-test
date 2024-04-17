/**
 * Lv2: [다리를 지나는 트럭](https://school.programmers.co.kr/learn/courses/30/lessons/42583)
 */

function solution(bridge_length, weight, truck_weights) {
  let cur_weight = 0;
  let cur_length = 0;
  let sec = 0;

  while (truck_weights.length) {
    // 트럭을 순서대로 선택
    const truck_weight = truck_weights.shift();
    if (cur_weight + truck_weight <= weight && cur_length < bridge_length) {
      // 다리에 여유가 있는 경우
      // 트럭이 다리에 올라가는데 (1초) 소요
      sec += 1;
      // 트럭을 다리 위에 올리기
      cur_weight += truck_weight;
      cur_length += 1;
    } else {
      // 다리에 여유가 없는 경우
      // 다리에 올라간 모든 트럭이 통과하는데 다리 길이만큼 소요
      sec += bridge_length;
      // 다음 트럭을 다리 위에 올리기
      cur_weight = truck_weight;
      cur_length = 1;
    }
  }
  // 아직 다리에 남아있는 트럭을 통과시키기
  sec += bridge_length;

  return sec;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    { bridge_length: 2, weight: 10, truck_weights: [7, 4, 5, 6], answer: 8 },
    { bridge_length: 100, weight: 100, truck_weights: [10], answer: 101 },
    { bridge_length: 100, weight: 100, truck_weights: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], answer: 110 },
    { bridge_length: 1, weight: 10, truck_weights: [7, 4, 5, 6], answer: 5 },
    { bridge_length: 3, weight: 10, truck_weights: [7, 4, 5, 6], answer: 11 },
    //  0  []         [-,-,-]  [7,4,5,6]
    //  1  []         [-,-,7]  [4,5,6]
    //  2  []         [-,7,-]  [4,5,6]
    //  3  []         [7,-,-]  [4,5,6]
    //  4  [7]        [-,-,4]  [5,6]
    //  5  [7]        [-,4,5]  [6]
    //  6  [7]        [4,5,-]  [6]
    //  7  [7,4]      [5,-,-]  [6]
    //  8  [7,4,5]    [-,-,6]  []
    //  9  [7,4,5]    [-,6,-]  []
    // 10  [7,4,5]    [6,-,-]  []
    // 11  [7,4,5,6]  [-,-,-]  []
    { bridge_length: 4, weight: 10, truck_weights: [1, 1, 1, 1], answer: 8 },
    // 0  []         [-,-,-,-]  [1,1,1,1]
    // 1  []         [-,-,-,1]  [1,1,1]
    // 2  []         [-,-,1,1]  [1,1]
    // 3  []         [-,1,1,1]  [1]
    // 4  []         [1,1,1,1]  []
    // 5  [1]        [1,1,1,-]  []
    // 6  [1,1]      [1,1,-,-]  []
    // 7  [1,1,1]    [1,-,-,-]  []
    // 8  [1,1,1,1]  [-,-,-,-]  []
    { bridge_length: 3, weight: 9, truck_weights: [9, 1, 9, 1], answer: 13 },
    { bridge_length: 2, weight: 10, truck_weights: [9, 8, 5, 5], answer: 8 },
    // 0  []         [-,-]  [9,8,5,5]
    // 1  []         [-,9]  [8,5,5]
    // 2  []         [9,-]  [8,5,5]
    // 3  [9]        [-,8]  [5,5]
    // 4  [9]        [8,-]  [5,5]
    // 5  [9,8]      [-,5]  [5]
    // 6  [9,8]      [5,5]  []
    // 7  [9,8,5]    [5,-]  []
    // 8  [9,8,5,5]  [-,-]  []
    { bridge_length: 11, weight: 10, truck_weights: [1], answer: 12 },
    { bridge_length: 10, weight: 100, truck_weights: [50, 30, 10, 10, 30, 10, 40], answer: 23 },
    { bridge_length: 10, weight: 12, truck_weights: [4, 4, 4, 2, 2, 1, 1, 1, 1], answer: 26 },
    { bridge_length: 10, weight: 12, truck_weights: [1, 1, 1, 1, 2, 2, 4, 4, 4], answer: 26 },
    { bridge_length: 5, weight: 5, truck_weights: [2, 2, 2, 2, 1, 1, 1, 1, 1], answer: 19 },
    { bridge_length: 1, weight: 2, truck_weights: [1, 1, 1], answer: 4 },
    { bridge_length: 1, weight: 1, truck_weights: [1, 1, 1], answer: 4 },
    { bridge_length: 4, weight: 2, truck_weights: [1, 1, 1, 1], answer: 10 },
    { bridge_length: 5, weight: 5, truck_weights: [1, 1, 1, 1, 1, 2, 2], answer: 14 },
    { bridge_length: 7, weight: 7, truck_weights: [1, 1, 1, 1, 1, 3, 3], answer: 18 }
  ];

  testCases.forEach((tc) => {
    const answer = solution(tc.bridge_length, tc.weight, tc.truck_weights);
    console.log(answer, tc.answer, require("lodash").isEqual(answer, tc.answer));
  });
}

module.exports = solution;
