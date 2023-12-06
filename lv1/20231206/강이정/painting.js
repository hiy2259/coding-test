function solution(n, m, section) {
    var answer = 0;
    let currentValue = 0;

    for(let sect of section) {
        if(currentValue < sect) {
            answer ++;
            currentValue = sect + m - 1;
        }
    }
    return answer;
}