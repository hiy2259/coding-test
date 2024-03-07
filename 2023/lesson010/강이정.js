function solution(fees, records) {
    const park = {};
    const result = []
    for (const record of records) {
        const [parkTime, car, parking] = record.split(' ');
        const [hour, min] = parkTime.split(":")
        const time = parseInt(hour) * 60 + parseInt(min);
        if (parking === 'IN') {
            if (!park[car]) {
                park[car] = [time];
            } else {
                park[car].push(time);
            }
        } else if (parking === 'OUT') {
            if ( park[car]) {
                park[car].push(time);
            }
        }
    }

    let sortedKeys = Object.keys(park).sort();
    let sortedPark = {};
    sortedKeys.forEach(key => {
        sortedPark[Number(key)] = park[key];
    });

    const lastTime = 23 * 60 + 59

    const freeTime = fees[0];
    const baseFee = fees[1]
    const parkMin = fees[2]
    const minFee = fees[3]


    //주차비 계산
    for(const data in sortedPark) {
        if(sortedPark[data].length % 2 === 1) {
            sortedPark[data].push(lastTime)
        }
        let totalParkingTime = 0;
        let parkingRate = 0;
        for(let i = 0; i < sortedPark[data].length; i += 2) {
            let calTime = sortedPark[data][i+1] - sortedPark[data][i]
            totalParkingTime += calTime;
            if(totalParkingTime <= freeTime) {
                parkingRate = baseFee;
            } else {
                parkingRate = baseFee + Math.ceil((totalParkingTime - freeTime) / parkMin) * minFee
            }
        }
        result.push(parkingRate)
    }
    return result;
}