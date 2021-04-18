describe("Create Account", () => {
    it("should see email & password validation erros", () => {
        cy.visit("/");
        cy.findByText("Create an account").click();
        cy.findByPlaceholderText("Email").type("none@good");
        cy.findByRole("alert").should("have.text", "이메일 형식이 아닙니다");

        cy.findByPlaceholderText("Email").clear();
        cy.findByRole("alert").should("have.text", "이메일 입력은 필수입니다");

        cy.findByPlaceholderText("Email").type("customer@custoemr.com");
        cy.findByPlaceholderText("Password").type("a").clear();
        cy.findByRole("alert").should("have.text", "비밀번호 입력은 필수입니다");
    });

    it("should be able to create account and login", () => {
        cy.intercept("http://localhost:4000/graphql", (req) => {
            // console.log(req.body);
            const { operationName } = req.body;
            if (operationName && operationName === "createAccountMutation") {
                req.reply((res) => {
                    res.send({ fixture: "auth/create-account.json" });
                });
            }
        });
        cy.visit("/create-account");
        cy.findByPlaceholderText("Email").type("test@test.com");
        cy.findByPlaceholderText("Password").type("12345");
        cy.findByRole("button").click();

        cy.wait(1000);
        //@ts-ignore
        cy.login("customer@customer.com", "12345");
    });
});
