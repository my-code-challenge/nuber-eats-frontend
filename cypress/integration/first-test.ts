describe("LogIn", () => {
    it("should see login page", () => {
        cy.visit("/").title().should("eq", "Login | Nuber Eats");
    });

    it("can see email & password validation errors", () => {
        // email
        cy.visit("/");
        cy.findByPlaceholderText("Email").type("bad@email");
        cy.findByRole("alert").should("have.text", "이메일 형식이 아닙니다");
        cy.findByPlaceholderText("Email").clear();
        cy.findByRole("alert").should("have.text", "이메일 입력은 필수입니다");

        // password
        cy.findByPlaceholderText("Email").type("customer@customer.com");
        cy.findByPlaceholderText("Password").type("12345").clear();
        cy.findByRole("alert").should("have.text", "비밀번호 입력은 필수입니다");
    });

    it("can fill out the form", () => {
        // to do (can log in)
        cy.visit("/");
        cy.findByPlaceholderText("Email").type("customer@customer.com");
        cy.findByPlaceholderText("Password").type("12345");
        cy.findByRole("button").should("not.have.class", "pointer-events-none").click();
        cy.window().its("localStorage.token").should("be.a", "string");
    });

    it("sign up", () => {
        cy.visit("/create-account");
    });
});
