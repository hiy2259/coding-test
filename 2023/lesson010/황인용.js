function calculateTimeDifference(startTime, endTime) {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const totalStartMinutes = startHour * 60 + startMinute;
    const totalEndMinutes = endHour * 60 + endMinute;

    return totalEndMinutes - totalStartMinutes;
}

function solution(fees, records) {
    let answer = [];
    let calculate = {};
    const DEFAULT_TIME = fees[0];
    const BASE_RATE = fees[1];
    const UNIT_TINE = fees[2];
    const UNIT_FEE = fees[3];
    const MAX_TIME = '23:59';

    // { 0000: [ 입차시간, 누적시간 ], 0148: [ 입차시간, 누적시간 ], 5961: [ 입차시간, 누적시간 ] } 
    records.forEach(value => {
        let parking = value.split(' ');
        let time = parking[0];
        let carNumber = parking[1];
        let isIn = parking[2] === 'IN';

        if (!calculate[carNumber]) {
            calculate[carNumber] = [null, 0];
        }

        let parkingCar = calculate[carNumber];
        
        if (isIn && time !== MAX_TIME) {
            parkingCar[0] = time;
        } else {
            let cumulativeTime = parkingCar[1];
            cumulativeTime += calculateTimeDifference(parkingCar[0], time);
            parkingCar[0] = null;
            parkingCar[1] = cumulativeTime;
        }
    });

    // { 0000: [ 입차시간, 누적시간 ], 0148: [ 입차시간, 누적시간 ], 5961: [ 입차시간, 누적시간 ] }
    // => [["0000", [ 입차시간, 누적시간 ]], ["0148", [ 입차시간, 누적시간 ]], ["5961", [ 입차시간, 누적시간 ]]
    const entries = Object.entries(calculate).sort();

    answer = entries.map(value => {
        const PARKING_TIME = value[1][0];
        let cumulativeTime = value[1][1];
        
        if (PARKING_TIME) {
            cumulativeTime += calculateTimeDifference(PARKING_TIME, MAX_TIME);
        }
       
        let totalParkingFee = 0
        const TIME_REMAINING = cumulativeTime - DEFAULT_TIME;

        if (TIME_REMAINING <= 0) {
            totalParkingFee = BASE_RATE;
        } else if (TIME_REMAINING > 0) {
            totalParkingFee = BASE_RATE + (Math.ceil(TIME_REMAINING / UNIT_TINE) * UNIT_FEE);
        }

        return totalParkingFee;
    });
    
    return answer;
}

console.log(solution(
    [180, 5000, 10, 600],
    ["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"]
    )); // [14600, 34400, 5000]
console.log(solution(
    [120, 0, 60, 591],
    ["16:00 3961 IN", "16:00 0202 IN", "18:00 3961 OUT", "18:00 0202 OUT", "23:58 3961 IN"]
    )); // [0, 591]
console.log(solution(
    [1, 461, 1, 10], ["00:00 1234 IN"])); // [14841]
