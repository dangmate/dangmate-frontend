import { rest } from 'msw';

export const handlers = [
  // 이메일 중복 체크
  rest.post('/join/email-check', (req, res, ctx) => {
    const emailValue = req.body;
    return res(
      ctx.json({
        check: emailValue === 'diddpwl80@naver.com' ? false : true
      }),
      ctx.status(200)
    );
  }),

  // 닉네임 중복 체크
  rest.post('/join/nick-check', (req, res, ctx) => {
    const { nickname, keyword }: any = req.body;
    const check = `${keyword} ${nickname}`;
    return res(
      ctx.json({
        check: check === '세젤귀 초코' ? false : true
      }),
      ctx.status(200)
    );
  }),

  //회원가입
  rest.post('/join', (req, res, ctx) => {
    // const { user } = req.body;
    const param = req.body;
    return res(
      ctx.json({
        param
      }),
      ctx.status(200)
    );
  }),

  // 로그인
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    // sessionStorage.setItem('is-authenticated', 'true');
    const { email, pwd }: any = req.body;
    const accessToken = '1233577';
    return res(
      // Respond with a 200 status code
      ctx.json({
        accessToken,
        user: email === 'diddpwl80@naver.com' && pwd === '123456' ? true : false
      }),
      ctx.status(200)
    );
  }),

  rest.get('/user', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated');
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized'
        })
      );
    }
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin'
      })
    );
  }),
  rest.get('/users/:userId', (req, res, ctx) => {
    const { userId } = req.params;
    return res(
      ctx.json({
        id: userId,
        firstName: 'John',
        lastName: 'Maverick'
      })
    );
  }),
  rest.get('/feed', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: 1,
            userName: '소심쟁이 제이',
            userProfile: '',
            content:
              '강아지 주인 찾아요.\n 여기 공덕동이고, 갈색 진돗개 빨간색 목줄 암컷입니다. 강아지 산책하다 발견',
            location: '공덕동',
            createTime: '2022-11-11 10:00:00',
            comment: 0,
            like: 4,
            category: '댕댕 이야기'
          },
          {
            id: 2,
            userName: '말괄량이 조이',
            userProfile: '',
            content:
              '나는 풍이. 부산을 대표하는 풍산개.\n 공놀이 좋아하고 터그도 기가 막히게 잘 하지.\n 근데 요즘 주인놈이 놀아주는게 영 맘에 안들어서 같이 놀 댕댕이 구한다. 만나서 냄새 맡을 때는 예의지켜',
            location: '공덕동',
            createTime: '2022-11-11 10:00:00',
            comment: 6,
            like: 2,
            category: '산책 메이트'
          }
        ]
      })
    );
  })
];
