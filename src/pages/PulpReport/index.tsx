import ReportActions from './components/ReportActions';
import ReportHeader from './components/ReportHeader';
import ReportProductionOrders from './components/ReportProductionOrders';
import PulpReportProvider from './contexts/PulpReportContext';
import './index.scss';

const PulpReport = () => {
    return (
        <div id="pulp-report">
            <PulpReportProvider>
                <ReportHeader />
                <ReportProductionOrders />
                <ReportActions />
            </PulpReportProvider>
        </div>
    );
};

export default PulpReport;
