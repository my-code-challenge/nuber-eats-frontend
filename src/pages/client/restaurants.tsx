import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { restaurantsQuery, restaurantsQueryVariables } from "../../__generated__/restaurantsQuery";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

/** Apollo */
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";

/** components */
import Restaurant from "../../components/Restaurant";

export interface ISearchFormProps {
    searchTerm: string;
}

const RESTAURANTS_QUERY = gql`
    ${RESTAURANT_FRAGMENT}
    ${CATEGORY_FRAGMENT}
    query restaurantsQuery($input: RestaurantsInput!) {
        allCategories {
            ok
            error
            categories {
                ...CategoryParts
            }
        }
        allRestaurants(input: $input) {
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

export const Restaurants = () => {
    const history = useHistory();
    const [page, setPage] = useState(1);
    const { data, loading } = useQuery<restaurantsQuery, restaurantsQueryVariables>(
        RESTAURANTS_QUERY,
        {
            variables: {
                input: {
                    page,
                },
            },
        }
    );

    const onPageClick = (type: "prev" | "next") => () =>
        setPage((prev) => (type === "next" ? prev + 1 : prev - 1));

    const { register, handleSubmit, getValues } = useForm<ISearchFormProps>();

    const onSearchSubmit = () => {
        const { searchTerm } = getValues();
        history.push({
            pathname: "/search",
            search: `?term=${searchTerm}`,
        });
    };

    return (
        <>
            <Helmet>
                <title>Home | Nuber Eats</title>
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
                            <div className="flex justify-around max-w-screen-sm mx-auto">
                                {data?.allCategories.categories?.map((category, index) => (
                                    <Link
                                        key={`category-${index}`}
                                        to={`/category/${category.slug}`}
                                    >
                                        <div className="flex flex-col items-center cursor-pointer group">
                                            <div
                                                className="w-16 h-16 rounded-full bg-cover group-hover:bg-gray-200"
                                                style={{
                                                    backgroundImage: `url(${category.coverImage})`,
                                                }}
                                            />
                                            <span className="mt-1 text-sm text-center font-medium">
                                                {category.name}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-16 grid md:grid-cols-3 gap-x-5 gap-y-10">
                                {data?.allRestaurants.restaurants?.map((restaurant, index) => (
                                    <Restaurant
                                        key={`restaurant-${index}`}
                                        {...restaurant}
                                        categoryName={restaurant.category?.name}
                                    />
                                ))}
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
                                    Page {page} of {data?.allRestaurants.totalPages}
                                </span>
                                {page !== data?.allRestaurants.totalPages ? (
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
