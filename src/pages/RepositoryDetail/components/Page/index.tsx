import './index.scss';

interface PageProps {
    children: any;
    title?: string;
}

const Page = (props: PageProps) => {
    return (
        <div id="page">
            <div className="side-menu">
            </div>
            <div className="container">
                <div className="page-content">{props.children}</div>
            </div>
        </div>
    );
};

export default Page;
