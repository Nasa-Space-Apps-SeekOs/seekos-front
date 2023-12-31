import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Typography
} from '@mui/material';
import AppCard from '../../../../components/AppCard';
import './index.scss';
import { useHomeContext } from '../../contexts/HomeContext';
import { RepositoryTypeLabels } from '../../../../models/enums/repository-type';
import { RepositoryStatusLabels } from '../../../../models/enums/repository-status';
import { ExpandMore as IconExpandMore } from '@mui/icons-material';

export default function Filters() {
    const { tags, repositoryTypes, repositoryStatus, filterForm, setFilterFormField, search } =
        useHomeContext();

    const isMobile = window.innerWidth < 768;

    return (
        <div id="home-filters">
            <AppCard>
                <Accordion defaultExpanded={!isMobile}>
                    <AccordionSummary
                        expandIcon={<IconExpandMore />}
                        aria-controls="filters-content"
                        id="filter-header"
                    >
                        <Typography>Filters</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="filters-content">
                        <FormGroup>
                            <FormLabel id="filter-type">Project Type</FormLabel>
                            <RadioGroup
                                aria-labelledby="filter-type"
                                value={filterForm.type}
                                onChange={(e) => setFilterFormField('type', e.target.value)}
                            >
                                <FormControlLabel control={<Radio />} label="All" />
                                {repositoryTypes.map((t, i) => (
                                    <FormControlLabel
                                        key={i}
                                        value={t}
                                        control={<Radio />}
                                        label={RepositoryTypeLabels[t]}
                                    />
                                ))}
                            </RadioGroup>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel id="filter-status">Project Status</FormLabel>
                            <RadioGroup
                                aria-labelledby="filter-status"
                                value={filterForm.status}
                                onChange={(e) => setFilterFormField('status', e.target.value)}
                            >
                                <FormControlLabel control={<Radio />} label="All" />
                                {repositoryStatus.map((s, i) => (
                                    <FormControlLabel
                                        key={i}
                                        value={s}
                                        control={<Radio />}
                                        label={RepositoryStatusLabels[s]}
                                    />
                                ))}
                            </RadioGroup>
                        </FormGroup>

                        <FormControl fullWidth>
                            <InputLabel id="filter-tag">Tag</InputLabel>
                            <Select
                                labelId="filter-tag"
                                label="Tag"
                                value={filterForm.tag}
                                onChange={(e) => setFilterFormField('tag', e.target.value)}
                            >
                                <MenuItem>All</MenuItem>
                                {tags.map((t, i) => (
                                    <MenuItem key={i} value={t.name}>
                                        {t.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button color="primary" variant="outlined" onClick={search}>
                            Search
                        </Button>
                    </AccordionDetails>
                </Accordion>
            </AppCard>
        </div>
    );
}
