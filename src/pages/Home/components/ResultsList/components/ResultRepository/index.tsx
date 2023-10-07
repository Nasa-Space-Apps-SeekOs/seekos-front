import { Button, Chip } from '@mui/material';
import AppCard from '../../../../../../components/AppCard';
import { Repository } from '../../../../../../models/api/repository';
import {
    RepositoryTypeColors,
    RepositoryTypeLabels
} from '../../../../../../models/enums/repository-type';
import {
    RepositoryPhaseColors,
    RepositoryPhaseLabels
} from '../../../../../../models/enums/repository-phase';
import colors from '../../../../../../styles/colors.scss';
import './index.scss';
import { Link } from 'react-router-dom';

interface ResultRepositoryProps {
    repository: Repository;
}

export default function ResultRepository({ repository }: ResultRepositoryProps) {
    const { name, resume, type, likes, phases, id } = repository;

    const typeFormatted = (
        <span style={{ color: RepositoryTypeColors[type], fontWeight: 'bold' }}>
            {RepositoryTypeLabels[type]}
        </span>
    );

    const phaseChip = (
        <Chip
            label={RepositoryPhaseLabels[phases]}
            style={{ color: colors['color-white'], backgroundColor: RepositoryPhaseColors[phases] }}
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
                    <div className="item__footer__phase">{phaseChip}</div>
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
