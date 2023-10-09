import { Col, Row } from 'react-grid-system';
import Page from '../../components/Page';
import Header from './components/Header';
import Search from './components/Search';
import HomeProvider from './contexts/HomeContext';
import './index.scss';
import Filters from './components/Filters';
import ResultsList from './components/ResultsList';

export default function Home() {
    return (
        <HomeProvider>
            <Page>
                <div id="page-home">
                    <Header />
                    <Row>
                        <Col md={4} lg={3}>
                            <Filters />
                        </Col>
                        <Col md={8} lg={9}>
                            <div className="home-search-results">
                                <Search />
                                <ResultsList />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Page>
        </HomeProvider>
    );
}
