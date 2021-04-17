import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { render, waitFor, RenderResult } from "../../test-utils";
import userEvent from "@testing-library/user-event";

import Login, { LOGIN_MUTATION, ILoginForm } from "../login";

const loginArgs: ILoginForm = {
    email: "customer@customer.com",
    password: "12345",
};

describe("<Login />", () => {
    let renderResult: RenderResult;
    let mockedClient: MockApolloClient;
    beforeEach(async () => {
        await waitFor(() => {
            mockedClient = createMockClient();
            renderResult = render(
                <ApolloProvider client={mockedClient}>
                    <Login />
                </ApolloProvider>
            );
        });
    });

    it("should render OK", async () => {
        await waitFor(() => {
            expect(document.title).toBe("Login | Nuber Eats");
        });
    });

    it("display email validation errors", async () => {
        const { debug, getByPlaceholderText, getByRole } = renderResult;
        const email = getByPlaceholderText(/email/i);

        await waitFor(() => {
            userEvent.type(email, "error@error");
        });
        let errorMessage = getByRole("alert");

        expect(errorMessage).toHaveTextContent("이메일 형식이 아닙니다");

        await waitFor(() => {
            userEvent.clear(email);
        });
        expect(errorMessage).toHaveTextContent("이메일 입력은 필수입니다");
    });

    it("display password required errors", async () => {
        const { debug, getByPlaceholderText, getByRole } = renderResult;
        const email = getByPlaceholderText(/email/i);
        const password = getByPlaceholderText(/password/i);

        await waitFor(() => {
            userEvent.type(email, loginArgs.email);
            userEvent.type(password, "1");
            userEvent.clear(password);
        });

        let errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent("비밀번호 입력은 필수입니다");
    });

    it("submits form and calls mutation", async () => {
        const { debug, getByPlaceholderText, getByRole } = renderResult;
        const email = getByPlaceholderText(/email/i);
        const password = getByPlaceholderText(/password/i);
        const submitBtn = getByRole("button");

        const mockedMutationResponse = jest.fn().mockResolvedValue({
            data: {
                login: {
                    ok: true,
                    error: "mutation error test",
                    token: "XXX",
                },
            },
        });
        mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);

        // before localstorage start
        jest.spyOn(Storage.prototype, "setItem");

        await waitFor(() => {
            userEvent.type(email, loginArgs.email);
            userEvent.type(password, loginArgs.password);
            submitBtn.removeAttribute("disabled");
            userEvent.click(submitBtn);
        });

        expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
        expect(mockedMutationResponse).toHaveBeenCalledWith({
            loginInput: {
                email: loginArgs.email,
                password: loginArgs.password,
            },
        });

        const errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent("mutation error test");

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith("token", "XXX");
    });
});
