const baseUrl = 'http://localhost:5173';

interface ITestLogin {
  email: string
  password: string
  message: string
}

const testCaseLogin: ITestLogin[] = [
  {
    email: 'ren@hah.com',
    password: '',
    message: '1. Nhập thiếu thông tin'
  },
  {
    email: 'ren',
    password: '122222',
    message: '2. Email không hợp lệ'
  },
  
  {
    email: 'renter@gmail.com',
    password: '123123',
    message: '3. Tài khoản mật khẩu không chính xác'
  },
  {
    email: 'renter@gmail.com',
    password: '123456',
    message: '4. Đăng nhập thành công với vai trò renter'
  },
  {
    email: 'admin@gmail.com',
    password: '123456',
    message: '5. Đăng nhập thành công với vai trò admin'
  },
]

describe("Login test", () => {
  testCaseLogin.forEach((testCase: ITestLogin) => {
    it(`${testCase.message}`, () => {
      cy.viewport(1920, 1280)
      cy.visit(baseUrl + "/login");
      if(testCase.email) cy.get('input[name="email"]').type(testCase.email);
      if(testCase.password) cy.get('input[name="password"]').type(testCase.password);
      cy.get('button[type="submit"]').click();
      cy.wait(5000);
    });
  });
});

// cy.scrollTo(0, 500) // Scroll the window 500px down
// cy.get('.sidebar').scrollTo('bottom') // Scroll 'sidebar' to its bottom