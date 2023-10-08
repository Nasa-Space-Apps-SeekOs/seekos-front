import { Row } from 'react-grid-system';
import './index.scss';

interface PageProps {
    children: JSX.Element,
    sideMenu: JSX.Element,
    title?: string,
}

const Page = (props: PageProps) => {
    return (
        <Row id="repositor-detail-page">
            <div className='side-menu'>
                {props.sideMenu}
            </div>
            <div className='container'>
                <div className="page-content">{props.children}</div>
            </div>
        </Row>
    );
};

export default Page;
