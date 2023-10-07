import colors from '../../styles/colors.scss';

export enum RepositoryPhase {
    init = 'init',
    development = 'development',
    test = 'test',
    concluded = 'concluded'
}

export const RepositoryPhaseColors = {
    [RepositoryPhase.init]: colors['color-midnightblue'],
    [RepositoryPhase.development]: colors['color-peterriver'],
    [RepositoryPhase.test]: colors['color-wisteria'],
    [RepositoryPhase.concluded]: colors['color-emerland']
};

export const RepositoryPhaseLabels = {
    [RepositoryPhase.init]: 'Init',
    [RepositoryPhase.development]: 'Development',
    [RepositoryPhase.test]: 'Test',
    [RepositoryPhase.concluded]: 'Concluded'
};
