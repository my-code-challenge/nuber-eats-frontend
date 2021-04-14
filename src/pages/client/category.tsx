import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
    findCategoryBySlugQuery,
    findCategoryBySlugQueryVariables,
} from "../../__generated__/findCategoryBySlugQuery";

/** interfaces */
import { ISearchFormProps } from "./restaurants";

/** components */
import Restaurant from "../../components/Restaurant";

const CATEGORY_QUERY = gql`
    ${CATEGORY_FRAGMENT}
    ${RESTAURANT_FRAGMENT}
    query findCategoryBySlugQuery($input: CategoryInput!) {
        findCategoryBySlug(input: $input) {
            ok
            error
            totalPages
            totalResults
            category {
                ...CategoryParts
                restaurants {
                    ...RestaurantParts
                }
            }
        }
    }
`;

const Category = () => {
    const history = useHistory();
    const { slug } = useParams<{ slug: string }>();
    const [page, setPage] = useState(1);
    const { register, handleSubmit, getValues } = useForm<ISearchFormProps>();

    const { data, loading } = useQuery<findCategoryBySlugQuery, findCategoryBySlugQueryVariables>(
        CATEGORY_QUERY,
        {
            variables: {
                input: {
                    page,
                    slug,
                },
            },
        }
    );

    const onSearchSubmit = () => {
        const { searchTerm } = getValues();
        history.push({
            pathname: "/search",
            search: `?term=${searchTerm}`,
        });
    };

    const onPageClick = (type: "prev" | "next") => () =>
        setPage((prev) => (type === "next" ? prev + 1 : prev - 1));

    return (
        <>
            <Helmet>
                <title>{slug} | Nuber Eats</title>
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
                                {data?.findCategoryBySlug.category?.restaurants?.map(
                                    (restaurant, index) => (
                                        <Restaurant
                                            key={`restaurant-${index}`}
                                            {...restaurant}
                                            categoryName={restaurant.category?.name}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}
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
                            Page {page} of {data?.findCategoryBySlug.totalPages}
                        </span>
                        {page !== data?.findCategoryBySlug.totalPages ? (
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
            </div>
        </>
    );
};

export default Category;
