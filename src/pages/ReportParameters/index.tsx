import ReportParametersForm from './components/ReportParametersForm';
import ReportParametersHeader from './components/ReportParametersHeader';
import ReportParametersProvider from './contexts/ReportParametersContext';
import './index.scss';

const ReportParameters = () => {
    return (
        <div id="report-parameters">
            <ReportParametersProvider>
                <ReportParametersHeader />
                <ReportParametersForm />
            </ReportParametersProvider>
        </div>
    );
};

export default ReportParameters;
