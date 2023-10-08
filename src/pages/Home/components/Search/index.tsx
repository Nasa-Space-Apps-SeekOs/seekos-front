import { IconButton, InputBase, Paper } from '@mui/material';
import './index.scss';
import { Search as IconSearch } from '@mui/icons-material';
import { useHomeContext } from '../../contexts/HomeContext';
import { KeyboardEvent } from 'react';

export default function Search() {
    const { filterForm, setFilterFormField, search } = useHomeContext();

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            search();
        }
    };

    return (
        <div id="home-search">
            <div className="input-search">
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search a repository"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={filterForm.search}
                    onChange={(e) => setFilterFormField('search', e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={search}>
                    <IconSearch />
                </IconButton>
            </div>
        </div>
    );
}
