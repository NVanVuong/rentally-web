const testCase = [
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
        name: "Login with wrong email",
        data: {
            email: "aaaaaaaaaaa",
            password: "12345678"
        },
        expectedMessage: "Invalid email format!"
    },
    {
        name: "Login with wrong password",
        data: {
            email: "vuong@gmail.com",
            password: "123456789"
        },
        expectedMessage: "Invalid email or password!"
    }
]

describe("Login", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/login")
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
                // cy.get('[id="error-message"]').should("exist").should("have.text", testCase.expectedMessage)
                // cy.get('[class="ant-message-notice-content"]')
                //     .should("exist")
                //     .should("have.text", testCase.expectedMessage)
                cy.get('[id="error-message"]')
                    .should("have.text", testCase.expectedMessage)
                    .then((errorElement) => {
                        if (errorElement.length === 0) {
                            cy.get('[class="ant-message-notice-content"]')
                                .should("exist")
                                .should("have.text", testCase.expectedMessage)
                        }
                    })
            }
        })
    })
})
