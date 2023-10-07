import './index.scss';
import { useHomeContext } from '../../contexts/HomeContext';
import ResultRepository from './components/ResultRepository';

export default function ResultsList() {
    const { repositories } = useHomeContext();

    return (
        <div id="home-results-list">
            <div className="cards">
                {repositories.map((r) => (
                    <ResultRepository repository={r} />
                ))}
            </div>
        </div>
    );
}
