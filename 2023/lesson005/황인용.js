function checkStrings(strings, n) {
    let isValid = false;
    if (strings.length > 50) {
        console.error("strings는 길이 1 이상, 50이하인 배열입니다.");
        return true;
    }

    for(let i = 0, l = strings.length; i < l; i++) {
        const STR = strings[i];
        const STR_LENGTH = STR.length - 1;
        const IS_INVALID_STR = STR.match(/[A-Z0-9]/g);

        if (!!IS_INVALID_STR || STR_LENGTH < 1 || STR_LENGTH > 100 || STR_LENGTH <= n) {
            console.error("strings의 원소가 모두 소문자가 아니거나, 원소의 길이가 1이상 100이하가 아니거나, 원소의 길이가 n보다 큽니다.");
            isValid = true;
            break;
        }
    }

    return isValid;
}

function solution(strings, n) {
    var answer = [];

    if (checkStrings(strings, n) || n < 0) {
        console.error("제한 조건을 다시한번 확인해 주세요.")
        return answer;
    }

    answer = strings.sort((a, b) => {
        // 문자 비교
        let result = a[n].charCodeAt(0) - b[n].charCodeAt(0);

        if (result === 0) {
            // 사전 순으로
            return a.localeCompare(b);
        }

        return result;
    });

    return answer;
}

// ["car", "bed", "sun"]
console.log(solution(["sun", "bed", "car"], 1)); 
 // ["abcd", "abce", "cdx"]            
console.log(solution(["cdx", "abce", "abcd"], 2)); 
// ["aac","abca","abce","adcd"]        
console.log(solution(["adcd", "abce", "abca", "aac"], 2)); 
// ["aaewrc", "abpold", "jholkop", "adcewrd", "opoxisdp", "abcaewr"]
console.log(solution(["adcewrd", "abpold", "abcaewr", "aaewrc", "jholkop", "opoxisdp"], 5));
// ["aaasdfc", "abcsdfe", "asddqwercd", "spkdlklj", "dsy", "sdy"]
console.log(solution(["asddqwercd", "abcsdfe", "sdy", "aaasdfc", "dsy", "spkdlklj"], 2)); 
// ["aasdc", "qeerd", "sdpdde", "absdf", "absdfdsce"]
console.log(solution(["qeerd", "absdfdsce", "absdf", "aasdc", "sdpdde"], 4));
