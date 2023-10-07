import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    Switch,
    TextField
} from '@mui/material';
import AppCard from '../../../../components/AppCard';
import './index.scss';

export default function Filters() {
    return (
        <div id="home-filters">
            <AppCard>
                <div className="filters-title">Filters</div>

                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel required control={<Checkbox />} label="Required" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />

                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>

                    <FormControlLabel control={<Switch defaultChecked />} label="Label" />
                    <FormControlLabel required control={<Switch />} label="Required" />
                    <FormControlLabel disabled control={<Switch />} label="Disabled" />

                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        defaultValue="Small"
                        variant="filled"
                        size="small"
                    />
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        defaultValue="Normal"
                        variant="filled"
                    />
                </FormGroup>
            </AppCard>
        </div>
    );
}
