/** hooks */
import { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useQueryString } from "../../hooks/useQueryString";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { useHistory } from "react-router";
import {
    searchRestaurantByNameQuery,
    searchRestaurantByNameQueryVariables,
} from "../../__generated__/searchRestaurantByNameQuery";

const SEARCH_RESTAURANT = gql`
    ${RESTAURANT_FRAGMENT}
    query searchRestaurantByNameQuery($input: SearchRestaurantInput!) {
        searchRestaurantByName(input: $input) {
            ok
            error
            totalPages
            totalResults
            restaurants {
                ...RestaurantParts
            }
        }
    }
`;

const Search = () => {
    const history = useHistory();
    const query = useQueryString("term");

    const [callQuery, { data, loading, called }] = useLazyQuery<
        searchRestaurantByNameQuery,
        searchRestaurantByNameQueryVariables
    >(SEARCH_RESTAURANT);

    useEffect(() => {
        if (!query) {
            return history.replace("/");
        }

        callQuery({
            variables: {
                input: {
                    page: 1,
                    query,
                },
            },
        });
    }, []);

    console.log(data, loading, called);

    return (
        <>
            <Helmet>
                <title>Search | Number Eats</title>
            </Helmet>
            <h1>Search Page</h1>
        </>
    );
};

export default Search;
