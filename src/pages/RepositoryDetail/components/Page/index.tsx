import { Col, Row } from 'react-grid-system';
import './index.scss';

interface PageProps {
    children: JSX.Element,
    sideMenu: JSX.Element,
    title?: string,
}

const Page = (props: PageProps) => {
    return (
        <Row id="repositor-detail-page">
            <Col md={3} className='side-menu'>
                {props.sideMenu}
            </Col>
            <Col md={9} className='container'>
                <div className="page-content">{props.children}</div>
            </Col>
        </Row>
    );
};

export default Page;
