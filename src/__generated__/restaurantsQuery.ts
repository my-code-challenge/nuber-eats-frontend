/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantsQuery
// ====================================================

export interface restaurantsQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface restaurantsQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: restaurantsQuery_allCategories_categories[] | null;
}

export interface restaurantsQuery_allRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface restaurantsQuery_allRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: restaurantsQuery_allRestaurants_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface restaurantsQuery_allRestaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: restaurantsQuery_allRestaurants_restaurants[] | null;
}

export interface restaurantsQuery {
  allCategories: restaurantsQuery_allCategories;
  allRestaurants: restaurantsQuery_allRestaurants;
}

export interface restaurantsQueryVariables {
  input: RestaurantsInput;
}
