function solution(people, limit) {
    people.sort();
    var answer = 1;
    let sum = 0;
    let boatInPeople = 0;

    for(const person of people) {
        if(sum + person > limit || boatInPeople >= 2) {
            answer++;
            sum = person;
            boatInPeople = 1;
        } else {
            sum += person
            boatInPeople++;
        }
    }
    return answer;
}