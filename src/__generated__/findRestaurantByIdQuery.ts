/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: findRestaurantByIdQuery
// ====================================================

export interface findRestaurantByIdQuery_findRestaurantById_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface findRestaurantByIdQuery_findRestaurantById_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: findRestaurantByIdQuery_findRestaurantById_restaurant_category | null;
  address: string;
  isPromoted: boolean;
}

export interface findRestaurantByIdQuery_findRestaurantById {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: findRestaurantByIdQuery_findRestaurantById_restaurant | null;
}

export interface findRestaurantByIdQuery {
  findRestaurantById: findRestaurantByIdQuery_findRestaurantById;
}

export interface findRestaurantByIdQueryVariables {
  input: RestaurantInput;
}
