import AppCard from '../../../../components/AppCard';
import './index.scss';

export default function Header() {
    return (
        <div id="home-header">
            <AppCard className="header-content">
                <h1 className="header-content__title">SeekOs</h1>
                <h2 className="header-content__sub">Get your idea out of the shower!</h2>
            </AppCard>
        </div>
    );
}
