import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
    findRestaurantByIdQuery,
    findRestaurantByIdQueryVariables,
} from "../../__generated__/findRestaurantByIdQuery";

const RESTAURANT_QUERY = gql`
    ${RESTAURANT_FRAGMENT}
    query findRestaurantByIdQuery($input: RestaurantInput!) {
        findRestaurantById(input: $input) {
            ok
            error
            restaurant {
                ...RestaurantParts
            }
        }
    }
`;

const Restaurant = () => {
    const params = useParams<{ id: string }>();

    const { data, loading } = useQuery<findRestaurantByIdQuery, findRestaurantByIdQueryVariables>(
        RESTAURANT_QUERY,
        {
            variables: {
                input: {
                    restaurantId: +params.id,
                },
            },
        }
    );

    console.log(data, loading, params);
    return (
        <>
            <Helmet>Restaurant | Nuber Eats</Helmet>
            <div
                className="bg-gray-800 py-48 bg-cover bg-center flex"
                style={{
                    backgroundImage: `url(${data?.findRestaurantById.restaurant?.coverImage})`,
                }}
            >
                <div className="bg-white w-auto lg:w-3/12 py-8 px-4">
                    <p className="text-3xl mb-3">{data?.findRestaurantById.restaurant?.name}</p>
                    <p className="text-sm font-light">
                        {data?.findRestaurantById.restaurant?.category?.name}
                    </p>
                    <p className="text-sm font-light">
                        {data?.findRestaurantById.restaurant?.address}
                    </p>
                </div>
            </div>
            <div className="container flex items-center justify-center">
                <div className="mt-12 py-40 px-5 xl:px-0">
                    <span className="text-2xl">Menu is empty 🥲</span>
                </div>
            </div>
        </>
    );
};

export default Restaurant;
