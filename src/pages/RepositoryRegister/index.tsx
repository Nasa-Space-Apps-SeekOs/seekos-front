import { useState } from 'react';
import './index.scss';
import {
    RepositoryType,
    RepositoryTypeLabels,
    RepositoryTypeList
} from '../../models/enums/repository-type';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';
import {
    RepositoryStatus,
    RepositoryStatusLabels,
    RepositoryStatusList
} from '../../models/enums/repository-status';
import { createRepositoryService } from '../../services/repository.service';
import { useLoader } from '../../contexts/LoaderContext';
import { useToast } from '../../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import AppCard from '../../components/AppCard';
import Page from '../../components/Page';

interface FormType {
    type: RepositoryType;
    name: string;
    resume: string;
    status?: RepositoryStatus;
}

const RepositoryRegister = () => {
    const loader = useLoader();
    const toast = useToast();
    const repositoryService = createRepositoryService();
    const navigate = useNavigate();

    const [form, setForm] = useState<FormType>({
        type: RepositoryType.idea,
        name: '',
        resume: ''
    });

    const [body, setBody] = useState(() => EditorState.createEmpty());

    const types = RepositoryTypeList();

    const statusList = RepositoryStatusList();

    const setFormField = (field: keyof FormType, value: FormType[keyof FormType]) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: value
        }));
    };

    const formIsValid = () => {
        const errors: string[] = [];

        if (!form.type) errors.push('Type is required');
        if (!form.name) errors.push('Name is required');
        if (!form.resume) errors.push('Resume is required');
        if (!body) errors.push('Body is required');

        if (!errors.length) return true;

        errors.forEach((error) => toast.show(error, 'error'));

        return false;
    };

    const save = () => {
        if (!formIsValid()) return;

        loader.show();
        repositoryService
            .create({
                type: form.type,
                name: form.name,
                resume: form.resume,
                body: form.resume,
                status: form.status
            })
            .then((response) => {
                toast.show('Repository created!', 'success');
                navigate(`/repository/${response.id}`);
            })
            .catch(() => {
                toast.show('Error creating repository', 'error');
            })
            .finally(() => loader.hide());
    };

    return (
        <div id="page-repository-register">
            <Page title="New Repository">
                <form>
                    <AppCard>
                        <FormControl>
                            <FormLabel id="form-type-label">Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="form-type-label"
                                value={form.type}
                                onChange={(e) => setFormField('type', e.target.value)}
                            >
                                {types.map((t, i) => (
                                    <FormControlLabel
                                        key={i}
                                        value={t}
                                        control={<Radio />}
                                        label={RepositoryTypeLabels[t]}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>

                        <TextField
                            id="form-named"
                            label="Repository name"
                            value={form.name}
                            onChange={(e) => setFormField('name', e.target.value)}
                        />

                        <TextField
                            id="page-resume"
                            label="Resume"
                            multiline
                            rows={4}
                            value={form.resume}
                            onChange={(e) => setFormField('resume', e.target.value)}
                        />

                        <FormControl>
                            <FormLabel id="form-status-label">Status</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="form-status-label"
                                value={form.status}
                                onChange={(e) => setFormField('status', e.target.value)}
                            >
                                {statusList.map((s, i) => (
                                    <FormControlLabel
                                        key={i}
                                        value={s}
                                        control={<Radio />}
                                        label={RepositoryStatusLabels[s]}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </AppCard>

                    <AppCard>
                        <Editor wrapperClassName='body-editor-wrapper' editorState={body} onEditorStateChange={setBody} />
                    </AppCard>

                    <AppCard>
                        <Button onClick={save} color="primary" variant="contained">
                            Create
                        </Button>
                    </AppCard>
                </form>
            </Page>
        </div>
    );
};

export default RepositoryRegister;
