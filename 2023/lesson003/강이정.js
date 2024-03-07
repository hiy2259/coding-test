function solution(a, b, c, d) {
    const arr = [a, b, c, d] /// [1,1,1,2], [3,3,4,4]
    const set = new Set(arr) /// [1,2], [3, 4]
    const duplicate = [...set].filter((item) => arr.indexOf(item) !== arr.lastIndexOf(item)) //[1], [3, 4]

    switch(set.size) {
        case 1:
            return 1111 * duplicate[0]

        case 2:
            if(duplicate.length === 1) {
                set.delete(duplicate[0])
                return Math.pow((10 * duplicate[0] + [...set][0]), 2)
            } else {
                return (duplicate[0] + duplicate[1]) * Math.abs(duplicate[0] - duplicate[1])
            }

        case 3:
            set.delete(duplicate[0])
            return [...set][0] * [...set][1]

        case 4:
            return Math.min(...arr)
    }
}