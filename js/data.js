// '기획', 0
// '운영', 1
// '디제잉', 2
// '프로모션', 3
// '홍보', 4
// '미디어아트', 5

const qnaList = [
  {
    q: '1. 파티에서 나는 무슨 유형?',
    a: [
      { answer: 'a. 디제잉존 앞에서 춤추며 음악을 즐긴다', type: [1,2] },
      { answer: 'b. 여러 부스를 체험하러 돌아다닌다.', type: [3] },
      { answer: 'c. 조용히 칵테일바에 앉아있는다.', type: [5] },
    ]
  },
  {
    q: '2. 여행 갈 때 나는 어떤 유형? ',
    a: [
      { answer: 'a. 친구가 하자는 대로 한다.', type: [1] },
      { answer: 'b. 내가 일정을 다 정한다.', type: [0] },
      { answer: 'c. 안 정한다.', type: [2] },
    ]
  },
  {
    q: '3. 친구의 생일선물을 줄 때의 나의 기준은?',
    a: [
      { answer: 'a. 친구의 위시리스트를 반영한다.', type: [0] },
      { answer: 'b. 내가 고심해서 친구에게 잘 어울릴 걸 고른다.', type: [3] },
      { answer: 'c. 내가 손수 만든 선물을 준다.', type: [5] }
    ]
  },
  {
    q: '4. 팀플 같이하자는 동기의 말을 들었을 때 나의 반응은?',
    a: [
      { answer: 'a. 인정받은 것 같아 기분에 좋아진다. ', type: [4] },
      { answer: 'b. 나랑 왜? 굳이? ', type: [5] },
      { answer: 'c. 속으로는 싫은데 마지못해 수락한다. "(싫은디…) 좋아^_^" ', type: [3] },
    ]
  },
  {
    q: '5. 나는 종종 기발한 아이디어로 사람들을 놀라게 한다.',
    a: [
      { answer: 'a. 그런 것 같다.', type: [0] },
      { answer: 'b. 전혀 그렇지 않다.', type: []}//
    ]
  },
  {
    q: '6. 당신의 릴스 및 쇼츠 알고리즘은?',
    a: [
      { answer: 'a. 최신 밈들로 가득하다.', type: [4] },
      { answer: 'b. 연예인 직캠이나 사진들', type: [] },//
      { answer: 'c. 동물들', type: [] },//
    ]
  },
  {
    q: '7. 당신의 플레이리스트는?',
    a: [
      { answer: 'a. 최신 유행 플리', type: [4] },
      { answer: 'b. 나만 아는 플리', type: [2] }
    ]
  },
  {
    q: '8. 주위에서 나는 어떻게 평가될까?',
    a: [
      { answer: 'a. 외향적이고 활발한 적응력 갑', type: [1] },
      { answer: 'b. 개성 넘치는 멋쟁이', type: [2] },
      { answer: 'c. 조용조용하지만 할 건 다하는 갓생러', type: [0] },
    ]
  },
  {
    q: '9. 음식 메뉴를 정할 때 나의 스탠스는?',
    a: [
      { answer: 'a. 남들이 정해주는 대로 따라간다.', type: [1] },
      { answer: 'b. 인스타로 맛집 검색해서 찾아간다.', type: [4] },
      { answer: 'c. 내가 먹고 싶은 음식점을 정해 친구를 데려간다.', type: [3] },
    ]
  }
]

const infoList = [
  {
    name: '<기획팀>',
    desc: '기획팀 설명 '
  },
  {
    name: '<운영팀>',
    desc: '운영팀 설명 '
  },
  {
    name: '<디제잉팀>',
    desc: '디제잉팀 설명'
  },  
  {
    name: '<프로모션팀>',
    desc: '프로모션팀 설명'
  },
  {
    name: '<홍보팀>',
    desc: '홍보팀 설명'
  },
  {
    name: '<미디어 아트팀>',
    desc: '미디어 아트팀 설명명'
  },
]

// 팀별 초기 카운트 설정
const teamCounts = {
  '기획': 0,
  '운영': 0,
  '디제잉': 0,
  '프로모션': 0,
  '홍보': 0,
  '미디어아트': 0
};

// 사용자의 답변에 따라 점수 계산
function calculateScores(answers) {
  const teamCountMap = { ...teamCounts };

  answers.forEach(answer => {
    const question = qnaList.find(q => q.q === answer.q);  // 해당 질문 찾기
    const selectedAnswer = question.a.find(opt => opt.answer[0] === answer.a);  // 선택한 답변 찾기

    selectedAnswer.type.forEach(typeIndex => {
      const teamName = getTeamName(typeIndex);
      teamCountMap[teamName] += 1; // 해당 팀 선택 횟수 증가
    });
  });

  return teamCountMap;
}

// 타입 인덱스에 따른 팀 이름 반환
//function getTeamName(typeIndex) {
  //const teams = ['기획', '운영', '디제잉', '프로모션', '홍보', '미디어아트'];
  //return teams[typeIndex];
//}

// 가장 선택 횟수가 많은 팀을 반환하는 함수
function determineTeam(answers) {
  const teamCountMap = calculateScores(answers);

  const sortedTeams = Object.keys(teamCountMap).sort((teamA, teamB) => {
    return teamCountMap[teamB] - teamCountMap[teamA]; // 선택 횟수가 높은 팀 우선
  });

  return sortedTeams[0]; // 가장 많이 선택된 팀 반환
}
