/**
 * [3차] 방금그곡: https://school.programmers.co.kr/learn/courses/30/lessons/17683
 */
function time2minute(time) {
  const [h, m] = time.split(":");
  return h * 60 + +m;
}

function solution(m, musicinfos) {
  let foundTitle = null;

  const reSheet = /C#?|D#?|E|F#?|G#?|A#?|B/g;
  const strRememberSheet = m.match(reSheet).join(",") + ","; // 'AB#C' -> 'A,B#,C,'

  for (const info of musicinfos) {
    const [sta, eta, title, sheetStr] = info.split(",");
    const sheet = sheetStr.match(reSheet);

    let playingTime = time2minute(eta) - time2minute(sta);
    let playingSheet = [];
    do {
      // TODO: String.prototype.repeat()
      const sliced = sheet.slice(0, playingTime);
      playingSheet = playingSheet.concat(sliced);
      playingTime -= sliced.length;
    } while (playingTime > 0);

    const strPlayingSheet = playingSheet.join(",") + ",";
    if (strPlayingSheet.indexOf(strRememberSheet) !== -1) {
      foundTitle = title;
      break;
    }
    // TODO: 조건이 일치하는 음악이 여러 개일 때에는 라디오에서
    // 재생된 시간이 제일 긴 음악 제목을 반환한다.
    // 재생된 시간도 같을 경우 먼저 입력된 음악 제목을 반환한다.
  }

  return foundTitle || "(None)";
}

function solutionOther(m, musicinfos) {
  var answer = "";
  return answer;
}

/**
 * run & test
 */
if (require.main === module) {
  const testCases = [
    { m: "ABCDEFG", musicinfos: ["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"], answer: "HELLO" },
    { m: "CC#BCC#BCC#BCC#B", musicinfos: ["03:00,03:30,FOO,CC#B", "04:00,04:08,BAR,CC#BCC#BCC#B"], answer: "FOO" },
    { m: "ABC", musicinfos: ["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"], answer: "WORLD" }
  ];

  const success = testCases.every((tc) => {
    console.log(solution(tc.m, tc.musicinfos), tc.answer);
    return require("lodash").isEqual(solution(tc.m, tc.musicinfos), tc.answer);
  });
  console.log(success);
}

module.exports = solution;
