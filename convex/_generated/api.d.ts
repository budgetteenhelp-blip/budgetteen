/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as analytics from "../analytics.js";
import type * as categories from "../categories.js";
import type * as export_ from "../export.js";
import type * as gamification from "../gamification.js";
import type * as goals from "../goals.js";
import type * as quiz from "../quiz.js";
import type * as transactions from "../transactions.js";
import type * as users from "../users.js";
import type * as worlds from "../worlds.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  analytics: typeof analytics;
  categories: typeof categories;
  export: typeof export_;
  gamification: typeof gamification;
  goals: typeof goals;
  quiz: typeof quiz;
  transactions: typeof transactions;
  users: typeof users;
  worlds: typeof worlds;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
