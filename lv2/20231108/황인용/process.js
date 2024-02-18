function solution(priorities, location) {
    let answer = 0;
    let maxPriority = Math.max(...priorities);
    let queue = priorities.map((value, index) => {
        return {
            priority: value,
            isBreakExcute: index === location
        }
    });

    while(queue.length > 0) {
        let process = queue.shift();
        let priority = process.priority

        if (priority < maxPriority) {
            queue.push(process);
            continue;
        } else if (priority === maxPriority) {
            ++answer;
            maxPriority = Math.max(...queue.map(value => value.priority));
        }

        if (process.isBreakExcute) {
            break;
        }
    }

    return answer;
}

console.log(solution([2, 1, 3, 2], 2) === 1);
console.log(solution([1, 1, 9, 1, 1, 1], 0) === 5);
console.log(solution([3, 1, 2, 2], 2) === 2);
console.log(solution([1, 2, 3, 4, 5], 2) === 3)
console.log(solution([5, 4, 3, 2, 1], 0) === 1);
console.log(solution([1, 1, 1, 2], 2) === 4);
console.log(solution([1, 1, 7, 1, 9, 1, 1], 1) === 7);
