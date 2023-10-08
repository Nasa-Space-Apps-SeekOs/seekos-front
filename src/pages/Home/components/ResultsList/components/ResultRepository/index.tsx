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
import {
    RepositoryStatusColors,
    RepositoryStatusLabels
} from '../../../../../../models/enums/repository-status';
import { Col, Row } from 'react-grid-system';

interface ResultRepositoryProps {
    repository: Repository;
}

export default function ResultRepository({ repository }: ResultRepositoryProps) {
    const { name, resume, type, likes, status, id, url_image } = repository;

    const typeFormatted = (
        <span style={{ color: RepositoryTypeColors[type], fontWeight: 'bold' }}>
            {RepositoryTypeLabels[type]}
        </span>
    );

    const statusChip = status ? (
        <Chip
            label={RepositoryStatusLabels[status]}
            style={{
                color: colors['color-white'],
                backgroundColor: RepositoryStatusColors[status]
            }}
        />
    ) : (
        <div></div>
    );

    const image = url_image || require('../../../../../../assets/repository-default.jpg');

    return (
        <div className="result-repository">
            <AppCard className="item">
                <Row>
                    <Col sm={2}>
                        <div
                            className="item-image"
                            style={{ backgroundImage: `url("${image}")` }}
                        ></div>
                    </Col>
                    <Col className="item-content" sm={10}>
                        <div className="item-content__header">
                            <div className="item-content__header__type">{typeFormatted}</div>
                            <div className="item-content__header__likes">
                                <span>{likes}</span>
                                <span>🚀</span>
                            </div>
                        </div>

                        <div className="item-content__content">
                            <div className="item-content__content__name">{name}</div>
                            <div className="item-content__content__resume">{resume}</div>
                        </div>

                        <div className="item-content__footer">
                            <div className="item-content__footer__status">{statusChip}</div>
                            <Link to={`/repository/${id}`} className="item__footer__view-more">
                                <Button color="secondary" variant="contained">
                                    View more...
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </AppCard>
        </div>
    );
}
