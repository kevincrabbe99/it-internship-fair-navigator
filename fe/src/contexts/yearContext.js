
import { createContext } from "react";

export const YearContext = createContext(null)

export const structureYearState = (selected, availableYears) => {
    return {
        selected: selected,
        available: availableYears
    }
}