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
    return res(
      ctx.json({
        check: true
      }),
      ctx.status(200)
    );
  }),

  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true');
    return res(
      // Respond with a 200 status code
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
  })
];
