import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
import { createRepositoryService } from '../../../services/repository.service';
import { Repository } from '../../../models/api/repository';
import { useLoader } from '../../../contexts/LoaderContext';
import { useToast } from '../../../contexts/ToastContext';

export interface IHomeProvider {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
    repositories: Repository[];
    search: () => void;
}

interface HomeProviderProps {
    children: JSX.Element | JSX.Element[];
}

const HomeContext = createContext<IHomeProvider | undefined>(undefined);

const HomeProvider = (props: HomeProviderProps) => {
    const loader = useLoader();
    const toast = useToast();

    const repositoryService = createRepositoryService();

    const [searchValue, setSearchValue] = useState('');

    const [repositories, setRepositories] = useState<Repository[]>([]);

    useEffect(() => {
        search();
    }, []);

    const search = () => {
        loader.show();
        repositoryService
            .search({ search: searchValue })
            .then((response) => setRepositories(response))
            .catch(() => toast.show('Error loading repositories', 'error'))
            .finally(() => loader.hide());
    };

    const returnValue = useMemo(
        () => ({
            searchValue,
            setSearchValue,
            repositories,
            search
        }),
        [searchValue, repositories]
    );

    return <HomeContext.Provider value={returnValue}>{props.children}</HomeContext.Provider>;
};

export default HomeProvider;

export const useHomeContext = () => useContext(HomeContext)!;
