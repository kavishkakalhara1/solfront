import { ReactNode } from 'react';
export declare const ThemeProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useTheme: () => {
    theme: string;
    toggleTheme: () => void;
};
