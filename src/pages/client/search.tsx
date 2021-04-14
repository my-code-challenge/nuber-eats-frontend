/** hooks */
import { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useQueryString } from "../../hooks/useQueryString";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { useHistory } from "react-router";
import {
    searchRestaurantByNameQuery,
    searchRestaurantByNameQueryVariables,
} from "../../__generated__/searchRestaurantByNameQuery";
import { useForm } from "react-hook-form";
import { ISearchFormProps } from "./restaurants";

/** components */
import Restaurant from "../../components/Restaurant";

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
    const [page, setPage] = useState(1);
    const history = useHistory();
    const query = useQueryString("term");
    const { register, handleSubmit, getValues } = useForm<ISearchFormProps>();

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
                    page,
                    query,
                },
            },
        });
    }, [query]);

    const onSearchSubmit = () => {
        const { searchTerm } = getValues();
        history.push({
            pathname: "/search",
            search: `?term=${searchTerm}`,
        });
    };

    const onPageClick = (type: "prev" | "next") => () =>
        setPage((prev) => (type === "next" ? prev + 1 : prev - 1));

    console.log(data, loading, called);

    return (
        <>
            <Helmet>
                <title>Search | Number Eats</title>
            </Helmet>
            <div>
                <form
                    onSubmit={handleSubmit(onSearchSubmit)}
                    className="bg-gray-800 w-full py-40 flex item-center justify-center"
                >
                    <input
                        {...register("searchTerm", {
                            required: true,
                            min: {
                                value: 3,
                                message: "최소 3자 이상 입력해야합니다",
                            },
                        })}
                        type="search"
                        className="input w-3/4 md:w-3/12 rounded-md border-0"
                        placeholder="Search restaurant..."
                    />
                </form>
                <div>
                    {!loading && (
                        <div className="container mt-8">
                            <div className="mt-16 grid md:grid-cols-3 gap-x-5 gap-y-10">
                                {data?.searchRestaurantByName.restaurants?.map(
                                    (restaurant, index) => (
                                        <Restaurant
                                            key={`restaurant-${index}`}
                                            {...restaurant}
                                            categoryName={restaurant.category?.name}
                                        />
                                    )
                                )}
                            </div>
                            <div className="mt-10 pb-40 grid grid-cols-3 text-center max-w-md items-center mx-auto">
                                {page > 1 ? (
                                    <button
                                        className="font-medium text-2xl focus:outline-none"
                                        onClick={onPageClick("prev")}
                                    >
                                        &larr;
                                    </button>
                                ) : (
                                    <div />
                                )}
                                <span>
                                    Page {page} of {data?.searchRestaurantByName.totalPages}
                                </span>
                                {page !== data?.searchRestaurantByName.totalPages ? (
                                    <button
                                        className="font-medium text-2xl focus:outline-none"
                                        onClick={onPageClick("next")}
                                    >
                                        &rarr;
                                    </button>
                                ) : (
                                    <div />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Search;
