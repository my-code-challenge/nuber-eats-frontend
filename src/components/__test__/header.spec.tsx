import { render, waitFor } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { Header } from "../Header";
import { ME_QUERY } from "../../hooks/useMe";

const mocks = (verified: boolean = false): ReadonlyArray<MockedResponse> => [
    {
        request: {
            query: ME_QUERY,
        },
        result: {
            data: {
                me: {
                    id: 1,
                    email: "",
                    role: "",
                    verified,
                },
            },
        },
    },
];

describe("<Header />", () => {
    it("renders with verify banner OK", async () => {
        await waitFor(async () => {
            const { debug, getByText } = render(
                <MockedProvider mocks={mocks()}>
                    <Router>
                        <Header />
                    </Router>
                </MockedProvider>
            );

            await new Promise((resolver) => setTimeout(resolver, 0));
            getByText("Please verify your email.");
        });
    });

    it("redners without verify banner", async () => {
        await waitFor(async () => {
            const { debug, queryByText, getByRole } = render(
                <MockedProvider mocks={mocks(true)}>
                    <Router>
                        <Header />
                    </Router>
                </MockedProvider>
            );

            await new Promise((resolver) => setTimeout(resolver, 0));
            expect(queryByText("Please verify your email.")).toBe(null);

            const logoutBtn = getByRole("button");
            userEvent.click(logoutBtn);
        });
    });
});
