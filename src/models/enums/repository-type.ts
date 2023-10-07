import colors from '../../styles/colors.scss';

export enum RepositoryType {
    project = 'project',
    idea = 'idea'
}

export const RepositoryTypeLabels = {
    [RepositoryType.project]: 'Project',
    [RepositoryType.idea]: 'Idea'
};

export const RepositoryTypeColors = {
    [RepositoryType.project]: colors['color-peterriver'],
    [RepositoryType.idea]: colors['color-amethyst']
};
