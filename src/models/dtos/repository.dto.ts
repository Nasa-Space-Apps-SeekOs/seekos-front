import { RepositoryStatus } from "../enums/repository-status";
import { RepositoryType } from "../enums/repository-type";

export interface RepositoryDto {
    id?: number;
    type: RepositoryType;
    name: string;
    resume: string;
    body: string;
    status?: RepositoryStatus;
}
