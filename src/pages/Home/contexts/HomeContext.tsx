import {
    createContext,
    useContext,
    useMemo,
} from 'react';
export interface IHomeProvider {
}

interface HomeProviderProps {
    children: JSX.Element | JSX.Element[];
}

const HomeContext = createContext<IHomeProvider | undefined>(undefined);

const HomeProvider = (props: HomeProviderProps) => {
    const returnValue = useMemo(() => ({}), []);

    return (
        <HomeContext.Provider value={returnValue}>
            {props.children}
        </HomeContext.Provider>
    );
};

export default HomeProvider;

export const useHomeContext = () => useContext(HomeContext)!;
