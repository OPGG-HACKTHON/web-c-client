/* eslint-disable max-len */
import _ from 'lodash';

const koPosition = [
  '탑',
  '정글',
  '미드',
  '원딜',
  '서폿',
];

const enPosition = [
  'top',
  'mid',
  'jungle',
  'ad',
  'support',
];

export const koChampionDict = {
  가렌: ['가렌', '카렌', '알엠', 'rm', '바램', '아렌', 'RN', 'ARM', '아란', "aren't", '아름', 'r n', '알렌', '갈은', 'r m', 'iran'],
  갈리오: ['갈리오', '알리오', '갈리어', '갈려', '관리 어', '갈래요', '칼리오', '갈리아', '달력', '갈륨', '빨리요', '가려', '깔려', '달려', '간리역', '알려 줘', '가려', '갈려', '달려', '깔려', '가령', '알려 줘', '반려', '달력', '알려', '관련', '가렴', '걸려', '빨려', '갈현', '가려 줘', '가려고', '발령', '가려움'],
  갱플랭크: [
    ['갱플랭크', '임플란트', '플랜트', '플랭크', '잉글랜드', '인플란트', '형 플랜트', '형 플랭크', '탤런트', '빈펄랜드', '클린트', '플린트'],
    ['갱플', '경태', '궨트', '겐트', '텐트', '덴트', '경찰', '켄트', '경철', '경채', '젠틀', '갱제', '갱생', '게스트', '딘트', '경택', '캔슬', '게임 틀', '강철', '텐텐', '광태', '갱스터', '경제', '갠트', '탱탱', '캔트', '결제', '강태', '탱크', '동태'],
  ],
  그라가스: [
    ['그라가스', '들어갔어', '들어가 스', '들어갔음', '그라스', '클라스', '크로스', '글라스', '크라스', '그로스', '라스', '클로스', '라오스', '클라쓰', '로스', '그렇지', '브라스', '브로스', '그라시아스', '플러스', '가스', '클라쎄', '가스', '카라카스'],
    ['글가'],
  ],
  그레이브즈: [
    ['그레이브즈', '플레이버즈', '플레이 버즈', '그레이 버전', '프리버드', '트레이더스', 'travel', '플레이버스'],
    ['그브'],
  ],
  그웬: ['그웬', '그 외엔', '그 맨', '그 맨', '그 n', '개그맨', '그맨', '그 앤', '그 외에는', '그외엔', '그외'],
  나르: ['나르', '말해', '나래', '나를', '다래', '말해 봐', '말해 줘', '발해', '아래', '바래', '말을', '날에', '날을', '마르', '다른', '마레', '나를 줘'],
  나미: ['나미', '남이', '남희', '라미', '나 미', '마미', '남미', '람이'],
  나서스: ['나서스', '5세', '5 3', '나섰을'],
  노틸러스: [
    ['노틸러스', '노틸러스 2s', '노틸러스호'],
    ['노틸', '노트', '노트 7', '노트 1', '노태', '로텔', '노트 8', '노태우', '노트 5', '노팅힐', '노트에', '로테', '노트 해', '노트에다'], // '노텔',
  ],
  녹턴: ['녹턴'],
  '누누와 윌럼프': [
    ['누누', '노노', '르노', '루노', '노 노', '누노', '눈 오', '노 노 노', '노노노', '눈 5'],
  ],
  니달리: ['니달리', '비달리', '미달리', '비 달리', '비탈리', '미달이', '기다리', '빗 알리', '빚 알리', 'B 달리', '빛 알리', '이 달리', '비 달리기', '기다려'],
  니코: ['니코', '리코', '미코', '니 코', '디코', '네코'],
  다리우스: [
    ['다리우스'],
    ['다리', '달이', '달인', '파리', '바리', '발이', '발의', '발인', '다린', '팔이', '탈잉'],
  ],
  다이애나: ['다이애나', '다연아', '다현아', '다이아나', '다이에나', '다예나', '다인아', '다이나'],
  드레이븐: [
    ['드레이븐', '드라이븐', '레이븐', 'driven', '드라이브는', '드라이브'],
    ['드븐', '데벤', '데덴', '덴', 'ZN', '세렌', 'tvn', '데덴네', '대변', '제덴'],
  ],
  라이즈: ['라이즈', '나 이제', '라이젠', '라이제', '나이제', 'LIG', 'liz'],
  라칸: ['라칸', '마칸', '약한', '다칸', '악한'],
  람머스: ['람머스', '라모스', '아모스', '암모스', '나마스테', '나마스떼', '맘모스', '맘마 소스', '밥 먹재', '마마스', '밥 먹세'],
  럭스: ['럭스', '벅스', '박스', '녹스', '빡세', '박새', '덕스', '빡스', '럭셀', '록스', '럭슬', '넉스'],
  럼블: ['럼블', '랑벨', '알람 벨', '남벨', '담배', '람 벨', '람베리', '남 벨', '난 배', '난백', '람베오', '남벌', '라벨', '난 벨', '람베스', '람비엔', '담배', '밤배', '밤벨', '덤벨', '럼블', '단발', '선배', '랑벨', '만발', '난데', '그런데', '람베이', '람베리', '남대', '람비', '런데이', '남들', '람베오', '럼블', '람보 2', '만배', '람베스', '람다', '랑벨', '람보', '람비엔', '알람 벨', '란델', '만들', '사람들', '란다', '란드', '런던', '람보', '름보', '럼버', '런던', '럼보', '맘보', '넘버', '만보', '연봉', 'lumber', '램보'],
  레넥톤: ['레넥톤', '엘렉톤', '렉스턴', '텔레톤', '베토벤', '벨톤', '베톤', '베트남', '베네통', '테라톤', '텔레트론', '텔레토비', '베레타', '베레토', '베네토'],
  레오나: ['레오나', '나훈아', '대훈아', '대원아', '예원아', '재훈아', '배우나', '재원아', '매우 나', '레모나', '혜원아', '배우 나', '예은아', '대현아', '태훈아', '비 오나', '세원아', '지훈아', '태원아', '내 오나', '세훈아', '매운 아', '대운하', '재은아', '대우 나', '베로나', '네 오나'],
  렉사이: ['렉사이', '엑사이', '104 2', 'xi', '백상아리', 'XY'],
  렐: ['렐', '레', '레알', '랩', '레고', '레레', '넬', 'l', '내일', '네', '레이', '레레레', '레일', '델', '래', '레드', '엘', '렌', '렉', 'll', '렘', '렙', '렛', '레레레레', 'l l', '램', '4', '레디'],
  렝가: ['렝가', '텐가', '젠가', '뱅가', '생가', '엔가', '행가', '렌가', '단가', '벵가', '생각'],
  루시안: ['루시안', '요산', '루산', '부산', '요상', '유상', '두산', '유산', '루샹', '노상', '요양', '요새 안', '무상', '효상', '류상', '노산', '로션', '교산', '부상', '요새 1', '교상', '요샌', '두상', '유향', '로잔', '묘상', '우산', '교장', '조상', '묘산'],
  룰루: ['룰루', '눌러', '룰러', '루루', '롤러', '물론', '놀러', '루루루', '루룸', '룸', '멜론', '불러', '누름', '누루', '롤로', '물로', '룰 루'],
  르블랑: ['르블랑', '네덜란드', '블랑', '신랑', '에블랑', '빈랑', '엘랑', '멜랑', '열량', '별랑', '애들이랑', '갤랑', '일랑', '헤드랑', '대리랑', '울랑', '불량', '겨드랑', '플랑', '알랑', '별이랑', '롤랑', '별양', '달랑', '배랑', '계량', '너랑', '별량', '1이랑'],
  '리 신': ['리신', '리 신', '미신', '귀신', '위신', '미싱', '레이싱', '내신', '이신', '대신', '미친', '내심', '외신', '미진', '배신', '문신', '민심', '의심', '위싱', '이심'],
  리븐: ['리븐', '너는', '닉은', '립은'],
  리산드라: [
    ['리산드라'],
    ['리산', '미산', '이산', '위산', '미선', '비산'],
  ],
  릴리아: ['릴리아', '일리야', '일리아', '율리아', '빌리아', '엘리아', '밀리아', '필리아', '엘리야', '길리아', '킬리아', '빌리야', '리아', '실리아', '진리야'],
  '마스터 이': [
    ['마스터이', '마스터 2', '마스터링', '마스터인', '마스터리'],
    ['마이', '마인', 'my'],
  ],
  마오카이: ['마오카이', '뭐 콰이', '마카오 카이'],
  말자하: ['말자하', '맞아', '말자', '잘 자', '날자', '낮아', '빨자', '나 알잖아', '말자 나', '알잖아', '맑아'],
  말파이트: [
    ['말파이트'],
    ['말파', '알파', '나이파', '말판', '마이파', '레알팜', '나 알파', '말해 봐', '발판', '멜팍', '발파', '나 아파', '사이판', '라파', '알바', '나 알바', '네파', '라바', 'nipa', '와이파', '내 봐'],
  ],
  모데카이저: [
    ['모데카이저', '모데 카이저'],
    ['모데', '모델', '뭐 돼', '못 해', '모텔', '오대', '오 돼', '5대'],
  ],
  모르가나: [
    ['모르가나', '모르잖아'],
    ['몰가', '뭘까', '뭐가', '뭘가', '모를까', '물가', '몰카', '월가'],
  ],
  '문도 박사': [
    ['문도박사', '운도 박사', '눈도 박사'],
    ['문도', '온도', '눈도', '몬도', '운도', '문덕', '문도 줘'],
  ],
  '미스 포츈': [
    ['미스포츈', '미스 포츈'],
    ['미포', '니포', '리포', '네 4', '리퍼'],
  ],
  바드: ['바드', '다들', '받은', '받을', '바드', '닫은', '다 돼', '바다', '닫아', '아들', '다른', '받아', '다들 줘'],
  바루스: ['바루스', '바르셀', '바로스', '바르셀로나'],
  바이: ['바이', '빠이', '바이 바이', '파이', '비와이', 'by', '바이바이', '비아이', 'bi'],
  베이가: ['베이가', '내가', '회의가', '헤이가', '페이가', 'Hey가', 'A가', '에이가', '배가', 'Hi가', '데이가', '얘가', '내일가', '레이가', '베가', '메가', '제이가', '애가', '비가', '헤가', '네가', 'h a가', 'Hey', 'LA가', '회가', 'the가', '제가'],
  베인: ['베인', '폐인', '배인', '애인', '대인', '태인', '페인', '해인', '스페인', '혜인', '데인', '개인', '패인', '메인', '세인', '레인', '제인', '체인', '회인', '테인', '장애인', '재인', '브레인', '백인', '3인', '애인 있어', '펭귄', '빈', '폐인 뜻', '페인트'],
  벨코즈: ['벨코즈', '에코즈', '해커스'],
  볼리베어: [
    ['볼리베어', '볼리비아'],
    ['볼베', '돌배', '불백', '볼매', '볼 배', '보내', '볼배', '보배', '볼래', '월배', '콜벳', '콜백', '골배', '올백', '보내 줘', '보이넷', '골뱅이', '콜밴', '보이네', '볼펜', '본래', '돌베'],
  ],
  브라움: ['브라움', '드럼', '브라운', '그럼', '크라운', '드라운', '다운'],
  브랜드: ['브랜드', '그랜드', '랜드', '트렌드', '프랜드', '프렌드', '드랜드'],
  블라디미르: [
    ['블라디미르'],
    ['블라디'],
  ],
  블리츠크랭크: [
    ['블리츠크랭크'],
    ['블리츠', '블릭스', '플리츠', '브릭스', '필릭스', '브리츠', '플릭스', '블리체', '블리스', '필립스', '블리치', '빌릭스', '클릭스'],
    ['블츠', '대체', '대책', '대체 왜', '결제', '개체', '교체', '대체 줘'],
    ['블크', '크크', '브레이크', '드레이크', '불금', '밀크', '헐크'],
  ],
  비에고: ['비에고', '디에고', '예고', '개고', '계곡', '105', '계고', '배고', '깨고'],
  빅토르: ['빅토르'],
  뽀삐: ['뽀삐', '꽃비', '꾸삐', '고삐', '오피', '뽀 삐', '쁘띠', 'OP', '뽑기'],
  사미라: ['사미라', '삽니다', '서미라', '3이라', '삼일한', '서민아', '3이다', '카메라', '서미란', '삼이랑', '섬이다', '3이랑', '3 1 1', '섬이라', '3 1화', '사람이라', '삶이란', '하민아', '삼일아파트', '삼미당'],
  사이온: ['사이온', '싸이언', '타이온', '파이온', '사이언', '바이온', '다이온', '라이언', '다이언', '타이언', '자이언'],
  사일러스: [
    ['사일러스', '사일런스'],
    ['사일', '4일', '4 1', '파일', '사인', '싸인', '싸일', '사 일', '타일', '4 1 5', '4일 날', '4L', '스타일', '421', '4인'],
  ],
  샤코: ['샤코', '차코', '사코', '자코', '체코', '자 코', '타코', '차콜', '쌓고', '다코', '자 코 자', '싸코', '자코모'],
  세나: ['세나', '쎄나'],
  세라핀: ['세라핀', '테라핀', '셀핀', '셀라피', '세라핌', '테라피'],
  세주아니: [
    ['세주아니', '세주 아니', '3주 하니', '3 2 1 2', '호주 한인', '제주 하니', '호주한인', '소주 하니'],
    ['세주', '3주', '소주', '제주', '해 줘', '세슈', '세수', '세조', '혜주', '쇠주', '세 줘', '재즈', '3조', '재수', '체조', '새 줘', '쎄듀'],
  ],
  세트: ['세트', '제트', '세츠', '해체', '세체', '사채', '대체', '자체', '3', '테스트', '시애틀'],
  소나: ['소나', '선아', '순아', '수나', '선하', '서나', '손아', '소은아', '서은아', '쏘나', '소연아', '스나'],
  소라카: ['소라카', '설악항', '설악산'],
  쉔: ['쉔', '쎈', '첸', '센', '샘', 'SN', '10', 'san', '젠', '쌤', '생', '센 거', 'can', 'han', 'SM', '션', '샌즈', '센 애', '샒', 'sen'],
  쉬바나: ['쉬바나', '히바나', '키바나', '희바 나', '김하나', '티바나', '힙 않아', '디바나'],
  스웨인: ['스웨인', '서인', '수인', '성인', '스페인', '승인', '세인', '스윙', '설인', '선인', '서예인', '서린', '수빈', '스테인', '서빈', '사진', '3인', '서신', '사인', '스크린', '스린'],
  스카너: ['스카너', '스카나', '북한어', '스캐너', '치카노', '피카나', '치카나', '카나'],
  시비르: ['시비르', '11', '시리를', '11일', '11월', '스릴', '10일', '7일', '시릴', '시빌', '수리를', '휠', '휴일', '십일', '3일', '소리를', '11회', '티비를', '쉬리를', '10 일'],
  '신 짜오': [
    ['신짜오'],
    ['짜오', '나우', '자우', '싸우', '짜우', '따오', '싸움', '다우', '다오', '따우', '사우', '자오', '4 5', '타오', '싸워', 'S5', '다운', '사우나', '자우오'],
  ],
  신드라: ['신드라', '힘들어', '신트라'],
  신지드: ['신지드', '심심해', '싱크대', '숭실대', '신지 돼', '신세대', '신지혜', '신지대', '씽크대', '심즈 3', '신시대', '신세계', '신지 되', '신구대', '신태일', '심지 돼', '침실', '신 지대', '킹스데일', '신신애', '심즈갤', '신슈대', '신지 될', '신지애', '심실', '신세', '찜질', '신스틸', '심즈 돼', '신주 돼'],
  쓰레쉬: ['쓰레쉬', '3시', '플래시', '섹시', '셋이', '슬래시', '쎄씨', '색시', '슬러시', '새시', '샷시', '날씨', '세라 씨', 'src', '세나 씨', '플래쉬'],
  아리: ['아리', '마리', '알이', '하리', '말이', '파리', '아 리', '다리', '바리', '아린', '발이'],
  아무무: ['아무무', '아무', '아무 뭐', '암호'],
  '아우렐리온 솔': [
    ['아우렐리온 솔', '아우렐리온솔'],
    ['솔', '설', '헐', '소설', '서울', '썰', '설 설'],
    ['아우솔'],
  ],
  아이번: ['아이번', '와이번', '라이언', '타이번', '나 이번', '아 이번', '사이먼', '하이원', '나 이번 주', '아이반', '아 이건', '사이판', '다 이번', '하이반', '타이완', '아 이번 주', '라 이번', '라이펀', '가입 안', '라이벌', '라이브 1기'],
  아지르: ['아지르', '아델', '아들', '아델의', '아들은', '아들을', '아제르', '아재를', '아자르', '아드리엘', '아들의', '아들이', '아들에', '아재', '아재들', '아들아', '아델은', '아기를', '바지를'],
  아칼리: ['아칼리', '박칼린'],
  아크샨: ['아크샨', '낙하산', '아크 샷', '박하선', '아크샷', '마크 샷', '마크 산', '마크 1', '아크 시간', '마크 시간', '카페 산', '카페산', '마크샵', '아티산', '아크 산', '다크시안', '아트샵', '아트샷', '앞에선', '아크 찬', '아크 현', '마크 3', '아크 션', '아크 선', '박혜선', '마크 선', '마크 샤넬', '학가산', '마크 샨', '앞에 산', '아크 샨'],
  아트록스: [
    ['아트록스'],
    ['아트', '아태', '아테', '아 태', '하트', '마트', '아테네', '아체', '아텐', '아티제', '아티', '아케'],
  ],
  아펠리오스: [
    ['아펠리오스'],
    ['아펠', '앞에', '카페', '바텔', '화폐', '앞의'],
  ],
  알리스타: [
    ['알리스타', '발리스타', '발리 스파', '발리스파'],
    ['알리', '할리', '1리', '발리', '한리', '빨리', '관리', '알림'],
  ],
  애니: ['애니', '혜니', '헤니', '혜미', '현이', '제니'],
  애니비아: ['애니비아', '애니비어', '애니기어'],
  애쉬: ['애쉬', '3시', '해시', '메시', '해 시', '애시', '예시', '날씨', '회시', '헬시', '해쉬', '제시', '헤네시', '헬씨', '셋이', '회식'],
  야스오: ['야스오', '야수', '야소', '야 수', '야호', '약수'],
  에코: ['에코', '백호', '에구'],
  엘리스: ['엘리스', '앨리스', '앨리슨', '웰니스', '헬리스'],
  오공: ['오공', '5 0', '5공', '오 공', '허공', '500', '5 0 0', '오 0'],
  오른: ['오른', '오렌', '올엠', '오랜', '올해는', '오렌지', '오램', '모레는', '워렌', '오렘', '오랜만', '오렌즈', '오름', '오라는', '옳은', '오랜 밤', '오래는'],
  오리아나: [
    ['오리아나', '코리아나', '우리 하나', '오리 1', '우리하나', '오리 하나', '우리 아나', '우리 1', '오래 하나', '오리 않아', '우리 않아'],
    ['오리', '우리', '보리', '고리', '꼬리', '호리', '모리', '볼이', '구리', '홀이', '소리'],
  ],
  올라프: ['올라프', '플라트', '몰라 트', '올라이트', '몰라 틀', '콜라텍', '울라프'],
  요네: ['요네', '연애', '연해', '연예', '연회', '연예인', '연희', '유은혜', '요번에'],
  요릭: ['요릭', '요리', '이효리'],
  우디르: ['우디르', '어디를', '오딜', '오디를', '어딜', '옷 이름', '어디로', '우리를', '어디래', '옷 일을', '옷 1', '오디오를', '모델', '오디랩', '옷딜'],
  우르곳: ['우르곳', '무릎 꽃', '무료 꽃', '오늘 꽃', '불꽃', '모로코', '오늘 것', '물꽃', '을 것', '물을 것', '얼음꽃', '우리 꽃', '구로 꽃', '누룩꽃', '모를 것', '으로 꽃', '꽃', '울 것', '물을 꽃', '물 꽃', '오를 것', '울 꽃', '우리꽃', '무릎', '부를 것', '먹을 것', '물을 곳', '오르골', '올 것'],
  워윅: [
    ['워윅', '범익', '워릭', '모비딕', '버윅', '머위', '코믹', '원익', '보미', '머리'],
    ['워웍', '1억', '웍', '뭐 먹', '워크', '왁', '왁왁', '1박', '워낙', '뭐 막', 'walk', '머크', '1 박', '워워', '1박 2일', '와 와', 'work', 'wa', '와', '와와', '워터파크', '1억 줘', '워머', '워워워', '워커', '웍 웍', '워크아웃', '1 박 2'],
  ],
  유미: ['유미', '요미', '이유미', '요요미'],
  이렐리아: [
    ['이렐리아', '기다려', '지랄이야', '일요일이야', '테라리아'],
    ['이렐', '일해', '이래', '미래', '일할', '밀알', '밀애', '1회', '1L', '일 해'],
  ],
  이블린: ['이블린', '에블린', '리블링'],
  이즈리얼: [
    ['이즈리얼'],
    ['이즈', '이제', '이슬', '이스', '잊을'],
  ],
  일라오이: [
    ['일라오이'],
    ['일라', '일랑', '신랑', '일락', '밀양', '일나', '빌라', '일남', '일람', '이랑', '일어나', '힐라', '인량', '릴라', '알람', '밀랑', '연락', '휠라', '밀라'],
  ],
  '자르반 4세': [
    ['자르반 4세'],
    ['자르반'],
    ['잘반', '잘 봐', '8만', '잘만', '잘 봤', '찰밥'],
  ],
  자야: ['자야', '자', '자자', '자야 돼', '사자', '자냐', '자 야', '다야', '차야', '사야', '잘 자', '자기야', '자야 해', '찾아'],
  자이라: ['자이라', '사이다', '사이라', '하희라', '사이람', '타이라', '사에라', '차이나', '사회라', '싸이라', '사하라', '사위랑', '4의라', '4 1화', '사인암', '자라', '차이란', '사의라', '사위라', '살아'],
  자크: ['자크', '자켓', '착해', '자캐', '자켄', '샤크', '작작해', '자칼', '착한', '다크', '사클', '사케', '잡캔', '작게', '작은', '4K'],
  잔나: ['잔나', '잤나', '폈나', '졌나', '전나', '찬나', '탔나', '존나', '좋나', '자나', '갔나', '좆나', '샀나', '찾나', '전 나', '전화', '전남', '탄나', '잖아', '산나'],
  잭스: ['잭스', '텍스', '섹스', '첵스', '잭슨', '젝스', '팩스', '텍셀', '엑셀', 'sex', '책스', '색스', '덱스', 'tx', 'X'],
  제드: ['제드', '테드', '캐드', '채드', '제르', '제이드', '게르', '제라드', '체르', '차드', '자드', '차르', '데드', '헤드', '죄르', '카드'],
  제라스: ['제라스', '테라스'],
  제이스: ['제이스', '테니스', '제니스', '케이스', '페이스', '데이스', '체이스', '테이스', '트와이스', '제네시스', '레이스', '스위스', '스페이스', '데니스', '베이스', '델리스', '댄스', '베니스'],
  조이: ['조이', '초희', '저희', '도희', '조인', '줘 2', '조 2'],
  직스: ['직스', '찍스', '딕스', '6', '빅스', '킥스', '식스', 'G6', 'GX', 'tx'],
  진: ['진', '찐', '지진', '진짜', '지민', '진진'],
  질리언: ['질리언', '빌리언', '틸리언', '밀리언', '젤리언', '스틸리언', '윌리엄', '텔리언', '길리언', '줄리언', '클리앙', '킬리언'],
  징크스: ['징크스'],
  초가스: ['초가스'],
  카르마: ['카르마', '가르마', '까르마'],
  카밀: ['카밀', '카멜', '카미', '타미', '카니', '카메라', '카메', '카민', '칸이', '타밀', '카믹', '카네'],
  카사딘: ['카사딘', '화 사진', '화살인', '카 사진'],
  카서스: ['카서스', '카서스로', '카스도', '카스로', '5세', '갓어스', '카스', '갓쎄', '카사스', '카사 3', '카 3', '5 3', '가서 쓸', '카셀'],
  카시오페아: [
    ['카시오페아'],
    ['카시', '가시', '카카시', '갓이', '카쉬', '카시나'],
  ],
  카이사: ['카이사'],
  카직스: ['카직스', '칼텍스', '카덱스', '카텍스', '카렉스', '가딕스', '카드 X', '카디스', '카딕스', '카택스', '칼릭스', 'coex', '카드 EX', '카드 GX'],
  카타리나: [
    ['카타리나', '카탈리나'],
    ['카타', '같아', '카 타', '카파', '카타르'],
  ],
  칼리스타: [
    ['칼리스타'],
    ['칼리', '관리', '갈리', '컬리', '캘리', '칼린'],
  ],
  케넨: ['케넨', 'CNN', '씨엔엔', 'KNN', 'CN', '캐논', 'canon', '케이 엔 엔'],
  케이틀린: [
    ['케이틀린'],
    ['케틀', '캐틀', '시애틀', '페텔', '배틀', 'ktl', '씨애틀', '캐슬', '베텔', '케텍', '캣휠', '해태', '하트'],
  ],
  케인: ['케인', 'KN', 'kin', '개인', '켄', '케이 엔'],
  케일: ['케일', '케이윌', 'K1', '테일', 'KL', 'KAL', 'k11', '케이'],
  코그모: ['코그모', '코코모', '코코몽', '코가 뭐', '코모', '고모'],
  코르키: ['코르키', '콜 키', '콜킨', '쿨케이', '크로키', '쿠로키', 'cork'],
  퀸: ['퀸'],
  클레드: ['클레드', '클래드', '클리드', '클라우드', '클래르', '클라이드', '클레르', '클라드', '글래드', '오클랜드', '클로드'],
  키아나: ['키아나', '기아나', '피아노'],
  킨드레드: [
    ['킨드레드'],
    ['킨드', '킨들', '침대', '킨더', '키드', '힘들', '킨드레드', '킹덤', '킹 돼', '킨드 줘'],
  ],
  타릭: ['타릭', '파리', '다리', '달이', '팔이', '타리', '탈잉', '달인', '달리기'],
  탈론: ['탈론', '텔론', '파일론'],
  탈리야: ['탈리야', '탈리아', '이탈리아', '달리아', '팔리어', '이탈리아어', '펠리아'],
  '탐 켄치': ['탐 켄치', '탐켄치', '참치'],
  트런들: ['트런들', '그런데', '티란데', '트렌드', '틀린데', '트렌디', '그란데', 'tender'],
  트리스타나: [
    ['트리스타나', '크리스타나'],
    ['트타', '투타', '좋다', '치타', '두타', '스타', '투 타', '2 타', '2타', '투스타', '조타'],
    ['트리', '틀이', '체리', '트립', '트로이', '트릭'],
  ],
  트린다미어: [
    ['트린다미어'],
    ['트린', '트레인', '스트린', '트림', '틀린', '트윈', '투린', '스크린', '툴인'],
  ],
  '트위스티드 페이트': [
    ['트위스티드 페이트', '트위스티드페이트'],
    ['트페', '투패', '투팩', '2패', '2페', '스펙'],
  ],
  트위치: ['트위치', '스위치'],
  티모: ['티모', '피모', '키모', '티몬', '디모'],
  파이크: ['파이크', '바이크', '스파이크', '하이크', '다이크', '사이클'],
  판테온: [
    ['판테온', '한태원', '한태훈', '한태연', '함태헌'],
    ['판테', '한테', '판태', '한태', '현태', '탈퇴', '단테', '환태', '선태', '탄퇴', '산태', '선택', '헌태', '천태', '팬택', '판테라', '컨택', '판테온'],
    ['빵테', '빵태', '깡패', '상태', '방태', '망태', '깡태', '빵 태', '황태', '땅 태', '쌍테', '땅 10', '방패', '빵 테', '쌍태', '빵 10', '빵틀', '상패'],
  ],
  피들스틱: [
    ['피들스틱'],
    ['피들', '피를', '피드', '비를', '키를', '피데', '비데', '키드'],
  ],
  피오라: ['피오라', '키워라', '키오라', '치워라', '피어라', '켜라', '깨워라', '피워라', '귀여워라', '비워라', '티오라', '키요라', '비 오나'],
  피즈: ['피즈', '퀴즈', '키즈', '치즈', '비즈', '티즈'],
  하이머딩거: [
    ['하이머딩거'],
    ['딩거', '링거', '딩고', '빙고', '딩가', '빈 거', '핑거'],
    ['하딩', '하빈', '하빙', '핫윙', '핫핑', '하딘', '핫빈', '파이팅', '할인', '카빙'],
  ],
  헤카림: ['헤카림'],
};

export const koChampion = _.flattenDeep(Object.values(koChampionDict));

const enChampion = [
  'Aatrox',
  'Ahri',
  'Akali',
  'Akshan',
  'Alistar',
  'Amumu',
  'Anivia',
  'Annie',
  'Aphelios',
  'Ashe',
  'AurelionSol',
  'Azir',
  'Bard',
  'Blitzcrank',
  'Brand',
  'Braum',
  'Caitlyn',
  'Camille',
  'Cassiopeia',
  'Chogath',
  'Corki',
  'Darius',
  'Diana',
  'DrMundo',
  'Draven',
  'Ekko',
  'Elise',
  'Evelynn',
  'Ezreal',
  'Fiddlesticks',
  'Fiora',
  'Fizz',
  'Galio',
  'Gangplank',
  'Garen',
  'Gnar',
  'Gragas',
  'Graves',
  'Gwen',
  'Hecarim',
  'Heimerdinger',
  'Illaoi',
  'Irelia',
  'Ivern',
  'Janna',
  'JarvanIV',
  'Jax',
  'Jayce',
  'Jhin',
  'Jinx',
  'Kaisa',
  'Kalista',
  'Karma',
  'Karthus',
  'Kassadin',
  'Katarina',
  'Kayle',
  'Kayn',
  'Kennen',
  'Khazix',
  'Kindred',
  'Kled',
  'KogMaw',
  'Leblanc',
  'LeeSin',
  'Leona',
  'Lillia',
  'Lissandra',
  'Lucian',
  'Lulu',
  'Lux',
  'Malphite',
  'Malzahar',
  'Maokai',
  'MasterYi',
  'MissFortune',
  'MonkeyKing',
  'Mordekaiser',
  'Morgana',
  'Nami',
  'Nasus',
  'Nautilus',
  'Neeko',
  'Nidalee',
  'Nocturne',
  'Nunu',
  'Olaf',
  'Orianna',
  'Ornn',
  'Pantheon',
  'Poppy',
  'Pyke',
  'Qiyana',
  'Quinn',
  'Rakan',
  'Rammus',
  'RekSai',
  'Rell',
  'Renekton',
  'Rengar',
  'Riven',
  'Rumble',
  'Ryze',
  'Samira',
  'Sejuani',
  'Senna',
  'Seraphine',
  'Sett',
  'Shaco',
  'Shen',
  'Shyvana',
  'Singed',
  'Sion',
  'Sivir',
  'Skarner',
  'Sona',
  'Soraka',
  'Swain',
  'Sylas',
  'Syndra',
  'TahmKench',
  'Taliyah',
  'Talon',
  'Taric',
  'Teemo',
  'Thresh',
  'Tristana',
  'Trundle',
  'Tryndamere',
  'TwistedFate',
  'Twitch',
  'Udyr',
  'Urgot',
  'Varus',
  'Vayne',
  'Veigar',
  'Velkoz',
  'Vi',
  'Viego',
  'Viktor',
  'Vladimir',
  'Volibear',
  'Warwick',
  'Xayah',
  'Xerath',
  'XinZhao',
  'Yasuo',
  'Yone',
  'Yorick',
  'Yuumi',
  'Zac',
  'Zed',
  'Ziggs',
  'Zilean',
  'Zoe',
  'Zyra',
];

export const koActionDict = {
  R: ['노궁', '녹음', '노공', '노 공', '노 0', '도공', '도궁'],

  회복: ['노힐', '힐', '해', '노딜', '노일', '노빌', '노 힐', '노엘', '로힐', '노 일', '또 힐', '노 1', '노해일', '노후 1', '놓일', '노후 일', '모힐', '노실', '노트 1', '너 힐', '노회', '놀릴', '노릴', '노희', '노회 일', '노희 일', '로엘', '도희', '로희', '노희 1', '노회 1', 'lol'],
  점화: ['노점화', '점화', '너 담화', '노 담화', '노정화', '노담 화', '노선화', '노 전화', '노담 와', '너 잠 와', '노성화', '너 전화', '노점 화', '농담 화', '로담 화', '노점 와', '노던 화', '농담 와', '노잼 화', '로담 와', '로 전화', '노던 와'],
  정화: ['노정화', '정화', '노성화', '노정아', '도정화', '조정화', '도성아', '소정화', '조정아', '조성아', '소정아', '도장 와', '또 정화', '서정화', '오정화', '두정아', '도 정화', '조성화', '조성하', '도정 와', '효정아', '호정아', '또 전화', '동화'],
  순간이동: ['노텔', '텔', '노태', '로테', '로텔', '호텔', '로태', '루태', '노태우', '노보텔', '노텍', '로텍', '모텔', '로지텍', '로템'],
  탈진: ['노탈진', '탈진', '너 탈젠', '너 탈진', '노 탈젠', '로탈 잼', '노탈 잼', '노트 8 젠', '모탈 잼', '노 탈 잼', '너 탈 잼', '노털 잼', '못할 잼', '노타이 잼', '로탈 젬', '노트 8 잼', '노탈 젬', '노털 젬', '노트 8 짐', '로타리 잼', '노트 8 10', '노털 젠', '못 할 잼', '노트 8 진', '노트 8 cm', '노트 탈젠', '노탈 젠', '노트 8 재생', '못할 젠', '노트에 잼', '로탈 젠'],
  방어막: ['노방 음악', '노래방 음악', '노망 음악', '조방 음악', '로망 음악', '음악', '노 방어막', '도망 음악', '너 방학', '노 방 음악', '노랑 음악', '너 방 음악', '유방암 악', '도방 음악', '노방 하마', '동방 음악', '소방 음악', '노바 막', '노바마', '또 방어막', '내 방 음악', '요망 음악', '또방 음악', '교방 음악', '노 방학', '노광 음악', '노방 아마', '녹양 음악', '또 방 음악', '노강 음악'],
  유체화: ['노유체화', '놀이터', '노리터', '너 2차', '돌체와', '넣자'],
  점멸: ['노플', '도플', '노페', '어플', '녹색', '로페', '독해', '노팬', '노페인', '독채', '독재', '도배', '노트 8', '뷔페', '노 페인', '도팽', '독백', '녹스', '도쿄', '높여', '독뱀', '노펜', '녹화해', '노캡', '높이', '노벨', '높을'],

  노스펠: ['노스펠', '노스페이스', '노스펙', '노 스 페', '노스 페이스'],
};

export const koAction = _.flattenDeep(Object.values(koActionDict));

export enum LanguageType {
  ko = 'ko',
  en = 'en',
}

export enum GrammerType {
  all = 'all',
  position = 'position',
  champion = 'champion',
  action = 'action',
}

const getShortGrammarWordList = (dict: Object, wordListLength = 1) => {
  const shortGrammarWordList = Object.values(dict).reduce((acc, list) => {
    let champWordList;

    if (Array.isArray(list[0])) {
      // champWordList = _.flattenDeep(list.map((l) => l.slice(0, wordListLength)));
      // grammer 개수 한도 초과로 처음 것만 사용
      champWordList = _.flattenDeep(list[0].slice(0, wordListLength));
    } else {
      champWordList = list.slice(0, wordListLength);
    }

    acc.push(...champWordList);
    return acc;
  }, []);

  return shortGrammarWordList;
};

export const getGrammarList = (language: LanguageType = LanguageType.ko, grammer: GrammerType = GrammerType.all) => {
  let grammarList;

  switch (language) {
    case LanguageType.ko: {
      switch (grammer) {
        case GrammerType.all: {
          grammarList = [
            // ...koPosition,
            // ...getShortGrammarWordList(koChampionDict),
            ...getShortGrammarWordList(koActionDict, 3),
          ];
          break;
        }
        case GrammerType.position: {
          grammarList = koPosition;
          break;
        }
        case GrammerType.champion: {
          grammarList = getShortGrammarWordList(koChampionDict);
          break;
        }
        case GrammerType.action: {
          grammarList = getShortGrammarWordList(koActionDict, 5);
          break;
        }
        // no default
      }
      break;
    }
    case LanguageType.en: {
      switch (grammer) {
        case GrammerType.all: {
          grammarList = [...enPosition, ...enChampion];
          break;
        }
        case GrammerType.position: {
          grammarList = enPosition;
          break;
        }
        case GrammerType.champion: {
          grammarList = enChampion;
          break;
        }
        // no default
      }
      break;
    }
    // no default
  }

  return grammarList;
};

export const getGrammarString = (language: LanguageType = LanguageType.ko, grammer: GrammerType = GrammerType.all) => {
  const grammarList = getGrammarList(language, grammer);

  console.log(grammarList, grammarList.length);

  const grammar = `#JSGF V1.0; grammar firstList; public <firstList> = ${grammarList.join(' | ')};`;
  return grammar;
};

interface SpellDict {
  [key: string]: Array<string>;
}

// TODO: 챔피언별 스펠 보유 여부 체크
export const interpret = (transcriptList: Array<string>, championList: Array<string>, spellDict: SpellDict) => {
  const findKey = (word, dict, allowedKeyList = Object.keys(dict)) => _.findKey(dict, (wl, key) => {
    const wordList = _.flattenDeep(wl);
    return allowedKeyList.includes(key) && !!wordList.find((w) => word === w);
  });

  const resultList = transcriptList
    .map((transcript) => {
      const wordList = transcript.split(' ');
      if (wordList.length < 2) {
        return null;
      }

      let action;
      let champion;

      for (let i = 1; i < 5; i += 1) {
        if (!wordList[i]) return null;

        action = findKey(wordList[i], koActionDict);
        // console.log(`action ${i}`, action);

        let championWord = '';
        for (let n = i - 1; n >= 0 && !champion; n -= 1) {
          championWord = `${wordList[n]} ${championWord}`;
          championWord = championWord.trim();
          // console.log(`championWord ${i}-${n}`, championWord);
          champion = findKey(championWord, koChampionDict, championList);
          // console.log(`champion ${i}`, champion);
        }

        if (!champion) return null;
        action = findKey(wordList[i], koActionDict, [...spellDict[champion], 'R']);

        if (champion && action) {
          return { champion, action };
        }
      }

      return null;
    })
    .filter((t) => t);

  const uniqResultList = _.uniqWith(resultList, _.isEqual);

  return uniqResultList[0];
};
