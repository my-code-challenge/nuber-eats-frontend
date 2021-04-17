import { ApolloProvider } from "@apollo/client";
import { RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { render, waitFor } from "../../test-utils";
import { UserRole } from "../../__generated__/globalTypes";

/** components */
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from "../create-account";

// 변수명의 앞(prefix)는 mock으로 시작 해야함.
const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
    // 이미 테스팅라이브러리에 해당 모듈의 mock이 존재 하는데 재선언함으로써 에러 반환을 requireActual로 해결
    const realModule = jest.requireActual("react-router-dom");
    return {
        ...realModule,
        useHistory: () => {
            return {
                push: mockPush,
            };
        },
    };
});

describe("<CreateAccount />", () => {
    let mockedClient: MockApolloClient;
    let renderResult: RenderResult;
    beforeEach(async () => {
        await waitFor(() => {
            mockedClient = createMockClient();
            renderResult = render(
                <ApolloProvider client={mockedClient}>
                    <CreateAccount />
                </ApolloProvider>
            );
        });
    });
    it("renders OK", async () => {
        await waitFor(() => {
            expect(document.title).toBe("Create Account | Nuber Eats");
        });
    });

    it("renders validation errors", async () => {
        const { debug, getByRole, getByPlaceholderText } = renderResult;

        const email = getByPlaceholderText(/email/i);
        const password = getByPlaceholderText(/password/i);
        const button = getByRole("button");

        await waitFor(() => {
            userEvent.type(email, "customer@customer");
        });

        let errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent("이메일 형식이 아닙니다");

        await waitFor(() => {
            userEvent.clear(email);
        });

        expect(errorMessage).toHaveTextContent("이메일 입력은 필수입니다");

        await waitFor(() => {
            userEvent.type(email, "customer@customer.com");
            button.removeAttribute("disabled");
            userEvent.click(button);
        });

        errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent("비밀번호 입력은 필수입니다");
    });

    it("submit mutation with form values", async () => {
        const { debug, getByRole, getByPlaceholderText } = renderResult;

        const email = getByPlaceholderText(/email/i);
        const password = getByPlaceholderText(/password/i);
        const button = getByRole("button");

        const formData = {
            email: "customer@customer.com",
            password: "12345",
            role: UserRole.Client,
        };

        const mockedLoginMutationResponse = jest.fn().mockResolvedValue({
            data: {
                createAccount: {
                    ok: true,
                    error: "mutation error test",
                },
            },
        });

        mockedClient.setRequestHandler(CREATE_ACCOUNT_MUTATION, mockedLoginMutationResponse);
        jest.spyOn(window, "alert").mockImplementation(() => null);

        await waitFor(() => {
            userEvent.type(email, formData.email);
            userEvent.type(password, formData.password);
            button.removeAttribute("disabled");
            userEvent.click(button);
        });

        expect(mockedLoginMutationResponse).toHaveBeenCalledTimes(1);
        expect(mockedLoginMutationResponse).toHaveBeenCalledWith({
            createAccountInput: {
                email: formData.email,
                password: formData.password,
                role: formData.role,
            },
        });
        expect(window.alert).toHaveBeenCalledWith("Account Create! Login now!");
        expect(mockPush).toHaveBeenCalledWith("/");

        const mutationErrorMessage = getByRole("alert");
        expect(mutationErrorMessage).toHaveTextContent("mutation error test");
    });
});

/**
 * jest.mock을 실행 할 경우 마지막에 초기화 선언
 */
afterAll(() => {
    jest.clearAllMocks();
});
