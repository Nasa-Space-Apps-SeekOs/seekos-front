import './index.scss';
import { useHomeContext } from '../../contexts/HomeContext';
import ResultRepository from './components/ResultRepository';
import { Col, Row } from 'react-grid-system';

export default function ResultsList() {
    const { repositories } = useHomeContext();

    return (
        <div id="home-results-list">
            <Row className="cards">
                {repositories.map((r, i) => (
                    <Col className='repository-item' sm={12}>
                        <ResultRepository key={i} repository={r} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}
