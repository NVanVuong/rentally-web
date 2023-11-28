import "cypress-file-upload";
describe("avatar", () => {
    beforeEach(() => {
        cy.wait(2000);
        cy.visit("http://localhost:5173"); cy.wait(500);
        cy.contains("Đăng nhập").click({ force: true }); cy.wait(500);
        cy.get('input[name="email"]')
            .type("thoathoa0110@gmail.com", { force: true })
            .should("have.value", "thoathoa0110@gmail.com"); cy.wait(500);
        cy.get('input[name="password"]')
            .type("111111", { force: true })
            .should("have.value", "111111"); cy.wait(500);
        cy.get('button[type="submit"]').click({ force: true });
    });

    it("avatar changed successfully", () => {
        cy.wait(2000);
        cy.get("#dropdownMenuButton1").click({ force: true }); cy.wait(500);
        cy.contains("Xem hồ sơ của bạn").click({ force: true }); cy.wait(500);
        const fileName = "12_bo-cute.jpg";
        const filePath = "c:/Users/Asus/Downloads/12_bo-cute.jpg";
        cy.readFile(filePath, "base64").then((fileContent) => {
            cy.get('input[name="avatar"]').attachFile({
                fileContent: fileContent,
                fileName: fileName,
                mimeType: "image/png or image/jpg",
                encoding: "base64",
            });
        });
        cy.contains("Lưu thay đổi").click(); cy.wait(2000);
        cy.get("#dropdownMenuButton1").click({ force: true }); cy.wait(500);
        cy.contains("Xem hồ sơ của bạn").click({ force: true }); cy.wait(3000);
    });

    it("invalid file", () => {
        cy.wait(2000);
        cy.get("#dropdownMenuButton1").click({ force: true }); cy.wait(500);
        cy.contains("Xem hồ sơ của bạn").click({ force: true }); cy.wait(500);
        const fileName = "TestCaseTemplate.xls";
        const filePath =
            "c:/Users/Asus/Documents/7/KTPM/BaiTap/TestCaseTemplate.xls";
        cy.readFile(filePath, "base64").then((fileContent) => {
            cy.get('input[name="avatar"]').attachFile({
                fileContent: fileContent,
                fileName: fileName,
                mimeType: "image/png",
                encoding: "base64",
            });
        });
        cy.contains("Lưu thay đổi").click(); cy.wait(2000);
        cy.get("#dropdownMenuButton1").click({ force: true }); cy.wait(500);
        cy.contains("Xem hồ sơ của bạn").click({ force: true }); cy.wait(3000);
    });


});
