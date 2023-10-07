import { RepositoryPhase } from "../enums/repository-phase";
import { RepositoryType } from "../enums/repository-type";

export interface RepositoryDto {
    id?: number;
    type: RepositoryType;
    name: string;
    resume: string;
    body: string;
    phases: RepositoryPhase;
}
