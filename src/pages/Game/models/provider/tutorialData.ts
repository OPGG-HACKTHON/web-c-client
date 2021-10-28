import { ChampData } from '../type';

const tutorialData: ChampData[] = [{
  champName: '갱플랭크',
  summonerName: '스우미1',
  src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/Gangplank.png',
  frequentItems: [{
    name: '명석함의 아이오니아 장화', skillAccel: 20, englishName: 'Ionian Boots of Lucidity', src: 'https://opgg-static.akamaized.net/images/lol/item/3158.png?image=q_auto:best&v=1628647804',
  }, {
    name: '콜필드의 전투 망치', skillAccel: 10, englishName: "Caulfield's Warhammer", src: 'https://opgg-static.akamaized.net/images/lol/item/3133.png?image=q_auto:best&v=1628647804',
  }, {
    name: '화공 펑크 사슬검', skillAccel: 15, englishName: 'Chempunk Chainsword', src: 'https://opgg-static.akamaized.net/images/lol/item/6609.png?image=q_auto:best&v=1628647804',
  }, {
    name: '정수 약탈자', skillAccel: 20, englishName: 'Essence Reaver', src: 'https://opgg-static.akamaized.net/images/lol/item/3508.png?image=q_auto:best&v=1628647804',
  }, {
    name: '신성한 파괴자', skillAccel: 20, englishName: 'Divine Sunderer', src: 'https://opgg-static.akamaized.net/images/lol/item/6632.png?image=q_auto:best&v=1628647804',
  }, {
    name: '삼위일체', skillAccel: 20, englishName: 'Trinity Force', src: 'https://opgg-static.akamaized.net/images/lol/item/3078.png?image=q_auto:best&v=1628647804',
  }, {
    name: '나보리 신속검', skillAccel: 30, englishName: 'Navori Quickblades', src: 'https://opgg-static.akamaized.net/images/lol/item/6675.png?image=q_auto:best&v=1628647804',
  }],
  spells: {
    D: {
      spellType: 'D', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/SummonerFlash.png', time: null, isOn: true, name: '점멸',
    },
    F: {
      spellType: 'F', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/SummonerTeleport.png', time: null, isOn: true, name: '순간이동',
    },
    R: {
      spellType: 'R', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/GangplankR.png', time: null, isOn: false, level: 0, name: '궁',
    },
  },
  itemsPurchased: null,
}, {
  champName: '비에고',
  summonerName: '스우미2',
  src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/Viego.png',
  frequentItems: [{
    name: '콜필드의 전투 망치', skillAccel: 10, englishName: "Caulfield's Warhammer", src: 'https://opgg-static.akamaized.net/images/lol/item/3133.png?image=q_auto:best&v=1628647804',
  }, {
    name: '죽음의 무도', skillAccel: 15, englishName: "Death's Dance", src: 'https://opgg-static.akamaized.net/images/lol/item/6333.png?image=q_auto:best&v=1628647804',
  }, {
    name: '신성한 파괴자', skillAccel: 20, englishName: 'Divine Sunderer', src: 'https://opgg-static.akamaized.net/images/lol/item/6632.png?image=q_auto:best&v=1628647804',
  }, {
    name: '점화석', skillAccel: 10, englishName: 'Kindlegem', src: 'https://opgg-static.akamaized.net/images/lol/item/3067.png?image=q_auto:best&v=1628647804',
  }, {
    name: '정수 약탈자', skillAccel: 20, englishName: 'Essence Reaver', src: 'https://opgg-static.akamaized.net/images/lol/item/3508.png?image=q_auto:best&v=1628647804',
  }],
  spells: {
    D: {
      spellType: 'D', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/SummonerFlash.png', time: null, isOn: true, name: '점멸',
    },
    F: {
      spellType: 'F', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/SummonerSmite.png', time: null, isOn: true, name: '강타',
    },
    R: {
      spellType: 'R', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/ViegoR.png', time: null, isOn: false, level: 0, name: '궁',
    },
  },
  itemsPurchased: null,
}, {
  champName: '트위스티드 페이트',
  summonerName: '스우미3',
  src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/TwistedFate.png',
  frequentItems: [{
    name: '악마의 마법서', skillAccel: 10, englishName: 'Fiendish Codex', src: 'https://opgg-static.akamaized.net/images/lol/item/3108.png?image=q_auto:best&v=1628647804',
  }, {
    name: '명석함의 아이오니아 장화', skillAccel: 20, englishName: 'Ionian Boots of Lucidity', src: 'https://opgg-static.akamaized.net/images/lol/item/3158.png?image=q_auto:best&v=1628647804',
  }, {
    name: '사라진 양피지', skillAccel: 10, englishName: 'Lost Chapter', src: 'https://opgg-static.akamaized.net/images/lol/item/3802.png?image=q_auto:best&v=1628647804',
  }, {
    name: '존야의 모래시계', skillAccel: 10, englishName: "Zhonya's Hourglass", src: 'https://opgg-static.akamaized.net/images/lol/item/3157.png?image=q_auto:best&v=1628647804',
  }, {
    name: '만년서리', skillAccel: 20, englishName: 'Everfrost', src: 'https://opgg-static.akamaized.net/images/lol/item/6656.png?image=q_auto:best&v=1628647804',
  }, {
    name: '마법공학 로켓 벨트', skillAccel: 15, englishName: 'Hextech Rocketbelt', src: 'https://opgg-static.akamaized.net/images/lol/item/3152.png?image=q_auto:best&v=1628647804',
  }],
  spells: {
    D: {
      spellType: 'D', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/SummonerFlash.png', time: null, isOn: true, name: '점멸',
    },
    F: {
      spellType: 'F', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/SummonerTeleport.png', time: null, isOn: true, name: '순간이동',
    },
    R: {
      spellType: 'R', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/Destiny.png', time: null, isOn: false, level: 0, name: '궁',
    },
  },
  itemsPurchased: null,
}, {
  champName: '징크스',
  summonerName: '스우미4',
  src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/Jinx.png',
  frequentItems: [{
    name: '명석함의 아이오니아 장화', skillAccel: 20, englishName: 'Ionian Boots of Lucidity', src: 'https://opgg-static.akamaized.net/images/lol/item/3158.png?image=q_auto:best&v=1628647804',
  }],
  spells: {
    D: {
      spellType: 'D', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/SummonerHeal.png', time: null, isOn: true, name: '회복',
    },
    F: {
      spellType: 'F', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/SummonerFlash.png', time: null, isOn: true, name: '점멸',
    },
    R: {
      spellType: 'R', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/JinxR.png', time: null, isOn: false, level: 0, name: '궁',
    },
  },
  itemsPurchased: null,
}, {
  champName: '쓰레쉬',
  summonerName: '스우미5',
  src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/Thresh.png',
  frequentItems: [{
    name: '점화석', skillAccel: 10, englishName: 'Kindlegem', src: 'https://opgg-static.akamaized.net/images/lol/item/3067.png?image=q_auto:best&v=1628647804',
  }, {
    name: '얼음 방패', skillAccel: 10, englishName: 'Glacial Buckler', src: 'https://opgg-static.akamaized.net/images/lol/item/3024.png?image=q_auto:best&v=1628647804',
  }, {
    name: '명석함의 아이오니아 장화', skillAccel: 20, englishName: 'Ionian Boots of Lucidity', src: 'https://opgg-static.akamaized.net/images/lol/item/3158.png?image=q_auto:best&v=1628647804',
  }, {
    name: '군단의 방패', skillAccel: 10, englishName: 'Aegis of the Legion', src: 'https://opgg-static.akamaized.net/images/lol/item/3105.png?image=q_auto:best&v=1628647804',
  }, {
    name: '구원', skillAccel: 15, englishName: 'Redemption', src: 'https://opgg-static.akamaized.net/images/lol/item/3107.png?image=q_auto:best&v=1628647804',
  }, {
    name: '기사의 맹세', skillAccel: 10, englishName: "Knight's Vow", src: 'https://opgg-static.akamaized.net/images/lol/item/3109.png?image=q_auto:best&v=1628647804',
  }, {
    name: '미카엘의 축복', skillAccel: 15, englishName: "Mikael's Blessing", src: 'https://opgg-static.akamaized.net/images/lol/item/3222.png?image=q_auto:best&v=1628647804',
  }, {
    name: '지크의 융합', skillAccel: 20, englishName: "Zeke's Convergence", src: 'https://opgg-static.akamaized.net/images/lol/item/3050.png?image=q_auto:best&v=1628647804',
  }, {
    name: '슈렐리아의 군가', skillAccel: 20, englishName: "Shurelya's Battlesong", src: 'https://opgg-static.akamaized.net/images/lol/item/2065.png?image=q_auto:best&v=1628647804',
  }, {
    name: '강철의 솔라리 펜던트', skillAccel: 20, englishName: 'Locket of the Iron Solari', src: 'https://opgg-static.akamaized.net/images/lol/item/3190.png?image=q_auto:best&v=1628647804',
  }],
  spells: {
    D: {
      spellType: 'D', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/SummonerFlash.png', time: null, isOn: true, name: '점멸',
    },
    F: {
      spellType: 'F', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/SummonerDot.png', time: null, isOn: true, name: '점화',
    },
    R: {
      spellType: 'R', src: 'http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/ThreshRPenta.png', time: null, isOn: false, level: 0, name: '궁',
    },
  },
  itemsPurchased: null,
}];

export default tutorialData;
