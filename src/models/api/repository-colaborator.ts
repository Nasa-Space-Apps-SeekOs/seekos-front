export interface RepositoryColaborator {
    id: number;
    user: number;
    repository: string;
    is_property?: boolean;
}