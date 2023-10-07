import Page from '../../components/Page';
import HomeProvider from './contexts/HomeContext';
import './index.scss';

export default function Home() {
    return (
        <HomeProvider>
            <div id="page-home">
                <Page title="Home test">
                    <p>Home Works</p>
                </Page>
            </div>
        </HomeProvider>
    );
}
