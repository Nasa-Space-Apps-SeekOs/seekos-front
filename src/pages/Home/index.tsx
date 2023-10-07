import { Col, Row } from 'react-grid-system';
import Page from '../../components/Page';
import Header from './components/Header';
import Search from './components/Search';
import HomeProvider from './contexts/HomeContext';
import './index.scss';
import Filters from './components/Filters';

export default function Home() {
    return (
        <HomeProvider>
            <Page>
                <div id="page-home">
                    <Header />
                    <Row>
                        <Col md={3}>
                            <Filters />
                        </Col>
                        <Col md={9}>
                            <Search />
                        </Col>
                    </Row>
                </div>
            </Page>
        </HomeProvider>
    );
}
