import { render } from "@testing-library/react";
import { Button } from "../Button";

describe("<Button />", () => {
    it("should render OK with props", () => {
        const { debug, getByText, rerender } = render(
            <Button canClick={true} loading={false} actionText="test" />
        );
        getByText("test");
        // debug();

        // rerender(<Button canClick={true} loading={true} actionText="test" />);
        // debug();
        // getByText("Loading...");
    });

    it("should display loading", () => {
        const { debug, getByText, container } = render(
            <Button canClick={false} loading={true} actionText="test" />
        );

        getByText("Loading...");
        expect(container.firstChild).toHaveClass("bg-gray-300 pointer-events-none");
    });
});
