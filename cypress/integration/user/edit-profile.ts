describe("Edit Profile", () => {
    beforeEach(() => {
        //@ts-ignore
        cy.login("test@test.com", "12345");
        cy.get("a[href='/edit-profile']").click();
    });
    it("can go to /edit-profile using the header", () => {
        cy.title().should("eq", "Edit Profile | Nuber Eats");
    });

    it("can change email", () => {
        cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
            console.log(req.body);
            if (req.body.operationName === "editProfileMutation") {
                //@ts-ignore
                req.body.variables.input.email = "test@test.com";
            }
        });
        cy.findByPlaceholderText("Email").clear().type("test1@test.com");
        cy.findByText("변경하기").should("not.have.class", "pointer-events-none").click();
    });
});
