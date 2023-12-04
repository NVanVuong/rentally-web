const testCase = [
    {
        name: "Login with empty email and password",
        data: {},
        expectedMessage: ["Please input email!", "Please input password!"]
    },
    {
        name: "Login with empty email",
        data: {
            password: "12345678"
        },
        expectedMessage: "Please input email!"
    },
    {
        name: "Login with empty password",
        data: {
            email: "nvanvuong@gmail.com"
        },
        expectedMessage: "Please input password!"
    },
    {
        name: "Login with invalid email",
        data: {
            email: "aaaaaaaaaaa",
            password: "12345678"
        },
        expectedMessage: "Invalid email format!"
    },
    {
        name: "Login with incorrect email and password",
        data: {
            email: "nvanvuong@gmail.com",
            password: "12345678"
        },
        expectedMessage: "Invalid email or password"
    },
    {
        name: "Login with unverified email",
        data: {
            email: "Kianna.Towne@yahoo.com",
            password: "123456"
        },
        expectedMessage: "Email has not been verified"
    },
    {
        name: "Login with disabled account",
        data: {
            email: "Valentina_DuBuque86@yahoo.com",
            password: "123456"
        },
        expectedMessage: "User are disabled"
    },
    {
        name: "Login with valid email and password",
        data: {
            email: "admin@gmail.com",
            password: "123456"
        },
        expectedMessage: "No error message"
    }
]

describe("Login", () => {
    beforeEach(() => {
        cy.visit("https://rentally-testing.netlify.app/login")
        cy.wait(2000)
    })

    testCase.forEach((testCase) => {
        it(testCase.name, () => {
            Object.entries(testCase.data).forEach(([field, value]) => {
                if (!value) {
                    return
                }
                cy.get(`[id="${field}"]`).type(value)
            })

            cy.get('button[type="submit"]').click()

            if (testCase.expectedMessage) {
                if (testCase.expectedMessage === "No error message") {
                    cy.get('[class="error-message"]').should("not.exist")
                    cy.get('[class="ant-message-notice-content"]').should("not.exist")
                } else {
                    const messages = Array.isArray(testCase.expectedMessage)
                        ? testCase.expectedMessage
                        : [testCase.expectedMessage]

                    messages.forEach((expectedMessage) => {
                        cy.contains(expectedMessage).should("be.visible")
                    })
                }
            }
        })
    })
})
