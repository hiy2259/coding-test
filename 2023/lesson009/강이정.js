function solution(priorities, location) {
    let answer = 0;
    const queue = priorities.map((val, index) => ({ val, index }));

    while (1) {
        const queueValue = queue.shift();
        if (queue.some(item => item.val > queueValue.val)) {
            queue.push(queueValue);
        } else {
            answer++;
            if (queueValue.index === location) {
                break;
            }
        }
    }

    return answer;
}