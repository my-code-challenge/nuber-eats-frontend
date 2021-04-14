/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: findCategoryBySlugQuery
// ====================================================

export interface findCategoryBySlugQuery_findCategoryBySlug_category_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface findCategoryBySlugQuery_findCategoryBySlug_category_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: findCategoryBySlugQuery_findCategoryBySlug_category_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface findCategoryBySlugQuery_findCategoryBySlug_category {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
  restaurants: findCategoryBySlugQuery_findCategoryBySlug_category_restaurants[] | null;
}

export interface findCategoryBySlugQuery_findCategoryBySlug {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  category: findCategoryBySlugQuery_findCategoryBySlug_category | null;
}

export interface findCategoryBySlugQuery {
  findCategoryBySlug: findCategoryBySlugQuery_findCategoryBySlug;
}

export interface findCategoryBySlugQueryVariables {
  input: CategoryInput;
}
