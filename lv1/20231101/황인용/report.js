// set 중복을 허용하지 않는 값들의 집합을 나타내는 자료 구조
// function validation(id_list) {
//     let isInvalue = false;
//     let idLength = id_list.length;

//     if (1 > idLength || idLength > 100) {
//         console.error("1 ≤ id_list의 원소 길이 ≤ 100 입니다.");
//         isInvalue = true;
//     } else if (new Set(id_list).size !== idLength) {
//         console.error("id_list에는 같은 아이디가 중복해서 들어있으면 안됩니다.");
//         isInvalue = true;
//     } else if (1 > idLength || idLength > 200) {
//         console.error("1 ≤ k ≤ 200 자연수 입니다.");
//         isInvalue = true;
//     }
 
//     return isInvalue
// }

function solution(id_list, report, k) {
    let answer = [];

    // if (validation(id_list, report, k)) {
    //     return answer;
    // }

    let reportData = {};
    let reportedCount = {};

    // ["muzi", "frodo", "apeach", "neo"]
    // => { muzi: Set(0), frodo: Set(0), apeach: Set(0), neo: Set(0) }
    id_list.forEach(v => {
        reportData[v] = new Set();
        reportedCount[v] = 0;
    });

    report.forEach(value => {
        let temp = value.split(" ");

        if (temp.lengt < 2) {
            console.error("신고당한 ID가 없습니다.")
            return;
        }

        let user = temp[0];
        let reporedUser = temp[1];

        if (user === reporedUser) {
            console.error("자기 자신을 신고하는 경우는 없습니다.")
            return;
        }

        // 동일한 유저에 대한 신고 횟수는 1회로 처리됩니다.
        if(!reportData[user].has(reporedUser)){
            reportData[user].add(reporedUser);
            reportedCount[reporedUser]++;
        }
    });

    // {
    //     muzi: Set(2) { 'frodo', 'neo' },
    //     frodo: Set(1) { 'neo' },
    //     apeach: Set(2) { 'frodo', 'muzi' },
    //     neo: Set(0) {}
    // }

    //reportedCount
    // { muzi: 1, frodo: 2, apeach: 0, neo: 2 }

    id_list.forEach((user, index) => {
        answer[index] = 0;
        reportData[user].forEach(reporedUser => {
            if (reportedCount[reporedUser] >= k) {
                answer[index]++;
            }
        });
    });

    return answer;
}


let id_list = ["muzi", "frodo", "apeach", "neo"];
let report = ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"];
let k = 2;
// [ 2, 1, 1, 0 ]
console.log(solution(id_list, report, k));

let id_list2 = ["con", "ryan"];
let report2 = ["ryan con", "ryan con", "ryan con", "ryan con"];
let k2 = 3;
// [ 0, 0 ]
console.log(solution(id_list2, report2, k2));

let id_list3 = ["a", "ab", "abc", "b"]
let report3 = ["ab a", "abc a", "b a", "a ab", "a abc", "a abc", "abc ab", "b ab", "b abc"];
let k3 = 3
// [ 1, 1, 2, 2 ]
console.log(solution(id_list3, report3, k3));

let id_list4 = ["a", "ab", "abc", "b"];
let report4 = ["ab a", "ab abc", "ab b", "abc a", "abc ab", "abc b"]
let k4 = 2
// [ 0, 2, 2, 0 ]
console.log(solution(id_list4, report4, k4));

let id_list5 = ["muzi", "muzi", "frodo", "apeach", "neo"];
let report5 = ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"];
let k5 = 2;
// [] -> 아이디 중복
console.log(solution(id_list5, report5, k5));
