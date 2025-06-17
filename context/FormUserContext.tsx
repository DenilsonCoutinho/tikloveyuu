// context/FormUserContext.tsx
"use client"
import { createContext, useContext } from "react";
import { useFormUser } from "@/app/home/components/form/hook/useFormUser";

const FormUserContext = createContext<ReturnType<typeof useFormUser> | null>(null);

export const FormUserProvider = ({ children }: { children: React.ReactNode }) => {
    const form = useFormUser();
    return <FormUserContext.Provider value={form}>{children}</FormUserContext.Provider>;
};

export const useFormUserContext = () => {
    const ctx = useContext(FormUserContext);
    if (!ctx) throw new Error("useFormUserContext deve estar dentro de FormUserProvider");
    return ctx;
};
