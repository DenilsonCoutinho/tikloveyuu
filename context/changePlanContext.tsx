"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PlansContextType {
    plan: number;
    setPlan: React.Dispatch<React.SetStateAction<number>>;
    setSelectPlan: React.Dispatch<React.SetStateAction<boolean>>;
    selectPlan:boolean; 
}

const PlanContext = createContext<PlansContextType | undefined>(undefined);

interface PlanProviderProps {
    children: ReactNode;
}

export function PlanProvider({ children }: PlanProviderProps) {
    const [plan, setPlan] = useState<number>(1);
    const [selectPlan, setSelectPlan] = useState<boolean>(false);
    return (
        <PlanContext.Provider value={{ plan, setPlan ,selectPlan, setSelectPlan}}>
            {children}
        </PlanContext.Provider>
    );
}

export function usePlan(): PlansContextType {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error('Deve ser um número');
    }
    return context;
}