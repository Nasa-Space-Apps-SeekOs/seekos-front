import classNames from 'classnames';
import './index.scss';

interface AppCardProps {
    children: any;
    className?: string;
}

export default function AppCard({ children, className }: AppCardProps) {
    return <div className={classNames('app-card', className)}>{children}</div>;
}
