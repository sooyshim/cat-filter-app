import { render } from "@testing-library/react";
import * as React from "react";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

export function renderWithClient(ui: React.ReactElement) {
    const testQueryClient = createTestQueryClient();
    setLogger({
        log: console.log,
        warn: console.warn,
        error: () => {},
    });

    const { rerender, ...result } = render(
        <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    );
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(
                <QueryClientProvider client={testQueryClient}>
                    {rerenderUi}
                </QueryClientProvider>
            ),
    };
}

export function createWrapper() {
    const testQueryClient = createTestQueryClient();

    setLogger({
        log: console.log,
        warn: console.warn,
        error: () => {},
    });

    // eslint-disable-next-line react/display-name
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={testQueryClient}>
            {children}
        </QueryClientProvider>
    );
}
