
  interface ITestSignUp {
    email: string
    password:string
    confirmPassword:string
    firstName: string
    lastName: string
    phoneNumber: string
    message:string
  } 
  
  const testCaseSignups:ITestSignUp[] = [
    {
      email: 'renterxxx@hmail.com',
      password:'',
      confirmPassword:'123123',
      firstName:'hoang',
      lastName:'nguyen',
      phoneNumber:'0852336247',
      message: '1. Các thông tin không được để trống'
    },
    {
      email: 'renterxxmail.com',
      password:'123123',
      confirmPassword:'123123',
      firstName:'hoang',
      lastName:'nguyen',
      phoneNumber:'0852336246',
      message: '2. Email không hợp lệ'
    },
  
    {
      email: 'renterxx@hmail.com',
      password:'12312',
      confirmPassword:'12312',
      firstName:'hoang',
      lastName:'nguyen',
      phoneNumber:'0852336246' ,
      message: '3. Password không hợp lệ'
    },
    {
      email: 'renterxxx@hmail.com',
      password:'123123',
      confirmPassword:'1231233',
      firstName:'hoang',
      lastName:'nguyen',
      phoneNumber:'0852336242',
      message: '4. Confirm password không giống password' 
    },
    {
      email: 'renterxxx@hmail.com',
      password:'123123',
      confirmPassword:'123123',
      firstName:'hoang',
      lastName:'nguyen',
      phoneNumber:'085233624',
      message: '5. Số điện thoại không hợp lệ' 
    },
    {
      email: 'renter@gmail.com',
      password:'123123',
      confirmPassword:'123123',
      firstName:'hoang',
      lastName:'nguyen',
      phoneNumber:'0852336246',
      message: '6. Email đã tồn tại' 
    },
    {
      email: 'renterx@hmail.com',
      password:'123123',
      confirmPassword:'123123',
      firstName:'hoang',
      lastName:'nguyen',
      phoneNumber:'0852336242',
      message: '7. Số điện thoại đã tồn tại' 
    },
    {
      email: 'renterxxx@hmail.com',
      password:'123123',
      confirmPassword:'123123',
      firstName:'hoang',
      lastName:'nguyen',
      phoneNumber:'0852336245',
      message: '8. Đăng kí thành công' 
    },
  ]  
  
  describe("SignUp Tests", () => {
   

    testCaseSignups.forEach((testCase:ITestSignUp) => {
      it(`${testCase.message}`, () => {
        cy.viewport(1920, 1280)
        cy.visit( "http://localhost:5173/register");
        if(testCase.email) cy.get('input[name="email"]').type(testCase.email);
        cy.wait(1000);
        if(testCase.password) cy.get('input[name="password"]').type(testCase.password);
        cy.wait(1000);
        if(testCase.confirmPassword) cy.get('input[name="confirmPassword"]').type(testCase.confirmPassword);
        cy.wait(1000);
        if(testCase.firstName) cy.get('input[name="firstName"]').type(testCase.firstName);
        cy.wait(1000);
        if(testCase.lastName) cy.get('input[name="lastName"]').type(testCase.lastName);
        cy.wait(1000);
        if(testCase.phoneNumber) cy.get('input[name="phoneNumber"]').type(testCase.phoneNumber);
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.wait(5000);
      });
    });
  });

  