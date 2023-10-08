import colors from '../../styles/colors.scss';

export enum RepositoryType {
    idea = 'idea',
    project = 'project'
}

export const RepositoryTypeList = () => Object.keys(RepositoryType);

export const RepositoryTypeLabels: { [key: string]: string } = {
    [RepositoryType.project]: 'Project',
    [RepositoryType.idea]: 'Idea'
};

export const RepositoryTypeColors: { [key: string]: string } = {
    [RepositoryType.project]: colors['color-peterriver'],
    [RepositoryType.idea]: colors['color-amethyst']
};
