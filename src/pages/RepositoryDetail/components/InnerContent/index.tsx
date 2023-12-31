
interface InnerContentProps {
    title: string;
    content: string;
}

export default function InnerContent(props: InnerContentProps) {
    return (
        <div className="info-resume">
            <div><b>{props.title}</b></div>
            <div>{props.content}</div>
        </div>
    )
}
