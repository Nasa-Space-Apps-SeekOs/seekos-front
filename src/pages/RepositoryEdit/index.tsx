import { useEffect, useState } from 'react';
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import AppCard from '../../components/AppCard';
import Page from '../../components/Page';
import draftToHtml from 'draftjs-to-html';
import { Repository } from '../../models/api/repository';
import { RepositoryDto } from '../../models/dtos/repository.dto';

interface FormType {
    type: RepositoryType;
    name: string;
    resume: string;
    url_image?: string;
    status?: RepositoryStatus;
}

const RepositoryEdit = () => {
    const loader = useLoader();
    const toast = useToast();
    const repositoryService = createRepositoryService();
    const navigate = useNavigate();

    const [repository, setRepository] = useState<Repository>();

    const { id } = useParams<{ id: string }>();

    const [form, setForm] = useState<FormType>({
        type: RepositoryType.idea,
        name: '',
        resume: ''
    });

    const [body, setBody] = useState(() => EditorState.createEmpty());

    const types = RepositoryTypeList();

    const statusList = RepositoryStatusList();

    const isProject = form.type === RepositoryType.project;

    useEffect(() => {
        if (id) getRepository();
    }, []);

    useEffect(() => {
        if (repository) setFormValues();
    }, [repository]);

    const setFormValues = () => {
        if (repository) {
            const { name, type, status, resume, body: bodyStr, url_image } = repository;

            setForm({
                name,
                type,
                status,
                resume,
                url_image
            });

            setBody(EditorState.createWithContent(ContentState.createFromText(bodyStr)));
        }
    };

    const getRepository = () => {
        loader.show();
        repositoryService
            .getById(Number(id))
            .then((response) => setRepository(response))
            .catch(() => {
                toast.show('Error loading repository');
                navigate(-1);
            })
            .finally(() => loader.hide());
    };

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
        if (isProject && !form.status) errors.push('Status is required');
        if (!body) errors.push('Body is required');

        if (!errors.length) return true;

        errors.forEach((error) => toast.show(error, 'error'));

        return false;
    };

    const save = () => {
        if (!formIsValid()) return;

        const dto: RepositoryDto = {
            id: id ? Number(id) : undefined,
            type: form.type,
            name: form.name,
            resume: form.resume,
            body: draftToHtml(convertToRaw(body.getCurrentContent())),
            status: form.status
        };

        const savePromise = id
            ? repositoryService.update(Number(id), dto)
            : repositoryService.create(dto);

        loader.show();
        savePromise
            .then((response) => {
                toast.show('Repository created!', 'success');
                navigate(`/repository/${response.id}`);
            })
            .catch(() => {
                toast.show('Error creating repository', 'error');
            })
            .finally(() => loader.hide());
    };

    const titleText = id ? 'Edit Repository' : 'New Repository';
    const buttonSaveText = id ? 'Save' : 'Create';

    return (
        <div id="page-repository-edit">
            <Page title={titleText}>
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
                            id="form-name"
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

                        <TextField
                            id="form-image"
                            label="Image URL (Optional)"
                            value={form.url_image}
                            onChange={(e) => setFormField('url_image', e.target.value)}
                        />

                        {form.url_image && <img className='form-image-preview' src={form.url_image} />}

                        {isProject && (
                            <FormControl>
                                <FormLabel id="form-status-label">Project Status</FormLabel>
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
                        )}
                    </AppCard>

                    <AppCard>
                        <Editor
                            wrapperClassName="body-editor-wrapper"
                            editorState={body}
                            onEditorStateChange={setBody}
                        />
                    </AppCard>

                    <AppCard>
                        <Button onClick={save} color="primary" variant="contained">
                            {buttonSaveText}
                        </Button>
                    </AppCard>
                </form>
            </Page>
        </div>
    );
};

export default RepositoryEdit;
