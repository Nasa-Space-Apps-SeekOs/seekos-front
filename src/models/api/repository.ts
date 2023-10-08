import { RepositoryStatus } from '../enums/repository-status';
import { RepositoryType } from '../enums/repository-type';

export interface Repository {
    id: number;
    type: RepositoryType;
    name: string;
    resume: string;
    body: string;
    likes: number;
    ranking: number;
    status: RepositoryStatus;
}
