function calculateDistance(x1, x2) {
    const deltaX = Math.abs(x2 - x1);
    const distance = Math.sqrt(deltaX * deltaX);

    return distance;
}

function getLine(x1, x2, x3, x4) {
    let p1 = 0;
    let p2 = 0;
    let line = [];

    if ((x1 <= x3 && x3 <= x2 && x2 <= x4) || (x3 <= x1 && x1 <= x4 && x4 <= x2)) {
        p1 = Math.max(x1, x3);
        p2 = Math.min(x2, x4);
        
        if (p1 === p2) {
            return line;
        }

        line = [p1, p2];
    } else if (x1 <= x3 && x4 <= x2) {
        line = [x3, x4];
    } else if (x3 <= x1 && x2 <= x4) {
        line = [x1, x2];
    } else {
        return line;
    }

    return line;
}

function getDuplicatedLines(overlappingLines, line) {
    for(let i = 0, l = overlappingLines.length; i < l; i++) {
        let x1 = overlappingLines[i][0];
        let x2 = overlappingLines[i][1];
        let x3 = line[0];
        let x4 = line[1];

        if (x1 === x3 && x2 === x4) {
            return overlappingLines;
        } else if (x1 <= x3 && x3 <= x2 && x2 <= x4) {
            overlappingLines[i] = [x1, x4];
        } else if (x3 <= x1 && x1 <= x4 && x4 <= x2) {
            overlappingLines[i] = [x3, x2];
        } else if (x1 <= x3 && x4 <= x2) {
            overlappingLines[i] = [x1, x2];
        } else if (x3 <= x1 && x2 <= x4) {
            overlappingLines[i] = [x3, x4];
        } else {
            overlappingLines.push(line);
        }
    }

    return overlappingLines;
}

function solution(lines) {
    let answer = 0;
    let lineLength = lines.length;

    if (lineLength !== 3) {
        console.error('lines의 길이 = 3');
        return answer;
    }

    let overlappingLines = [];

    for (let i = 0, l = lineLength; i < l; i++) {
        let lineSegment1 = (i !== lineLength - 1) ? lines[i] : lines[0];
        let lineSegment2 = (i !== lineLength - 1) ? lines[i + 1] : lines[lineLength - 1];

        if (lineSegment1.length !== 2 || lineSegment2.length !== 2 || calculateDistance(lineSegment1[0], lineSegment1[1]) < 1 || calculateDistance(lineSegment2[0], lineSegment2[1]) < 1) {
            overlappingLines = [];
            answer = 0;
            console.error('lines의 원소의 길이 = 2 또는 모든 선분은 길이가 1 이상입니다.');
            break;
        }

        let x1 = lineSegment1[0];
        let x2 = lineSegment1[1];
        let x3 = lineSegment2[0];
        let x4 = lineSegment2[1];

        if (-100 > x1 || -100 > x3 || 100 < x2 || 100 < x4) {
            console.log('lines의 원소는 [a, b] 형태이며, a, b는 각각 선분의 양 끝점 입니다. (-100 ≤ a < b ≤ 100)');
        }

        let line = getLine(x1, x2, x3, x4);

        if (line.length === 0) {
            continue;
        }

        if (overlappingLines.length === 0) {
            overlappingLines.push(line);
            continue;
        }

        overlappingLines = getDuplicatedLines(overlappingLines, line);
        
    }

    overlappingLines.forEach(value => {
        answer += calculateDistance(value[0], value[1]);
    });

    return answer;
}

var lines = [[0, 1], [2, 5], [3, 9]];
var lines2 = [[-1, 1], [1, 3], [3, 9]];
var lines3 = [[0, 5], [3, 9], [1, 10]];
var lines4 = [[-3, -1], [-2, 1], [0, 2]];
var lines5 = [[0, 5], [3, 9], [-1, 10]];
var lines6= [[0, 9], [1, 1], [2, 5]];

console.log(solution(lines));
console.log(solution(lines2));
console.log(solution(lines3));
console.log(solution(lines4));
console.log(solution(lines5));
console.log(solution(lines6));
