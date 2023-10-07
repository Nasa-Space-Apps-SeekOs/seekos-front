import PulpReportManualForm from './components/PulpReportManualForm';
import PulpReportManualHeader from './components/PulpReportManualHeader';
import PulpReportManualProvider from './contexts/PulpReportManualContext';
import './index.scss';

const PulpReportManual = () => {
    return (
        <div id="pulp-report-manual">
            <PulpReportManualProvider>
                <PulpReportManualHeader />
                <PulpReportManualForm />
            </PulpReportManualProvider>
        </div>
    );
};

export default PulpReportManual;
