"use client";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function ClientProviders({ children }){
    const [queryClient] = useState(new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider>{children}</MantineProvider>
        </QueryClientProvider>
    );
}