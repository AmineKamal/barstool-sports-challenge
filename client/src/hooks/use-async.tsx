import { useEffect, useState } from "react";

interface IAutoDispatchOptions<Args> {
    args: Args | (() => Args);
}

export interface IUseAsyncOptions<Args extends unknown[], T, Err> {
    fn: (...args: Args) => Promise<T>;
    deps?: React.DependencyList;
    autoDispatch?: Args extends [] ? boolean : IAutoDispatchOptions<Args>;
    errorFormatter?: (error: unknown) => Err;
}

export interface IUseAsyncResult<Args extends unknown[], T, Err> {
    data: T | null;
    error: Err | null;
    isLoading: boolean;
    dispatch: (...args: Args) => Promise<void>;
}

export function useAsync<Args extends unknown[], T, Err = unknown>({
    fn,
    deps = [],
    autoDispatch,
    errorFormatter = (err) => err as Err,
}: IUseAsyncOptions<Args, T, Err>): IUseAsyncResult<Args, T, Err> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Err | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function dispatch(...args: Args) {
        setData(null);
        setError(null);
        setIsLoading(true);

        try {
            setData(await fn(...args));
        } catch (err) {
            setError(errorFormatter(err));
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (autoDispatch) {
            let args: unknown[];

            if (typeof autoDispatch === "object") {
                args = typeof autoDispatch.args === "function" ? autoDispatch.args() : autoDispatch.args;
            } else {
                args = [];
            }

            dispatch(...(args as Args));
        }

        // Cleanup once the component is unmounted
        return () => {
            setData(null);
            setError(null);
        };
    }, deps);

    return { data, error, isLoading, dispatch };
}
