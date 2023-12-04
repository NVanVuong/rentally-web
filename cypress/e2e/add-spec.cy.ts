import "cypress-file-upload"

const testCases = [
    {
        name: "requires all required fields",
        data: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            role: ""
        },
        expectedMessages: {
            email: "Please input email!",
            password: "Please input password!",
            firstName: "Please input firstname!",
            phoneNumber: "Please input phone number!",
            role: "Please select a role!"
        }
    },
    {
        name: "requires email field",
        data: {
            password: "0905123456",
            firstName: "New",
            lastName: "User",
            phoneNumber: "0905323456",
            photo: {
                fieldName: "photo",
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Please input email!"
    },
    {
        name: "requires password field",
        data: {
            email: "newuser@example.com",
            firstName: "New",
            lastName: "User",
            phoneNumber: "0905123456",
            photo: {
                fieldName: "photo",
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Please input password!"
    },
    {
        name: "requires firstName field",
        data: {
            email: "newuser@example.com",
            password: "12345678",
            lastName: "User",
            phoneNumber: "0905123456",
            photo: {
                fieldName: "photo",
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Please input firstname!"
    },
    {
        name: "requires phoneNumber field",
        data: {
            email: "newuser@example.com",
            password: "12345678",
            firstName: "New",
            lastName: "User",
            photo: {
                fieldName: "photo",
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Please input phone number!"
    },
    {
        name: "requires role field",
        data: {
            email: "newuser@example.com",
            password: "12345678",
            firstName: "New",
            lastName: "User",
            photo: {
                fieldName: "photo",
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            phoneNumber: "0901171605"
        },
        expectedMessage: "Please select a role!"
    },
    {
        name: "requires valid email format",
        data: {
            email: "invalidemailformat",
            password: "12345678",
            firstName: "New",
            lastName: "User",
            phoneNumber: "0905323456",
            photo: {
                fieldName: "photo",
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "The input is not valid email!"
    },
    {
        name: "requires valid phoneNumber format",
        data: {
            email: "newuser@example.com",
            password: "12345678",
            firstName: "New",
            lastName: "User",
            phoneNumber: "11111",
            photo: {
                fieldName: "photo",
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Please input a valid phone number with 10 digits"
    },
    {
        name: "shows 'Email is already in use' message",
        data: {
            email: "newuser@example.com",
            password: "12345678",
            firstName: "Existing",
            lastName: "User",
            phoneNumber: "0905555555",
            photo: {
                fieldName: "photo",
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Email is already in use"
    },
    {
        name: "shows 'Phone number is already in use' message",
        data: {
            email: "newuser999@example.com",
            password: "12345678",
            firstName: "New",
            lastName: "User",
            phoneNumber: "0905123456",
            photo: {
                fieldName: "photo",
                fileName: "4043276_christmas_clous_santa_icon.png",
                fileType: "image/png"
            },
            role: "User"
        },
        expectedMessage: "Phone number is already in use"
    },
    {
        name: "adds a new user successfully",
        data: {
            email: "newuser6@example.com",
            password: "12345678",
            firstName: "New",
            lastName: "User",
            phoneNumber: "0905823456",
            photo: {
                fieldName: "photo",
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
        cy.visit("http://localhost:5173/login")
        cy.get('[name="email"]').type("admin@gmail.com")
        cy.get('[name="password"]').type("123456")
        cy.get('button[type="submit"]').click()
        cy.wait(2000)
    })

    testCases.forEach((testCase) => {
        it(testCase.name, () => {
            cy.visit("http://localhost:5173/admin/users")
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
                                fileName: testCase.data.photo.fileName,
                                mimeType: testCase.data.photo.fileType
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
                cy.contains(testCase.expectedMessage).should("be.visible")
            }
        })
    })
})
