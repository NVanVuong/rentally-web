
interface ITestCreateRooms {
    area: string;
    price: string
    depositAmount: string;
    quantity: string
    utility: number
    image: {
        fileName: string
        filePath: string
        mimeType?: string
    }
    message: string

}

const testCaseCreateRooms: ITestCreateRooms[] = [
    {
        area: '',
        price: '1',
        depositAmount: '1',
        quantity: '1',
        utility: 1,
        image: {
            fileName: '463156637.jpg',
            filePath: 'C:/Users/nhath/Downloads/463156637.jpg',
        },
        message: '1. Nhập thiếu thông tin',

    },
    {
        area: '-1',
        price: '1',
        depositAmount: '1',
        quantity: '1',
        utility: 1,
        image: {
            fileName: '463156637.jpg',
            filePath: 'C:/Users/nhath/Downloads/463156637.jpg',
        },
        message: '2. Nhập thông tin không hợp lệ',

    },
    {
        area: '1',
        price: '1',
        depositAmount: '1',
        quantity: '1',
        utility: 1,
        image: {
            fileName: 'UnitTest.xlsx',
            filePath: 'C:/Users/nhath/Downloads/UnitTest.xlsx',
            mimeType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        },
        message: '3. Nhập thông tin tệp không hợp lệ',

    },
    {
        area: '1',
        price: '1',
        depositAmount: '1',
        quantity: '1',
        utility: 1,
        image: {
            fileName: '463156637.jpg',
            filePath: 'C:/Users/nhath/Downloads/463156637.jpg',
        },
        message: '4. Tạo các phòng thành công',

    }
]

import "cypress-file-upload";
describe("create rooms", () => {
    beforeEach(() => {
        cy.wait(2000);
        cy.visit("http://localhost:5173/login"); cy.wait(500);
        cy.get('input[name="email"]').type("admin@gmail.com", { force: true })
        cy.wait(1000);
        cy.get('input[name="password"]').type("123456", { force: true })
        cy.wait(1000);
        cy.get('button[type="submit"]').click({ force: true });
        cy.wait(1000);
        cy.get(".ant-dropdown-trigger").click({ force: true }); cy.wait(500);
        cy.contains('Admin').click({ force: true }); cy.wait(1000);
        cy.get('#roomBlocks').click({ force: true }); cy.wait(1000);
        cy.get('[data-row-key="1"] > :nth-child(7) > .ant-space > .ant-space-item > .cursor-pointer').click({ force: true }); cy.wait(500);
        cy.contains('View').click({ force: true }); cy.wait(500);
        cy.contains('Add new').click({ force: true }); cy.wait(500);
    });
    testCaseCreateRooms.forEach((testCase: ITestCreateRooms) => {
        it(testCase.message, () => {

            if(testCase.area) cy.get('#area').type(testCase.area);
            if(testCase.price) cy.get('#price').type(testCase.price);
            if(testCase.depositAmount) cy.get('#depositAmount').type(testCase.depositAmount);
            if(testCase.quantity)cy.get('#quantity').type(testCase.quantity);

            if(testCase.utility){
                cy.get('[data-testid="ArrowDropDownIcon"] > path').click({ force: true }); cy.wait(500);
            cy.get('#tags-outlined-option-'+testCase.utility).click({ force: true }); cy.wait(500);
            }
            if(testCase.image){
                const fileName = testCase.image.fileName;
                const filePath = testCase.image.filePath;
                cy.readFile(filePath, "base64").then((fileContent) => {
                cy.get('#images').attachFile({
                    fileContent: fileContent,
                    fileName: fileName,
                    mimeType: testCase.image.mimeType || "image/jpeg",
                    encoding: "base64",
                });
            });
            }
            
            cy.contains("Finish").click(); cy.wait(2000);
        });
    });
    // it("avatar changed failfully", () => {

    //     cy.get('#area').type('1')
    //     cy.get('#price').type('1')
    //     cy.get('#depositAmount').type('1')
    //     cy.get('#quantity').type('1')

    //     cy.get('[data-testid="ArrowDropDownIcon"] > path').click({ force: true }); cy.wait(500);
    //     cy.get('#tags-outlined-option-0').click({ force: true }); cy.wait(500);
    //     const fileName = "463156637.jpg";
    //     const filePath = "C:/Users/nhath/Downloads/463156637.jpg";
    //     cy.readFile(filePath, "base64").then((fileContent) => {
    //         cy.get('#images').attachFile({
    //             fileContent: fileContent,
    //             fileName: fileName,
    //             mimeType: "image/jpeg",
    //             encoding: "base64",
    //         });
    //     });
    //     cy.contains("Finish").click(); cy.wait(2000);

    // });


});
