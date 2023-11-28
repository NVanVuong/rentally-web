

// interface ITest {
//   email: string
//   password:string
//   confirmPassword:string
//   firstName: string
//   lastName: string
//   phoneNumber: string
// } 

// const testSucess:ITest[] = [
//   {
//     email: 'renterxx@hmail.com',
//     password:'123123',
//     confirmPassword:'123123',
//     firstName:'hoang',
//     lastName:'nguyen',
//     phoneNumber:'0852336246' 
//   },
//   {
//     email: 'renterxxx@hmail.com',
//     password:'123123',
//     confirmPassword:'123123',
//     firstName:'hoang',
//     lastName:'nguyen',
//     phoneNumber:'0852336247' 
//   },
// ]

// const testFail:ITest[] = [
//   {
//     email: 'renterxx@hmail.com',
//     password:'12312',
//     confirmPassword:'123123',
//     firstName:'hoang',
//     lastName:'nguyen',
//     phoneNumber:'0852336246' 
//   },
//   {
//     email: 'renterxxx@hmail.com',
//     password:'123123',
//     confirmPassword:'123123',
//     firstName:'hoang',
//     lastName:'nguyen',
//     phoneNumber:'085233624' 
//   },
// ]  



// describe("SignUp Tests", () => {
//   testSucess.forEach((testCase, index) => {
//     it(`${index + 10} : ${testCase.message}`, () => {
//       cy.visit(baseUrl + "/sign-up");
//       cy.get('input[name="email"]').type(testCase.email);
//       cy.wait(1000);
//       cy.get('input[name="name"]').type(testCase.name);
//       cy.wait(1000);
//       cy.get('#eye-icon').click();
//       cy.wait(1000);
//       cy.get('input[name="password"]').type(testCase.password);
//       cy.wait(1000);
//       cy.get('#select-gender-signup').click();
//       cy.wait(1000);
//       if (testCase.gender) {
//         cy.get('#select-gender-signup-female').click();
//       }
//       else {
//         cy.get('#select-gender-signup-male').click();
//       }
//       cy.wait(1000);
//       // select date of birth
//       cy.get('#date-picker-signup').click();
//       cy.get('#date-picker-signup').type(testCase.date_of_birth);
//       cy.wait(1000);

//       cy.get('#select-role-signup').click();
//       cy.wait(1000);
//       if (testCase.role == "mentee") {
//         cy.get('#select-role-signup-mentee').click();
//       }
//       else {
//         cy.get('#select-role-signup-mentor').click();
//       }
//       cy.wait(1000);
//       cy.get('button[type="submit"]').click();
//       cy.wait(5000);
//       if (index != 0) {
//         cy.get('.swal2-confirm').click();
//         cy.wait(1000);
//         cy.get('#dropdownMenuButton1').click();
//         cy.wait(2000);
//       }
//     });
//   });
// });
