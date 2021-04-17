import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Restaurant, { IRestaurantProps } from "../Restaurant";

describe("<Restaurant />", () => {
    it("should OK with props", () => {
        const restaurantProps: IRestaurantProps = {
            id: 1,
            coverImage: "test",
            name: "name",
            categoryName: "categoryName",
        };
        const { debug, getByText, container } = render(
            <Router>
                <Restaurant {...restaurantProps} />
            </Router>
        );

        getByText(restaurantProps.name);
        getByText(restaurantProps.categoryName || "");

        expect(container.firstChild).toHaveAttribute("href", `/restaurant/${restaurantProps.id}`);

        // debug();
    });
});
