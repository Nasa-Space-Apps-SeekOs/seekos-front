import './index.scss';

interface PageProps {
    children: any;
    title?: string;
}

const Page = (props: PageProps) => {
    return (
        <div id="page">
            <div className="container">
                <h1>{props.title}</h1>
                <div className="page-content">{props.children}</div>
            </div>
        </div>
    );
};

export default Page;
