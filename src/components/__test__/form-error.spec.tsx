import { render } from "@testing-library/react";
import { FormError } from "../form-error";

describe("<FormError />", () => {
    it("render OK with props", () => {
        const { debug, getByText, container } = render(<FormError errorMessage="error" />);

        getByText("error");
        expect(container.firstChild).toHaveClass("error");
        // debug();
    });
});
