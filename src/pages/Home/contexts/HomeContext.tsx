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
import { RepositoryTypeList } from '../../../models/enums/repository-type';
import { RepositoryStatusList } from '../../../models/enums/repository-status';
import { createTagService } from '../../../services/tag.service';
import { Tag } from '../../../models/api/tag';

export interface FilterFormType {
    search?: string;
    type?: string;
    status?: string;
    tag?: string;
}

export type SetFilterFormFieldFunction = (
    field: keyof FilterFormType,
    value: FilterFormType[keyof FilterFormType] | null
) => void;

export interface HeaderImage {
    label: string;
    imgPath: string;
    link?: string;
}

export interface IHomeProvider {
    repositories: Repository[];
    search: () => void;
    tags: Tag[];
    repositoryTypes: string[];
    repositoryStatus: string[];
    setFilterFormField: SetFilterFormFieldFunction;
    filterForm: FilterFormType;
    headerImages: HeaderImage[];
}

interface HomeProviderProps {
    children: JSX.Element | JSX.Element[];
}

const HomeContext = createContext<IHomeProvider | undefined>(undefined);

const HomeProvider = (props: HomeProviderProps) => {
    const loader = useLoader();
    const toast = useToast();

    const repositoryService = createRepositoryService();
    const tagService = createTagService();

    const [repositories, setRepositories] = useState<Repository[]>([]);

    const [tags, setTags] = useState<Tag[]>([]);

    const repositoryTypes = RepositoryTypeList();
    const repositoryStatus = RepositoryStatusList();

    const [filterForm, setFilterForm] = useState<FilterFormType>({});

    const [headerImages, setHeaderImages] = useState<HeaderImage[]>([
        {
            label: 'Seekos',
            imgPath: 'https://i.imgur.com/mwMp4X1.jpg'
        }
    ]);

    const [isFirstSearch, setIsFirstSearch] = useState(true);

    useEffect(() => {
        getKeys();
        search();
    }, []);

    useEffect(() => {
        if (isFirstSearch && repositories.length) {
            console.log({
                isFirstSearch,
                hhh: repositories.map((r) => ({
                    label: r.name,
                    imgPath: r.url_image || require('../../../assets/repository-default.jpg')
                }))
            });
            setHeaderImages(
                repositories
                    .filter((r) => r.url_image)
                    .map((r) => ({
                        label: r.name,
                        imgPath: r.url_image!,
                        link: `/repository/${r.id}`
                    }))
            );
            setIsFirstSearch(false);
        }
    }, [repositories]);

    const setFilterFormField = (
        field: keyof FilterFormType,
        value: FilterFormType[keyof FilterFormType] | null
    ) => setFilterForm({ ...filterForm, [field]: value });

    const search = () => {
        loader.show();
        repositoryService
            .search({
                search: filterForm.search,
                type: filterForm.type,
                status: filterForm.status,
                key: filterForm.tag
            })
            .then((response) => setRepositories(response))
            .catch(() => toast.show('Error loading repositories', 'error'))
            .finally(() => loader.hide());
    };

    const getKeys = () => {
        tagService.getAll().then((response) => setTags(response));
    };

    const returnValue = useMemo(
        () => ({
            repositories,
            search,
            tags,
            repositoryTypes,
            repositoryStatus,
            setFilterFormField,
            filterForm,
            headerImages
        }),
        [repositories, tags, repositoryTypes, repositoryStatus, filterForm, headerImages]
    );

    return <HomeContext.Provider value={returnValue}>{props.children}</HomeContext.Provider>;
};

export default HomeProvider;

export const useHomeContext = () => useContext(HomeContext)!;
