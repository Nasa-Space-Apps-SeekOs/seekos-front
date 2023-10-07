import { RepositoryPhase, RepositoryType } from "../api/repository";

export interface RepositoryDto {
    id?: number;
    type: RepositoryType;
    name: string;
    resume: string;
    body: string;
    phases: RepositoryPhase;
}
