export enum RepositoryType {
    project = 'project',
    idea = 'idea'
}

export enum RepositoryPhase {
    init = 'init',
    development = 'development',
    test = 'test',
    concluded = 'concluded'
}

export interface Repository {
    id: number;
    type: RepositoryType;
    name: string;
    resume: string;
    body: string;
    ranking: number;
    phases: RepositoryPhase;
}
