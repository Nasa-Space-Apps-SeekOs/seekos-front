import CqRangesForm from './components/CqRangesForm';
import CqRangesHeader from './components/CqRangesHeader';
import CqRangesContext from './contexts/CqRangesContext';
import './index.scss';

const CqRanges = () => {
    return (
        <div id="cq-ranges">
            <CqRangesContext>
                <CqRangesHeader />
                <CqRangesForm />
            </CqRangesContext>
        </div>
    );
};

export default CqRanges;
