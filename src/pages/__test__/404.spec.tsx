import { render, waitFor } from "../../test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { NotFound } from "../404";

describe("<NotFound />", () => {
    it("renders OK", async () => {
        const { debug, getByText } = render(<NotFound />);

        getByText("Page Not Found.");
        getByText("The page you're looking for does not exist or has moved.");
        getByText("Go Back home →");

        await waitFor(() => {
            expect(document.title).toEqual("Not Found | Nuber Eats");
        });
    });
});
