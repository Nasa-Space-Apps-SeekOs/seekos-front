import { Button, Chip } from '@mui/material';
import AppCard from '../../../../../../components/AppCard';
import { Repository } from '../../../../../../models/api/repository';
import {
    RepositoryTypeColors,
    RepositoryTypeLabels
} from '../../../../../../models/enums/repository-type';
import colors from '../../../../../../styles/colors.scss';
import './index.scss';
import { Link } from 'react-router-dom';
import { RepositoryStatusColors, RepositoryStatusLabels } from '../../../../../../models/enums/repository-status';

interface ResultRepositoryProps {
    repository: Repository;
}

export default function ResultRepository({ repository }: ResultRepositoryProps) {
    const { name, resume, type, likes, status, id } = repository;

    const typeFormatted = (
        <span style={{ color: RepositoryTypeColors[type], fontWeight: 'bold' }}>
            {RepositoryTypeLabels[type]}
        </span>
    );

    const statusChip = (
        <Chip
            label={RepositoryStatusLabels[status]}
            style={{ color: colors['color-white'], backgroundColor: RepositoryStatusColors[status] }}
        />
    );

    return (
        <div className="result-repository">
            <AppCard className="item">
                <div className="item__header">
                    <div className="item__header__type">{typeFormatted}</div>
                    <div className="item__header__likes">
                        <span>{likes}</span>
                        <span>🚀</span>
                    </div>
                </div>

                <div className="item__content">
                    <div className="item__content__name">{name}</div>
                    <div className="item__content__resume">{resume}</div>
                </div>

                <div className="item__footer">
                    <div className="item__footer__status">{statusChip}</div>
                    <Link to={`/repository/${id}`}>
                        <Button
                            className="item__footer__view-more"
                            color="secondary"
                            variant="contained"
                        >
                            View more...
                        </Button>
                    </Link>
                </div>
            </AppCard>
        </div>
    );
}
