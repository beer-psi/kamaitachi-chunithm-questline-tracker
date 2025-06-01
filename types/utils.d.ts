declare global {
    /**
     * Given an object type, generate a union of the string paths to all its leaves.
     */
    type Leaves<T> = T extends object ? { [K in keyof T]:
        `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? "" : `.${Leaves<T[K]>}`}`
    }[keyof T] : never;
}

export {};
