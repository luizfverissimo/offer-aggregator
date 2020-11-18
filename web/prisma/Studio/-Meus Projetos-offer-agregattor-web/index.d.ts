import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
  Decimal,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }
export { Decimal }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.10.1
 * Query Engine version: 7d0087eadc7265e12d4b8d8c3516b02c4c965111
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Offers
 * const offers = await prisma.offer.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Offers
   * const offers = await prisma.offer.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.offer`: Exposes CRUD operations for the **Offer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Offers
    * const offers = await prisma.offer.findMany()
    * ```
    */
  get offer(): OfferDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.offerSuggestion`: Exposes CRUD operations for the **OfferSuggestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OfferSuggestions
    * const offerSuggestions = await prisma.offerSuggestion.findMany()
    * ```
    */
  get offerSuggestion(): OfferSuggestionDelegate;

  /**
   * `prisma.affiliateLink`: Exposes CRUD operations for the **AffiliateLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AffiliateLinks
    * const affiliateLinks = await prisma.affiliateLink.findMany()
    * ```
    */
  get affiliateLink(): AffiliateLinkDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OfferDistinctFieldEnum: {
  id: 'id',
  active: 'active',
  name: 'name',
  urlImage: 'urlImage',
  urlOffer: 'urlOffer',
  description: 'description',
  offerPrice: 'offerPrice',
  normalPrice: 'normalPrice',
  offerText: 'offerText',
  store: 'store',
  coupon: 'coupon',
  createdAt: 'createdAt',
  createdAtDb: 'createdAtDb',
  authorId: 'authorId'
};

export declare type OfferDistinctFieldEnum = (typeof OfferDistinctFieldEnum)[keyof typeof OfferDistinctFieldEnum]


export declare const UserDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  email: 'email',
  role: 'role',
  password: 'password',
  createdAtDb: 'createdAtDb'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const OfferSuggestionDistinctFieldEnum: {
  id: 'id',
  offerLink: 'offerLink',
  createdAtDb: 'createdAtDb',
  createdAt: 'createdAt'
};

export declare type OfferSuggestionDistinctFieldEnum = (typeof OfferSuggestionDistinctFieldEnum)[keyof typeof OfferSuggestionDistinctFieldEnum]


export declare const AffiliateLinkDistinctFieldEnum: {
  id: 'id',
  store: 'store',
  affiliateLink: 'affiliateLink'
};

export declare type AffiliateLinkDistinctFieldEnum = (typeof AffiliateLinkDistinctFieldEnum)[keyof typeof AffiliateLinkDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]



/**
 * Model Offer
 */

export type Offer = {
  id: number
  active: boolean
  name: string
  urlImage: string
  urlOffer: string
  description: string
  offerPrice: number
  normalPrice: number
  offerText: string
  store: string
  coupon: string
  createdAt: string
  createdAtDb: Date
  authorId: number
}


export type AggregateOffer = {
  count: number
  avg: OfferAvgAggregateOutputType | null
  sum: OfferSumAggregateOutputType | null
  min: OfferMinAggregateOutputType | null
  max: OfferMaxAggregateOutputType | null
}

export type OfferAvgAggregateOutputType = {
  id: number
  offerPrice: number
  normalPrice: number
  authorId: number
}

export type OfferSumAggregateOutputType = {
  id: number
  offerPrice: number
  normalPrice: number
  authorId: number
}

export type OfferMinAggregateOutputType = {
  id: number
  offerPrice: number
  normalPrice: number
  authorId: number
}

export type OfferMaxAggregateOutputType = {
  id: number
  offerPrice: number
  normalPrice: number
  authorId: number
}


export type OfferAvgAggregateInputType = {
  id?: true
  offerPrice?: true
  normalPrice?: true
  authorId?: true
}

export type OfferSumAggregateInputType = {
  id?: true
  offerPrice?: true
  normalPrice?: true
  authorId?: true
}

export type OfferMinAggregateInputType = {
  id?: true
  offerPrice?: true
  normalPrice?: true
  authorId?: true
}

export type OfferMaxAggregateInputType = {
  id?: true
  offerPrice?: true
  normalPrice?: true
  authorId?: true
}

export type AggregateOfferArgs = {
  where?: OfferWhereInput
  orderBy?: Enumerable<OfferOrderByInput> | OfferOrderByInput
  cursor?: OfferWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<OfferDistinctFieldEnum>
  count?: true
  avg?: OfferAvgAggregateInputType
  sum?: OfferSumAggregateInputType
  min?: OfferMinAggregateInputType
  max?: OfferMaxAggregateInputType
}

export type GetOfferAggregateType<T extends AggregateOfferArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetOfferAggregateScalarType<T[P]>
}

export type GetOfferAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof OfferAvgAggregateOutputType ? OfferAvgAggregateOutputType[P] : never
}
    
    

export type OfferSelect = {
  id?: boolean
  active?: boolean
  name?: boolean
  urlImage?: boolean
  urlOffer?: boolean
  description?: boolean
  offerPrice?: boolean
  normalPrice?: boolean
  offerText?: boolean
  store?: boolean
  coupon?: boolean
  createdAt?: boolean
  createdAtDb?: boolean
  author?: boolean | UserArgs
  authorId?: boolean
}

export type OfferInclude = {
  author?: boolean | UserArgs
}

export type OfferGetPayload<
  S extends boolean | null | undefined | OfferArgs,
  U = keyof S
> = S extends true
  ? Offer
  : S extends undefined
  ? never
  : S extends OfferArgs | FindManyOfferArgs
  ? 'include' extends U
    ? Offer  & {
      [P in TrueKeys<S['include']>]:
      P extends 'author'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Offer ? Offer[P]
: 
      P extends 'author'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Offer
: Offer


export interface OfferDelegate {
  /**
   * Find zero or one Offer that matches the filter.
   * @param {FindOneOfferArgs} args - Arguments to find a Offer
   * @example
   * // Get one Offer
   * const offer = await prisma.offer.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneOfferArgs>(
    args: Subset<T, FindOneOfferArgs>
  ): CheckSelect<T, Prisma__OfferClient<Offer | null>, Prisma__OfferClient<OfferGetPayload<T> | null>>
  /**
   * Find the first Offer that matches the filter.
   * @param {FindFirstOfferArgs} args - Arguments to find a Offer
   * @example
   * // Get one Offer
   * const offer = await prisma.offer.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstOfferArgs>(
    args?: Subset<T, FindFirstOfferArgs>
  ): CheckSelect<T, Prisma__OfferClient<Offer | null>, Prisma__OfferClient<OfferGetPayload<T> | null>>
  /**
   * Find zero or more Offers that matches the filter.
   * @param {FindManyOfferArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Offers
   * const offers = await prisma.offer.findMany()
   * 
   * // Get first 10 Offers
   * const offers = await prisma.offer.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const offerWithIdOnly = await prisma.offer.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyOfferArgs>(
    args?: Subset<T, FindManyOfferArgs>
  ): CheckSelect<T, Promise<Array<Offer>>, Promise<Array<OfferGetPayload<T>>>>
  /**
   * Create a Offer.
   * @param {OfferCreateArgs} args - Arguments to create a Offer.
   * @example
   * // Create one Offer
   * const Offer = await prisma.offer.create({
   *   data: {
   *     // ... data to create a Offer
   *   }
   * })
   * 
  **/
  create<T extends OfferCreateArgs>(
    args: Subset<T, OfferCreateArgs>
  ): CheckSelect<T, Prisma__OfferClient<Offer>, Prisma__OfferClient<OfferGetPayload<T>>>
  /**
   * Delete a Offer.
   * @param {OfferDeleteArgs} args - Arguments to delete one Offer.
   * @example
   * // Delete one Offer
   * const Offer = await prisma.offer.delete({
   *   where: {
   *     // ... filter to delete one Offer
   *   }
   * })
   * 
  **/
  delete<T extends OfferDeleteArgs>(
    args: Subset<T, OfferDeleteArgs>
  ): CheckSelect<T, Prisma__OfferClient<Offer>, Prisma__OfferClient<OfferGetPayload<T>>>
  /**
   * Update one Offer.
   * @param {OfferUpdateArgs} args - Arguments to update one Offer.
   * @example
   * // Update one Offer
   * const offer = await prisma.offer.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends OfferUpdateArgs>(
    args: Subset<T, OfferUpdateArgs>
  ): CheckSelect<T, Prisma__OfferClient<Offer>, Prisma__OfferClient<OfferGetPayload<T>>>
  /**
   * Delete zero or more Offers.
   * @param {OfferDeleteManyArgs} args - Arguments to filter Offers to delete.
   * @example
   * // Delete a few Offers
   * const { count } = await prisma.offer.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends OfferDeleteManyArgs>(
    args: Subset<T, OfferDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Offers.
   * @param {OfferUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Offers
   * const offer = await prisma.offer.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends OfferUpdateManyArgs>(
    args: Subset<T, OfferUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Offer.
   * @param {OfferUpsertArgs} args - Arguments to update or create a Offer.
   * @example
   * // Update or create a Offer
   * const offer = await prisma.offer.upsert({
   *   create: {
   *     // ... data to create a Offer
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Offer we want to update
   *   }
   * })
  **/
  upsert<T extends OfferUpsertArgs>(
    args: Subset<T, OfferUpsertArgs>
  ): CheckSelect<T, Prisma__OfferClient<Offer>, Prisma__OfferClient<OfferGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyOfferArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateOfferArgs>(args: Subset<T, AggregateOfferArgs>): Promise<GetOfferAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Offer.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__OfferClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Offer findOne
 */
export type FindOneOfferArgs = {
  /**
   * Select specific fields to fetch from the Offer
  **/
  select?: OfferSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfferInclude | null
  /**
   * Filter, which Offer to fetch.
  **/
  where: OfferWhereUniqueInput
}


/**
 * Offer findFirst
 */
export type FindFirstOfferArgs = {
  /**
   * Select specific fields to fetch from the Offer
  **/
  select?: OfferSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfferInclude | null
  /**
   * Filter, which Offer to fetch.
  **/
  where?: OfferWhereInput
  orderBy?: Enumerable<OfferOrderByInput> | OfferOrderByInput
  cursor?: OfferWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<OfferDistinctFieldEnum>
}


/**
 * Offer findMany
 */
export type FindManyOfferArgs = {
  /**
   * Select specific fields to fetch from the Offer
  **/
  select?: OfferSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfferInclude | null
  /**
   * Filter, which Offers to fetch.
  **/
  where?: OfferWhereInput
  /**
   * Determine the order of the Offers to fetch.
  **/
  orderBy?: Enumerable<OfferOrderByInput> | OfferOrderByInput
  /**
   * Sets the position for listing Offers.
  **/
  cursor?: OfferWhereUniqueInput
  /**
   * The number of Offers to fetch. If negative number, it will take Offers before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Offers.
  **/
  skip?: number
  distinct?: Enumerable<OfferDistinctFieldEnum>
}


/**
 * Offer create
 */
export type OfferCreateArgs = {
  /**
   * Select specific fields to fetch from the Offer
  **/
  select?: OfferSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfferInclude | null
  /**
   * The data needed to create a Offer.
  **/
  data: OfferCreateInput
}


/**
 * Offer update
 */
export type OfferUpdateArgs = {
  /**
   * Select specific fields to fetch from the Offer
  **/
  select?: OfferSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfferInclude | null
  /**
   * The data needed to update a Offer.
  **/
  data: OfferUpdateInput
  /**
   * Choose, which Offer to update.
  **/
  where: OfferWhereUniqueInput
}


/**
 * Offer updateMany
 */
export type OfferUpdateManyArgs = {
  data: OfferUpdateManyMutationInput
  where?: OfferWhereInput
}


/**
 * Offer upsert
 */
export type OfferUpsertArgs = {
  /**
   * Select specific fields to fetch from the Offer
  **/
  select?: OfferSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfferInclude | null
  /**
   * The filter to search for the Offer to update in case it exists.
  **/
  where: OfferWhereUniqueInput
  /**
   * In case the Offer found by the `where` argument doesn't exist, create a new Offer with this data.
  **/
  create: OfferCreateInput
  /**
   * In case the Offer was found with the provided `where` argument, update it with this data.
  **/
  update: OfferUpdateInput
}


/**
 * Offer delete
 */
export type OfferDeleteArgs = {
  /**
   * Select specific fields to fetch from the Offer
  **/
  select?: OfferSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfferInclude | null
  /**
   * Filter which Offer to delete.
  **/
  where: OfferWhereUniqueInput
}


/**
 * Offer deleteMany
 */
export type OfferDeleteManyArgs = {
  where?: OfferWhereInput
}


/**
 * Offer without action
 */
export type OfferArgs = {
  /**
   * Select specific fields to fetch from the Offer
  **/
  select?: OfferSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: OfferInclude | null
}



/**
 * Model User
 */

export type User = {
  id: number
  name: string
  email: string
  role: string
  password: string
  createdAtDb: Date
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
}

export type UserSumAggregateOutputType = {
  id: number
}

export type UserMinAggregateOutputType = {
  id: number
}

export type UserMaxAggregateOutputType = {
  id: number
}


export type UserAvgAggregateInputType = {
  id?: true
}

export type UserSumAggregateInputType = {
  id?: true
}

export type UserMinAggregateInputType = {
  id?: true
}

export type UserMaxAggregateInputType = {
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  id?: boolean
  name?: boolean
  email?: boolean
  role?: boolean
  password?: boolean
  createdAtDb?: boolean
  Offer?: boolean | FindManyOfferArgs
}

export type UserInclude = {
  Offer?: boolean | FindManyOfferArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'Offer'
      ? Array<OfferGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'Offer'
      ? Array<OfferGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User that matches the filter.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find the first User that matches the filter.
   * @param {FindFirstUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserArgs>(
    args?: Subset<T, FindFirstUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users that matches the filter.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  Offer<T extends FindManyOfferArgs = {}>(args?: Subset<T, FindManyOfferArgs>): CheckSelect<T, Promise<Array<Offer>>, Promise<Array<OfferGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findFirst
 */
export type FindFirstUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model OfferSuggestion
 */

export type OfferSuggestion = {
  id: number
  offerLink: string
  createdAtDb: Date
  createdAt: string
}


export type AggregateOfferSuggestion = {
  count: number
  avg: OfferSuggestionAvgAggregateOutputType | null
  sum: OfferSuggestionSumAggregateOutputType | null
  min: OfferSuggestionMinAggregateOutputType | null
  max: OfferSuggestionMaxAggregateOutputType | null
}

export type OfferSuggestionAvgAggregateOutputType = {
  id: number
}

export type OfferSuggestionSumAggregateOutputType = {
  id: number
}

export type OfferSuggestionMinAggregateOutputType = {
  id: number
}

export type OfferSuggestionMaxAggregateOutputType = {
  id: number
}


export type OfferSuggestionAvgAggregateInputType = {
  id?: true
}

export type OfferSuggestionSumAggregateInputType = {
  id?: true
}

export type OfferSuggestionMinAggregateInputType = {
  id?: true
}

export type OfferSuggestionMaxAggregateInputType = {
  id?: true
}

export type AggregateOfferSuggestionArgs = {
  where?: OfferSuggestionWhereInput
  orderBy?: Enumerable<OfferSuggestionOrderByInput> | OfferSuggestionOrderByInput
  cursor?: OfferSuggestionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<OfferSuggestionDistinctFieldEnum>
  count?: true
  avg?: OfferSuggestionAvgAggregateInputType
  sum?: OfferSuggestionSumAggregateInputType
  min?: OfferSuggestionMinAggregateInputType
  max?: OfferSuggestionMaxAggregateInputType
}

export type GetOfferSuggestionAggregateType<T extends AggregateOfferSuggestionArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetOfferSuggestionAggregateScalarType<T[P]>
}

export type GetOfferSuggestionAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof OfferSuggestionAvgAggregateOutputType ? OfferSuggestionAvgAggregateOutputType[P] : never
}
    
    

export type OfferSuggestionSelect = {
  id?: boolean
  offerLink?: boolean
  createdAtDb?: boolean
  createdAt?: boolean
}

export type OfferSuggestionGetPayload<
  S extends boolean | null | undefined | OfferSuggestionArgs,
  U = keyof S
> = S extends true
  ? OfferSuggestion
  : S extends undefined
  ? never
  : S extends OfferSuggestionArgs | FindManyOfferSuggestionArgs
  ? 'include' extends U
    ? OfferSuggestion 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof OfferSuggestion ? OfferSuggestion[P]
: 
 never
    }
  : OfferSuggestion
: OfferSuggestion


export interface OfferSuggestionDelegate {
  /**
   * Find zero or one OfferSuggestion that matches the filter.
   * @param {FindOneOfferSuggestionArgs} args - Arguments to find a OfferSuggestion
   * @example
   * // Get one OfferSuggestion
   * const offerSuggestion = await prisma.offerSuggestion.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneOfferSuggestionArgs>(
    args: Subset<T, FindOneOfferSuggestionArgs>
  ): CheckSelect<T, Prisma__OfferSuggestionClient<OfferSuggestion | null>, Prisma__OfferSuggestionClient<OfferSuggestionGetPayload<T> | null>>
  /**
   * Find the first OfferSuggestion that matches the filter.
   * @param {FindFirstOfferSuggestionArgs} args - Arguments to find a OfferSuggestion
   * @example
   * // Get one OfferSuggestion
   * const offerSuggestion = await prisma.offerSuggestion.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstOfferSuggestionArgs>(
    args?: Subset<T, FindFirstOfferSuggestionArgs>
  ): CheckSelect<T, Prisma__OfferSuggestionClient<OfferSuggestion | null>, Prisma__OfferSuggestionClient<OfferSuggestionGetPayload<T> | null>>
  /**
   * Find zero or more OfferSuggestions that matches the filter.
   * @param {FindManyOfferSuggestionArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all OfferSuggestions
   * const offerSuggestions = await prisma.offerSuggestion.findMany()
   * 
   * // Get first 10 OfferSuggestions
   * const offerSuggestions = await prisma.offerSuggestion.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const offerSuggestionWithIdOnly = await prisma.offerSuggestion.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyOfferSuggestionArgs>(
    args?: Subset<T, FindManyOfferSuggestionArgs>
  ): CheckSelect<T, Promise<Array<OfferSuggestion>>, Promise<Array<OfferSuggestionGetPayload<T>>>>
  /**
   * Create a OfferSuggestion.
   * @param {OfferSuggestionCreateArgs} args - Arguments to create a OfferSuggestion.
   * @example
   * // Create one OfferSuggestion
   * const OfferSuggestion = await prisma.offerSuggestion.create({
   *   data: {
   *     // ... data to create a OfferSuggestion
   *   }
   * })
   * 
  **/
  create<T extends OfferSuggestionCreateArgs>(
    args: Subset<T, OfferSuggestionCreateArgs>
  ): CheckSelect<T, Prisma__OfferSuggestionClient<OfferSuggestion>, Prisma__OfferSuggestionClient<OfferSuggestionGetPayload<T>>>
  /**
   * Delete a OfferSuggestion.
   * @param {OfferSuggestionDeleteArgs} args - Arguments to delete one OfferSuggestion.
   * @example
   * // Delete one OfferSuggestion
   * const OfferSuggestion = await prisma.offerSuggestion.delete({
   *   where: {
   *     // ... filter to delete one OfferSuggestion
   *   }
   * })
   * 
  **/
  delete<T extends OfferSuggestionDeleteArgs>(
    args: Subset<T, OfferSuggestionDeleteArgs>
  ): CheckSelect<T, Prisma__OfferSuggestionClient<OfferSuggestion>, Prisma__OfferSuggestionClient<OfferSuggestionGetPayload<T>>>
  /**
   * Update one OfferSuggestion.
   * @param {OfferSuggestionUpdateArgs} args - Arguments to update one OfferSuggestion.
   * @example
   * // Update one OfferSuggestion
   * const offerSuggestion = await prisma.offerSuggestion.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends OfferSuggestionUpdateArgs>(
    args: Subset<T, OfferSuggestionUpdateArgs>
  ): CheckSelect<T, Prisma__OfferSuggestionClient<OfferSuggestion>, Prisma__OfferSuggestionClient<OfferSuggestionGetPayload<T>>>
  /**
   * Delete zero or more OfferSuggestions.
   * @param {OfferSuggestionDeleteManyArgs} args - Arguments to filter OfferSuggestions to delete.
   * @example
   * // Delete a few OfferSuggestions
   * const { count } = await prisma.offerSuggestion.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends OfferSuggestionDeleteManyArgs>(
    args: Subset<T, OfferSuggestionDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more OfferSuggestions.
   * @param {OfferSuggestionUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many OfferSuggestions
   * const offerSuggestion = await prisma.offerSuggestion.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends OfferSuggestionUpdateManyArgs>(
    args: Subset<T, OfferSuggestionUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one OfferSuggestion.
   * @param {OfferSuggestionUpsertArgs} args - Arguments to update or create a OfferSuggestion.
   * @example
   * // Update or create a OfferSuggestion
   * const offerSuggestion = await prisma.offerSuggestion.upsert({
   *   create: {
   *     // ... data to create a OfferSuggestion
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the OfferSuggestion we want to update
   *   }
   * })
  **/
  upsert<T extends OfferSuggestionUpsertArgs>(
    args: Subset<T, OfferSuggestionUpsertArgs>
  ): CheckSelect<T, Prisma__OfferSuggestionClient<OfferSuggestion>, Prisma__OfferSuggestionClient<OfferSuggestionGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyOfferSuggestionArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateOfferSuggestionArgs>(args: Subset<T, AggregateOfferSuggestionArgs>): Promise<GetOfferSuggestionAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for OfferSuggestion.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__OfferSuggestionClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * OfferSuggestion findOne
 */
export type FindOneOfferSuggestionArgs = {
  /**
   * Select specific fields to fetch from the OfferSuggestion
  **/
  select?: OfferSuggestionSelect | null
  /**
   * Filter, which OfferSuggestion to fetch.
  **/
  where: OfferSuggestionWhereUniqueInput
}


/**
 * OfferSuggestion findFirst
 */
export type FindFirstOfferSuggestionArgs = {
  /**
   * Select specific fields to fetch from the OfferSuggestion
  **/
  select?: OfferSuggestionSelect | null
  /**
   * Filter, which OfferSuggestion to fetch.
  **/
  where?: OfferSuggestionWhereInput
  orderBy?: Enumerable<OfferSuggestionOrderByInput> | OfferSuggestionOrderByInput
  cursor?: OfferSuggestionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<OfferSuggestionDistinctFieldEnum>
}


/**
 * OfferSuggestion findMany
 */
export type FindManyOfferSuggestionArgs = {
  /**
   * Select specific fields to fetch from the OfferSuggestion
  **/
  select?: OfferSuggestionSelect | null
  /**
   * Filter, which OfferSuggestions to fetch.
  **/
  where?: OfferSuggestionWhereInput
  /**
   * Determine the order of the OfferSuggestions to fetch.
  **/
  orderBy?: Enumerable<OfferSuggestionOrderByInput> | OfferSuggestionOrderByInput
  /**
   * Sets the position for listing OfferSuggestions.
  **/
  cursor?: OfferSuggestionWhereUniqueInput
  /**
   * The number of OfferSuggestions to fetch. If negative number, it will take OfferSuggestions before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` OfferSuggestions.
  **/
  skip?: number
  distinct?: Enumerable<OfferSuggestionDistinctFieldEnum>
}


/**
 * OfferSuggestion create
 */
export type OfferSuggestionCreateArgs = {
  /**
   * Select specific fields to fetch from the OfferSuggestion
  **/
  select?: OfferSuggestionSelect | null
  /**
   * The data needed to create a OfferSuggestion.
  **/
  data: OfferSuggestionCreateInput
}


/**
 * OfferSuggestion update
 */
export type OfferSuggestionUpdateArgs = {
  /**
   * Select specific fields to fetch from the OfferSuggestion
  **/
  select?: OfferSuggestionSelect | null
  /**
   * The data needed to update a OfferSuggestion.
  **/
  data: OfferSuggestionUpdateInput
  /**
   * Choose, which OfferSuggestion to update.
  **/
  where: OfferSuggestionWhereUniqueInput
}


/**
 * OfferSuggestion updateMany
 */
export type OfferSuggestionUpdateManyArgs = {
  data: OfferSuggestionUpdateManyMutationInput
  where?: OfferSuggestionWhereInput
}


/**
 * OfferSuggestion upsert
 */
export type OfferSuggestionUpsertArgs = {
  /**
   * Select specific fields to fetch from the OfferSuggestion
  **/
  select?: OfferSuggestionSelect | null
  /**
   * The filter to search for the OfferSuggestion to update in case it exists.
  **/
  where: OfferSuggestionWhereUniqueInput
  /**
   * In case the OfferSuggestion found by the `where` argument doesn't exist, create a new OfferSuggestion with this data.
  **/
  create: OfferSuggestionCreateInput
  /**
   * In case the OfferSuggestion was found with the provided `where` argument, update it with this data.
  **/
  update: OfferSuggestionUpdateInput
}


/**
 * OfferSuggestion delete
 */
export type OfferSuggestionDeleteArgs = {
  /**
   * Select specific fields to fetch from the OfferSuggestion
  **/
  select?: OfferSuggestionSelect | null
  /**
   * Filter which OfferSuggestion to delete.
  **/
  where: OfferSuggestionWhereUniqueInput
}


/**
 * OfferSuggestion deleteMany
 */
export type OfferSuggestionDeleteManyArgs = {
  where?: OfferSuggestionWhereInput
}


/**
 * OfferSuggestion without action
 */
export type OfferSuggestionArgs = {
  /**
   * Select specific fields to fetch from the OfferSuggestion
  **/
  select?: OfferSuggestionSelect | null
}



/**
 * Model AffiliateLink
 */

export type AffiliateLink = {
  id: number
  store: string
  affiliateLink: string
}


export type AggregateAffiliateLink = {
  count: number
  avg: AffiliateLinkAvgAggregateOutputType | null
  sum: AffiliateLinkSumAggregateOutputType | null
  min: AffiliateLinkMinAggregateOutputType | null
  max: AffiliateLinkMaxAggregateOutputType | null
}

export type AffiliateLinkAvgAggregateOutputType = {
  id: number
}

export type AffiliateLinkSumAggregateOutputType = {
  id: number
}

export type AffiliateLinkMinAggregateOutputType = {
  id: number
}

export type AffiliateLinkMaxAggregateOutputType = {
  id: number
}


export type AffiliateLinkAvgAggregateInputType = {
  id?: true
}

export type AffiliateLinkSumAggregateInputType = {
  id?: true
}

export type AffiliateLinkMinAggregateInputType = {
  id?: true
}

export type AffiliateLinkMaxAggregateInputType = {
  id?: true
}

export type AggregateAffiliateLinkArgs = {
  where?: AffiliateLinkWhereInput
  orderBy?: Enumerable<AffiliateLinkOrderByInput> | AffiliateLinkOrderByInput
  cursor?: AffiliateLinkWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<AffiliateLinkDistinctFieldEnum>
  count?: true
  avg?: AffiliateLinkAvgAggregateInputType
  sum?: AffiliateLinkSumAggregateInputType
  min?: AffiliateLinkMinAggregateInputType
  max?: AffiliateLinkMaxAggregateInputType
}

export type GetAffiliateLinkAggregateType<T extends AggregateAffiliateLinkArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetAffiliateLinkAggregateScalarType<T[P]>
}

export type GetAffiliateLinkAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof AffiliateLinkAvgAggregateOutputType ? AffiliateLinkAvgAggregateOutputType[P] : never
}
    
    

export type AffiliateLinkSelect = {
  id?: boolean
  store?: boolean
  affiliateLink?: boolean
}

export type AffiliateLinkGetPayload<
  S extends boolean | null | undefined | AffiliateLinkArgs,
  U = keyof S
> = S extends true
  ? AffiliateLink
  : S extends undefined
  ? never
  : S extends AffiliateLinkArgs | FindManyAffiliateLinkArgs
  ? 'include' extends U
    ? AffiliateLink 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof AffiliateLink ? AffiliateLink[P]
: 
 never
    }
  : AffiliateLink
: AffiliateLink


export interface AffiliateLinkDelegate {
  /**
   * Find zero or one AffiliateLink that matches the filter.
   * @param {FindOneAffiliateLinkArgs} args - Arguments to find a AffiliateLink
   * @example
   * // Get one AffiliateLink
   * const affiliateLink = await prisma.affiliateLink.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneAffiliateLinkArgs>(
    args: Subset<T, FindOneAffiliateLinkArgs>
  ): CheckSelect<T, Prisma__AffiliateLinkClient<AffiliateLink | null>, Prisma__AffiliateLinkClient<AffiliateLinkGetPayload<T> | null>>
  /**
   * Find the first AffiliateLink that matches the filter.
   * @param {FindFirstAffiliateLinkArgs} args - Arguments to find a AffiliateLink
   * @example
   * // Get one AffiliateLink
   * const affiliateLink = await prisma.affiliateLink.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstAffiliateLinkArgs>(
    args?: Subset<T, FindFirstAffiliateLinkArgs>
  ): CheckSelect<T, Prisma__AffiliateLinkClient<AffiliateLink | null>, Prisma__AffiliateLinkClient<AffiliateLinkGetPayload<T> | null>>
  /**
   * Find zero or more AffiliateLinks that matches the filter.
   * @param {FindManyAffiliateLinkArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all AffiliateLinks
   * const affiliateLinks = await prisma.affiliateLink.findMany()
   * 
   * // Get first 10 AffiliateLinks
   * const affiliateLinks = await prisma.affiliateLink.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const affiliateLinkWithIdOnly = await prisma.affiliateLink.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyAffiliateLinkArgs>(
    args?: Subset<T, FindManyAffiliateLinkArgs>
  ): CheckSelect<T, Promise<Array<AffiliateLink>>, Promise<Array<AffiliateLinkGetPayload<T>>>>
  /**
   * Create a AffiliateLink.
   * @param {AffiliateLinkCreateArgs} args - Arguments to create a AffiliateLink.
   * @example
   * // Create one AffiliateLink
   * const AffiliateLink = await prisma.affiliateLink.create({
   *   data: {
   *     // ... data to create a AffiliateLink
   *   }
   * })
   * 
  **/
  create<T extends AffiliateLinkCreateArgs>(
    args: Subset<T, AffiliateLinkCreateArgs>
  ): CheckSelect<T, Prisma__AffiliateLinkClient<AffiliateLink>, Prisma__AffiliateLinkClient<AffiliateLinkGetPayload<T>>>
  /**
   * Delete a AffiliateLink.
   * @param {AffiliateLinkDeleteArgs} args - Arguments to delete one AffiliateLink.
   * @example
   * // Delete one AffiliateLink
   * const AffiliateLink = await prisma.affiliateLink.delete({
   *   where: {
   *     // ... filter to delete one AffiliateLink
   *   }
   * })
   * 
  **/
  delete<T extends AffiliateLinkDeleteArgs>(
    args: Subset<T, AffiliateLinkDeleteArgs>
  ): CheckSelect<T, Prisma__AffiliateLinkClient<AffiliateLink>, Prisma__AffiliateLinkClient<AffiliateLinkGetPayload<T>>>
  /**
   * Update one AffiliateLink.
   * @param {AffiliateLinkUpdateArgs} args - Arguments to update one AffiliateLink.
   * @example
   * // Update one AffiliateLink
   * const affiliateLink = await prisma.affiliateLink.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends AffiliateLinkUpdateArgs>(
    args: Subset<T, AffiliateLinkUpdateArgs>
  ): CheckSelect<T, Prisma__AffiliateLinkClient<AffiliateLink>, Prisma__AffiliateLinkClient<AffiliateLinkGetPayload<T>>>
  /**
   * Delete zero or more AffiliateLinks.
   * @param {AffiliateLinkDeleteManyArgs} args - Arguments to filter AffiliateLinks to delete.
   * @example
   * // Delete a few AffiliateLinks
   * const { count } = await prisma.affiliateLink.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends AffiliateLinkDeleteManyArgs>(
    args: Subset<T, AffiliateLinkDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more AffiliateLinks.
   * @param {AffiliateLinkUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many AffiliateLinks
   * const affiliateLink = await prisma.affiliateLink.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends AffiliateLinkUpdateManyArgs>(
    args: Subset<T, AffiliateLinkUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one AffiliateLink.
   * @param {AffiliateLinkUpsertArgs} args - Arguments to update or create a AffiliateLink.
   * @example
   * // Update or create a AffiliateLink
   * const affiliateLink = await prisma.affiliateLink.upsert({
   *   create: {
   *     // ... data to create a AffiliateLink
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the AffiliateLink we want to update
   *   }
   * })
  **/
  upsert<T extends AffiliateLinkUpsertArgs>(
    args: Subset<T, AffiliateLinkUpsertArgs>
  ): CheckSelect<T, Prisma__AffiliateLinkClient<AffiliateLink>, Prisma__AffiliateLinkClient<AffiliateLinkGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyAffiliateLinkArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateAffiliateLinkArgs>(args: Subset<T, AggregateAffiliateLinkArgs>): Promise<GetAffiliateLinkAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for AffiliateLink.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__AffiliateLinkClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * AffiliateLink findOne
 */
export type FindOneAffiliateLinkArgs = {
  /**
   * Select specific fields to fetch from the AffiliateLink
  **/
  select?: AffiliateLinkSelect | null
  /**
   * Filter, which AffiliateLink to fetch.
  **/
  where: AffiliateLinkWhereUniqueInput
}


/**
 * AffiliateLink findFirst
 */
export type FindFirstAffiliateLinkArgs = {
  /**
   * Select specific fields to fetch from the AffiliateLink
  **/
  select?: AffiliateLinkSelect | null
  /**
   * Filter, which AffiliateLink to fetch.
  **/
  where?: AffiliateLinkWhereInput
  orderBy?: Enumerable<AffiliateLinkOrderByInput> | AffiliateLinkOrderByInput
  cursor?: AffiliateLinkWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<AffiliateLinkDistinctFieldEnum>
}


/**
 * AffiliateLink findMany
 */
export type FindManyAffiliateLinkArgs = {
  /**
   * Select specific fields to fetch from the AffiliateLink
  **/
  select?: AffiliateLinkSelect | null
  /**
   * Filter, which AffiliateLinks to fetch.
  **/
  where?: AffiliateLinkWhereInput
  /**
   * Determine the order of the AffiliateLinks to fetch.
  **/
  orderBy?: Enumerable<AffiliateLinkOrderByInput> | AffiliateLinkOrderByInput
  /**
   * Sets the position for listing AffiliateLinks.
  **/
  cursor?: AffiliateLinkWhereUniqueInput
  /**
   * The number of AffiliateLinks to fetch. If negative number, it will take AffiliateLinks before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` AffiliateLinks.
  **/
  skip?: number
  distinct?: Enumerable<AffiliateLinkDistinctFieldEnum>
}


/**
 * AffiliateLink create
 */
export type AffiliateLinkCreateArgs = {
  /**
   * Select specific fields to fetch from the AffiliateLink
  **/
  select?: AffiliateLinkSelect | null
  /**
   * The data needed to create a AffiliateLink.
  **/
  data: AffiliateLinkCreateInput
}


/**
 * AffiliateLink update
 */
export type AffiliateLinkUpdateArgs = {
  /**
   * Select specific fields to fetch from the AffiliateLink
  **/
  select?: AffiliateLinkSelect | null
  /**
   * The data needed to update a AffiliateLink.
  **/
  data: AffiliateLinkUpdateInput
  /**
   * Choose, which AffiliateLink to update.
  **/
  where: AffiliateLinkWhereUniqueInput
}


/**
 * AffiliateLink updateMany
 */
export type AffiliateLinkUpdateManyArgs = {
  data: AffiliateLinkUpdateManyMutationInput
  where?: AffiliateLinkWhereInput
}


/**
 * AffiliateLink upsert
 */
export type AffiliateLinkUpsertArgs = {
  /**
   * Select specific fields to fetch from the AffiliateLink
  **/
  select?: AffiliateLinkSelect | null
  /**
   * The filter to search for the AffiliateLink to update in case it exists.
  **/
  where: AffiliateLinkWhereUniqueInput
  /**
   * In case the AffiliateLink found by the `where` argument doesn't exist, create a new AffiliateLink with this data.
  **/
  create: AffiliateLinkCreateInput
  /**
   * In case the AffiliateLink was found with the provided `where` argument, update it with this data.
  **/
  update: AffiliateLinkUpdateInput
}


/**
 * AffiliateLink delete
 */
export type AffiliateLinkDeleteArgs = {
  /**
   * Select specific fields to fetch from the AffiliateLink
  **/
  select?: AffiliateLinkSelect | null
  /**
   * Filter which AffiliateLink to delete.
  **/
  where: AffiliateLinkWhereUniqueInput
}


/**
 * AffiliateLink deleteMany
 */
export type AffiliateLinkDeleteManyArgs = {
  where?: AffiliateLinkWhereInput
}


/**
 * AffiliateLink without action
 */
export type AffiliateLinkArgs = {
  /**
   * Select specific fields to fetch from the AffiliateLink
  **/
  select?: AffiliateLinkSelect | null
}



/**
 * Deep Input Types
 */


export type OfferWhereInput = {
  AND?: OfferWhereInput | Enumerable<OfferWhereInput>
  OR?: OfferWhereInput | Enumerable<OfferWhereInput>
  NOT?: OfferWhereInput | Enumerable<OfferWhereInput>
  id?: IntFilter | number
  active?: BoolFilter | boolean
  name?: StringFilter | string
  urlImage?: StringFilter | string
  urlOffer?: StringFilter | string
  description?: StringFilter | string
  offerPrice?: IntFilter | number
  normalPrice?: IntFilter | number
  offerText?: StringFilter | string
  store?: StringFilter | string
  coupon?: StringFilter | string
  createdAt?: StringFilter | string
  createdAtDb?: DateTimeFilter | Date | string
  author?: UserRelationFilter | UserWhereInput
  authorId?: IntFilter | number
}

export type OfferOrderByInput = {
  id?: SortOrder
  active?: SortOrder
  name?: SortOrder
  urlImage?: SortOrder
  urlOffer?: SortOrder
  description?: SortOrder
  offerPrice?: SortOrder
  normalPrice?: SortOrder
  offerText?: SortOrder
  store?: SortOrder
  coupon?: SortOrder
  createdAt?: SortOrder
  createdAtDb?: SortOrder
  authorId?: SortOrder
}

export type OfferWhereUniqueInput = {
  id?: number
}

export type UserWhereInput = {
  AND?: UserWhereInput | Enumerable<UserWhereInput>
  OR?: UserWhereInput | Enumerable<UserWhereInput>
  NOT?: UserWhereInput | Enumerable<UserWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  email?: StringFilter | string
  role?: StringFilter | string
  password?: StringFilter | string
  createdAtDb?: DateTimeFilter | Date | string
  Offer?: OfferListRelationFilter
}

export type UserOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  email?: SortOrder
  role?: SortOrder
  password?: SortOrder
  createdAtDb?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  email?: string
}

export type OfferSuggestionWhereInput = {
  AND?: OfferSuggestionWhereInput | Enumerable<OfferSuggestionWhereInput>
  OR?: OfferSuggestionWhereInput | Enumerable<OfferSuggestionWhereInput>
  NOT?: OfferSuggestionWhereInput | Enumerable<OfferSuggestionWhereInput>
  id?: IntFilter | number
  offerLink?: StringFilter | string
  createdAtDb?: DateTimeFilter | Date | string
  createdAt?: StringFilter | string
}

export type OfferSuggestionOrderByInput = {
  id?: SortOrder
  offerLink?: SortOrder
  createdAtDb?: SortOrder
  createdAt?: SortOrder
}

export type OfferSuggestionWhereUniqueInput = {
  id?: number
}

export type AffiliateLinkWhereInput = {
  AND?: AffiliateLinkWhereInput | Enumerable<AffiliateLinkWhereInput>
  OR?: AffiliateLinkWhereInput | Enumerable<AffiliateLinkWhereInput>
  NOT?: AffiliateLinkWhereInput | Enumerable<AffiliateLinkWhereInput>
  id?: IntFilter | number
  store?: StringFilter | string
  affiliateLink?: StringFilter | string
}

export type AffiliateLinkOrderByInput = {
  id?: SortOrder
  store?: SortOrder
  affiliateLink?: SortOrder
}

export type AffiliateLinkWhereUniqueInput = {
  id?: number
}

export type OfferCreateInput = {
  active: boolean
  name: string
  urlImage: string
  urlOffer: string
  description: string
  offerPrice: number
  normalPrice: number
  offerText: string
  store: string
  coupon?: string
  createdAt: string
  createdAtDb?: Date | string
  author: UserCreateOneWithoutOfferInput
}

export type OfferUpdateInput = {
  active?: boolean | BoolFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  urlImage?: string | StringFieldUpdateOperationsInput
  urlOffer?: string | StringFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  offerPrice?: number | IntFieldUpdateOperationsInput
  normalPrice?: number | IntFieldUpdateOperationsInput
  offerText?: string | StringFieldUpdateOperationsInput
  store?: string | StringFieldUpdateOperationsInput
  coupon?: string | StringFieldUpdateOperationsInput
  createdAt?: string | StringFieldUpdateOperationsInput
  createdAtDb?: Date | string | DateTimeFieldUpdateOperationsInput
  author?: UserUpdateOneRequiredWithoutOfferInput
}

export type OfferUpdateManyMutationInput = {
  active?: boolean | BoolFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  urlImage?: string | StringFieldUpdateOperationsInput
  urlOffer?: string | StringFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  offerPrice?: number | IntFieldUpdateOperationsInput
  normalPrice?: number | IntFieldUpdateOperationsInput
  offerText?: string | StringFieldUpdateOperationsInput
  store?: string | StringFieldUpdateOperationsInput
  coupon?: string | StringFieldUpdateOperationsInput
  createdAt?: string | StringFieldUpdateOperationsInput
  createdAtDb?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type UserCreateInput = {
  name: string
  email: string
  role?: string
  password: string
  createdAtDb?: Date | string
  Offer?: OfferCreateManyWithoutAuthorInput
}

export type UserUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  role?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  createdAtDb?: Date | string | DateTimeFieldUpdateOperationsInput
  Offer?: OfferUpdateManyWithoutAuthorInput
}

export type UserUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  role?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  createdAtDb?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type OfferSuggestionCreateInput = {
  offerLink: string
  createdAtDb?: Date | string
  createdAt: string
}

export type OfferSuggestionUpdateInput = {
  offerLink?: string | StringFieldUpdateOperationsInput
  createdAtDb?: Date | string | DateTimeFieldUpdateOperationsInput
  createdAt?: string | StringFieldUpdateOperationsInput
}

export type OfferSuggestionUpdateManyMutationInput = {
  offerLink?: string | StringFieldUpdateOperationsInput
  createdAtDb?: Date | string | DateTimeFieldUpdateOperationsInput
  createdAt?: string | StringFieldUpdateOperationsInput
}

export type AffiliateLinkCreateInput = {
  store: string
  affiliateLink: string
}

export type AffiliateLinkUpdateInput = {
  store?: string | StringFieldUpdateOperationsInput
  affiliateLink?: string | StringFieldUpdateOperationsInput
}

export type AffiliateLinkUpdateManyMutationInput = {
  store?: string | StringFieldUpdateOperationsInput
  affiliateLink?: string | StringFieldUpdateOperationsInput
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type BoolFilter = {
  equals?: boolean
  not?: boolean | NestedBoolFilter
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type UserRelationFilter = {
  is?: UserWhereInput
  isNot?: UserWhereInput
}

export type OfferListRelationFilter = {
  every?: OfferWhereInput
  some?: OfferWhereInput
  none?: OfferWhereInput
}

export type UserCreateOneWithoutOfferInput = {
  create?: UserCreateWithoutOfferInput
  connect?: UserWhereUniqueInput
}

export type BoolFieldUpdateOperationsInput = {
  set?: boolean
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type IntFieldUpdateOperationsInput = {
  set?: number
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type UserUpdateOneRequiredWithoutOfferInput = {
  create?: UserCreateWithoutOfferInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutOfferDataInput
  upsert?: UserUpsertWithoutOfferInput
}

export type OfferCreateManyWithoutAuthorInput = {
  create?: OfferCreateWithoutAuthorInput | Enumerable<OfferCreateWithoutAuthorInput>
  connect?: OfferWhereUniqueInput | Enumerable<OfferWhereUniqueInput>
}

export type OfferUpdateManyWithoutAuthorInput = {
  create?: OfferCreateWithoutAuthorInput | Enumerable<OfferCreateWithoutAuthorInput>
  connect?: OfferWhereUniqueInput | Enumerable<OfferWhereUniqueInput>
  set?: OfferWhereUniqueInput | Enumerable<OfferWhereUniqueInput>
  disconnect?: OfferWhereUniqueInput | Enumerable<OfferWhereUniqueInput>
  delete?: OfferWhereUniqueInput | Enumerable<OfferWhereUniqueInput>
  update?: OfferUpdateWithWhereUniqueWithoutAuthorInput | Enumerable<OfferUpdateWithWhereUniqueWithoutAuthorInput>
  updateMany?: OfferUpdateManyWithWhereNestedInput | Enumerable<OfferUpdateManyWithWhereNestedInput>
  deleteMany?: OfferScalarWhereInput | Enumerable<OfferScalarWhereInput>
  upsert?: OfferUpsertWithWhereUniqueWithoutAuthorInput | Enumerable<OfferUpsertWithWhereUniqueWithoutAuthorInput>
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type NestedBoolFilter = {
  equals?: boolean
  not?: boolean | NestedBoolFilter
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type UserCreateWithoutOfferInput = {
  name: string
  email: string
  role?: string
  password: string
  createdAtDb?: Date | string
}

export type UserUpdateWithoutOfferDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  role?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  createdAtDb?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type UserUpsertWithoutOfferInput = {
  update: UserUpdateWithoutOfferDataInput
  create: UserCreateWithoutOfferInput
}

export type OfferCreateWithoutAuthorInput = {
  active: boolean
  name: string
  urlImage: string
  urlOffer: string
  description: string
  offerPrice: number
  normalPrice: number
  offerText: string
  store: string
  coupon?: string
  createdAt: string
  createdAtDb?: Date | string
}

export type OfferUpdateWithWhereUniqueWithoutAuthorInput = {
  where: OfferWhereUniqueInput
  data: OfferUpdateWithoutAuthorDataInput
}

export type OfferUpdateManyWithWhereNestedInput = {
  where: OfferScalarWhereInput
  data: OfferUpdateManyDataInput
}

export type OfferScalarWhereInput = {
  AND?: OfferScalarWhereInput | Enumerable<OfferScalarWhereInput>
  OR?: OfferScalarWhereInput | Enumerable<OfferScalarWhereInput>
  NOT?: OfferScalarWhereInput | Enumerable<OfferScalarWhereInput>
  id?: IntFilter | number
  active?: BoolFilter | boolean
  name?: StringFilter | string
  urlImage?: StringFilter | string
  urlOffer?: StringFilter | string
  description?: StringFilter | string
  offerPrice?: IntFilter | number
  normalPrice?: IntFilter | number
  offerText?: StringFilter | string
  store?: StringFilter | string
  coupon?: StringFilter | string
  createdAt?: StringFilter | string
  createdAtDb?: DateTimeFilter | Date | string
  authorId?: IntFilter | number
}

export type OfferUpsertWithWhereUniqueWithoutAuthorInput = {
  where: OfferWhereUniqueInput
  update: OfferUpdateWithoutAuthorDataInput
  create: OfferCreateWithoutAuthorInput
}

export type OfferUpdateWithoutAuthorDataInput = {
  active?: boolean | BoolFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  urlImage?: string | StringFieldUpdateOperationsInput
  urlOffer?: string | StringFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  offerPrice?: number | IntFieldUpdateOperationsInput
  normalPrice?: number | IntFieldUpdateOperationsInput
  offerText?: string | StringFieldUpdateOperationsInput
  store?: string | StringFieldUpdateOperationsInput
  coupon?: string | StringFieldUpdateOperationsInput
  createdAt?: string | StringFieldUpdateOperationsInput
  createdAtDb?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type OfferUpdateManyDataInput = {
  active?: boolean | BoolFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  urlImage?: string | StringFieldUpdateOperationsInput
  urlOffer?: string | StringFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  offerPrice?: number | IntFieldUpdateOperationsInput
  normalPrice?: number | IntFieldUpdateOperationsInput
  offerText?: string | StringFieldUpdateOperationsInput
  store?: string | StringFieldUpdateOperationsInput
  coupon?: string | StringFieldUpdateOperationsInput
  createdAt?: string | StringFieldUpdateOperationsInput
  createdAtDb?: Date | string | DateTimeFieldUpdateOperationsInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
