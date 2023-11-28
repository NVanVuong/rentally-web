const baseUrl = 'http://localhost:5173';

interface IAccountLogin {
  email: string
  password: string
  message: string
}

const testLogin: IAccountLogin[] = [
  {
    email: 'ren',
    password: '122222',
    message: 'invalid email'
  },
  {
    email: 'ren@hah.com',
    password: '',
    message: 'Password must not be empty'
  },
  {
    email: 'renter@gmail.com',
    password: '123123',
    message: 'login failure'
  },
  {
    email: 'renter@gmail.com',
    password: '123456',
    message: 'login success'
  },
  {
    email: 'admin@gmail.com',
    password: '123456',
    message: 'login success'
  },
]

describe("Login test", () => {
  testLogin.forEach((testCase: IAccountLogin) => {
    it(`${testCase.message}`, () => {
      cy.viewport(1920, 1080)
      cy.visit(baseUrl + "/login");
      cy.get('input[name="email"]').type(testCase.email);
      if(testCase.password) cy.get('input[name="password"]').type(testCase.password);
      cy.get('button[type="submit"]').click();
      cy.wait(5000);
    });
  });
});

// cy.scrollTo(0, 500) // Scroll the window 500px down
// cy.get('.sidebar').scrollTo('bottom') // Scroll 'sidebar' to its bottom