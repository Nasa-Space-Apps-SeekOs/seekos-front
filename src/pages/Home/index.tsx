import Page from '../../components/Page';
import Header from './components/Header';
import Search from './components/Search';
import HomeProvider from './contexts/HomeContext';
import './index.scss';

export default function Home() {
    return (
        <HomeProvider>
            <div id="page-home">
                <Page title="Home test">
                    <Header />
                    <Search />
                </Page>
            </div>
        </HomeProvider>
    );
}
