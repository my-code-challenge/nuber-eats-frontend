/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurantByNameQuery
// ====================================================

export interface searchRestaurantByNameQuery_searchRestaurantByName_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurantByNameQuery_searchRestaurantByName_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: searchRestaurantByNameQuery_searchRestaurantByName_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface searchRestaurantByNameQuery_searchRestaurantByName {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: searchRestaurantByNameQuery_searchRestaurantByName_restaurants[] | null;
}

export interface searchRestaurantByNameQuery {
  searchRestaurantByName: searchRestaurantByNameQuery_searchRestaurantByName;
}

export interface searchRestaurantByNameQueryVariables {
  input: SearchRestaurantInput;
}
