import { IconButton, InputBase, Paper } from '@mui/material';
import './index.scss';
import { Search as IconSearch } from '@mui/icons-material';
import AppCard from '../../../../components/AppCard';

export default function Search() {
    return (
        <div id="home-search">
            <div className="input-search">
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search a repository"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <IconSearch />
                </IconButton>
            </div>
        </div>
    );
}
