declare global {
    /**
     * Given an object type, generate a union of the string paths to all its leaves.
     */
    type Leaves<T> = T extends object
        ? {
              [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? "" : `.${Leaves<T[K]>}`}`;
          }[keyof T]
        : never;

    type Primitive = string | number | boolean | null | undefined;

    type DotPrefix<T extends string, K extends string> = `${T}.${K}`;

    type FlattenKeys<T, Prefix extends string = ""> = {
        [K in keyof T & string]: T[K] extends Primitive
            ? Prefix extends ""
                ? K
                : DotPrefix<Prefix, K>
            : Prefix extends ""
              ? FlattenKeys<T[K], K>
              : FlattenKeys<T[K], DotPrefix<Prefix, K>>;
    }[keyof T & string];

    type FlattenedValue<
        T,
        Key extends string,
    > = Key extends `${infer Head}.${infer Tail}`
        ? Head extends keyof T
            ? FlattenedValue<T[Head], Tail>
            : never
        : Key extends keyof T
          ? T[Key]
          : never;

    type Query<T> = {
        [K in FlattenKeys<T>]: FlattenedValue<T, K> | FlattenedValue<T, K>[];
    };
}

export {};
