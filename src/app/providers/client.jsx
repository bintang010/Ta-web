"use client";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ClientProviders({ children }){
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider>{children}</MantineProvider>
        </QueryClientProvider>
    );
}