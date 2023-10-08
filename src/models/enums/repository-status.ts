import colors from '../../styles/colors.scss';

export enum RepositoryStatus {
    init = 'init',
    development = 'development',
    test = 'test',
    concluded = 'concluded'
}

export const RepositoryStatusList = () => Object.keys(RepositoryStatus);

export const RepositoryStatusColors: { [key: string]: string } = {
    [RepositoryStatus.init]: colors['color-midnightblue'],
    [RepositoryStatus.development]: colors['color-peterriver'],
    [RepositoryStatus.test]: colors['color-wisteria'],
    [RepositoryStatus.concluded]: colors['color-emerland']
};

export const RepositoryStatusLabels: { [key: string]: string } = {
    [RepositoryStatus.init]: 'Init',
    [RepositoryStatus.development]: 'Development',
    [RepositoryStatus.test]: 'Test',
    [RepositoryStatus.concluded]: 'Concluded'
};
