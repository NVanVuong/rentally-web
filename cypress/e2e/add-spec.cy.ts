import "cypress-file-upload"

const testCases = [
    {
        name: "Requires all required fields",
        data: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            role: ""
        },
        expectedMessages: [
            "Please input email!",
            "Please input password!",
            "Please input firstname!",
            "Please input phone number!",
            "Please select a role!"
        ]
    },
    {
        name: "Requires email field",
        data: {
            password: "0905123456",
            firstName: "New",
            lastName: "User",
            phoneNumber: "0905323456",
            photo: {
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Please input email!"
    },
    {
        name: "Requires password field",
        data: {
            email: "newuser@example.com",
            firstName: "New",
            lastName: "User",
            phoneNumber: "0905123456",
            photo: {
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Please input password!"
    },
    {
        name: "Requires firstName field",
        data: {
            email: "newuser@example.com",
            password: "12345678",
            lastName: "User",
            phoneNumber: "0905123456",
            photo: {
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Please input firstname!"
    },
    {
        name: "Requires phoneNumber field",
        data: {
            email: "newuser@example.com",
            password: "12345678",
            firstName: "New",
            lastName: "User",
            photo: {
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Please input phone number!"
    },
    {
        name: "Requires role field",
        data: {
            email: "newuser@example.com",
            password: "12345678",
            firstName: "New",
            lastName: "User",
            photo: {
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            phoneNumber: "0901171605"
        },
        expectedMessage: "Please select a role!"
    },
    {
        name: "Requires valid email format",
        data: {
            email: "invalidemailformat",
            password: "12345678",
            firstName: "New",
            lastName: "User",
            phoneNumber: "0905323456",
            photo: {
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "The input is not valid email!"
    },
    {
        name: "Requires valid phone number format",
        data: {
            email: "newuser@example.com",
            password: "12345678",
            firstName: "New",
            lastName: "User",
            phoneNumber: "11111",
            photo: {
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Please input a valid phone number with 10 digits"
    },
    {
        name: "Check email is already in use",
        data: {
            email: "newuser@example.com",
            password: "12345678",
            firstName: "Existing",
            lastName: "User",
            phoneNumber: "0905555555",
            photo: {
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Email is already in use"
    },
    {
        name: "Check phone number is already in use",
        data: {
            email: "newuser999@example.com",
            password: "12345678",
            firstName: "New",
            lastName: "User",
            phoneNumber: "0905123456",
            photo: {
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Phone number is already in use"
    },
    {
        name: "Add a new user successfully",
        data: {
            email: "newuser7@example.com",
            password: "12345678",
            firstName: "New",
            lastName: "User",
            phoneNumber: "0905923456",
            photo: {
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Added user successfully"
    }
]

describe("Users Management - Add account", () => {
    beforeEach(() => {
        cy.visit("https://rentally-testing.netlify.app/login")
        cy.get('[name="email"]').type("admin@gmail.com")
        cy.get('[name="password"]').type("123456")
        cy.get('button[type="submit"]').click()
        cy.wait(2000)
    })

    testCases.forEach((testCase) => {
        it(testCase.name, () => {
            cy.visit("https://rentally-testing.netlify.app/admin/users")
            cy.contains("Add new").click()
            cy.get('[id="modal-title"]').should("exist").should("have.text", "Register New Account")

            Object.entries(testCase.data).forEach(([field, value]) => {
                if (!value) {
                    return
                }
                if (field === "photo" && testCase.data.photo) {
                    cy.readFile("C:/Users/NVVuong/Downloads/4043276_christmas_clous_santa_icon.png", "base64").then(
                        (fileContent) => {
                            cy.get('[id="photo"]').attachFile({
                                fileContent: fileContent,
                                fileName: testCase.data.photo?.fileName,
                                mimeType: testCase.data.photo?.fileType
                            })
                        }
                    )
                } else if (field === "role") {
                    cy.get(`[id="${field}"]`).click()
                    cy.get(".ant-select-item-option")
                        .contains(value as string)
                        .click()
                } else {
                    cy.get(`[id="${field}"]`).type(value as string)
                }
            })

            cy.get('button[type="submit"]').click()

            if (testCase.name === "adds a new user successfully") cy.wait(2000)

            if (testCase.expectedMessage) {
                const messages = Array.isArray(testCase.expectedMessage)
                    ? testCase.expectedMessage
                    : [testCase.expectedMessage]

                messages.forEach((expectedMessage) => {
                    cy.contains(expectedMessage).should("be.visible")
                })
            }
        })
    })
})
