/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/92341
 */

function validFees(fees) {
  return (
    fees.length === 4 &&
    1 <= fees[0] &&
    fees[0] <= 1439 &&
    0 <= fees[1] &&
    fees[1] <= 100000 &&
    1 <= fees[2] &&
    fees[2] <= 1439 &&
    1 <= fees[3] &&
    fees[3] <= 10000
  );
}
function validRecords(records) {
  return 1 <= records.length && records.length <= 1000 && records.every(validRecord);
}
function validRecord(record) {
  return /^([0-1]\d|2[0-3]):[0-5]\d \d{4} (IN|OUT)$/.test(record);
}

function time2minute(time) {
  const [h, m] = time.split(":");
  return h * 60 + +m;
}

function solution(fees, records) {
  if (!validFees(fees)) {
    throw new Error("Invalid arguments: " + JSON.stringify(fees));
  }
  if (!validRecords(records)) {
    throw new Error("Invalid arguments: " + JSON.stringify(records));
  }

  // 차량 번호별 기록
  const recordsByCar = {};
  records.forEach((record) => {
    const [time, car, type] = record.split(" ");
    recordsByCar[car] = recordsByCar[car] || [];
    recordsByCar[car].push({ time, type });
  });

  // 기본 시간(분), 기본 요금(원), 단위 시간(분), 단위 요금(원)
  const [minuteDefault, feeDefault, unit, feeByUnit] = fees;
  // 차량 번호별 주차 요금
  const feeByCar = {};

  for (const [car, records] of Object.entries(recordsByCar)) {
    // 입차된 후에 출차된 내역이 없다면, 23:59에 출차된 것으로 간주
    if (records[records.length - 1].type === "IN") {
      records.push({ time: "23:59", type: "OUT" });
    }

    // OUT time - IN time
    let sumMinute = 0;
    for (let i = 0; i < records.length; i += 2) {
      sumMinute += time2minute(records[i + 1].time) - time2minute(records[i].time);
    }

    // 기본 요금 + 단위 요금
    feeByCar[car] = feeDefault;
    if (sumMinute > minuteDefault) {
      feeByCar[car] += Math.ceil((sumMinute - minuteDefault) / unit) * feeByUnit;
    }
  }

  // 차량 번호가 작은 자동차부터 차례대로 배열로
  return Object.keys(feeByCar)
    .sort()
    .map((car) => feeByCar[car]);
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
      fees: [180, 5000, 10, 600],
      records: [
        "05:34 5961 IN",
        "06:00 0000 IN",
        "06:34 0000 OUT",
        "07:59 5961 OUT",
        "07:59 0148 IN",
        "18:59 0000 IN",
        "19:09 0148 OUT",
        "22:59 5961 IN",
        "23:00 5961 OUT"
      ],
      result: [14600, 34400, 5000]
    },
    {
      fees: [120, 0, 60, 591],
      records: [
        "16:00 3961 IN",
        "16:00 0202 IN",
        "18:00 3961 OUT",
        "18:00 0202 OUT",
        "23:58 3961 IN"
      ],
      result: [0, 591]
    },
    {
      fees: [1, 461, 1, 10],
      records: ["00:00 1234 IN"],
      result: [14841]
    },
    {
      fees: [40, 20, 5, 5],
      records: [
        "04:14 5961 IN",
        "06:00 0000 IN",
        "06:34 0000 OUT",
        "13:22 5961 OUT",
        "13:22 0148 IN",
        "19:09 0148 OUT",
        "22:59 5961 IN"
      ],
      result: [20, 330, 590]
    }
  ];

  const success = testCases.every((item) => {
    console.log(solution(item.fees, item.records), item.result);
    return require("lodash").isEqual(solution(item.fees, item.records), item.result);
  });
  console.log(success);
}

module.exports = solution;
