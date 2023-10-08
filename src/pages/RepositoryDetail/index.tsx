import { Box, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { Row } from 'react-grid-system';
import { useParams } from 'react-router-dom';
import AppCard from '../../components/AppCard';
import { useLoader } from '../../contexts/LoaderContext';
import { Repository } from '../../models/api/repository';
import { RepositoryColaborator } from '../../models/api/repository-colaborator';
import { RepositoryComment } from '../../models/api/repository-comment';
import { RepositoryService, createRepositoryService } from '../../services/repository.service';
import Comment from './components/Comment';
import Member from './components/Member';

import InnerContent from './components/InnerContent';
import Page from './components/Page/index';
import { CustomTabPanel, TabsValue, getTabProps } from './components/TabsUtils';
import './index.scss';

export default function RepositoryDetail() {
    const loader = useLoader();
    const { id } = useParams<{ id: string }>();
    const repService = createRepositoryService();
    const [repository, setRepository] = useState<Repository>({} as Repository);
    const [repositoryComments, setRepositoryComments] = useState<RepositoryComment[]>(
        [] as RepositoryComment[]
    );
    const [repositoryColaborators, setRepositoryColaborators] = useState<RepositoryColaborator[]>([] as RepositoryColaborator[]);
    const [tabValue, setTabValue] = useState<TabsValue>('information');
    const [tabsData, setTabsData] = useState<any>({
        information: null,
        comments: null,
        colaborators: null
    });

    const tabsColector = {
        information: (repService: RepositoryService, id: number) => {
            loader.show();
            return repService
                .getById(id)
                .then((response) => setRepository(response))
                .finally(() => loader.hide());
        },
        comments: (repService: RepositoryService, id: number) => {
            loader.show();
            return repService
                .getCommets(id)
                .then((response) => setRepositoryComments(response))
                .finally(() => loader.hide());
        },
        colaborators: (repService: RepositoryService, id: number) => {
            loader.show();
            return repService
                .getMembers(id)
                .then((response) => setRepositoryColaborators(response))
                .finally(() => loader.hide());
        }
    };

    useEffect(() => {
        if (tabsData[tabValue]) return;
        setTabsData({
            ...tabsData,
            [tabValue]: tabsColector[tabValue](repService, Number(id))
        });
    }, [tabValue]);

    const handleChange = (event: React.SyntheticEvent, newValue: TabsValue) => {
        setTabValue(newValue);
    };

    const image = repository.url_image || require('../../assets/repository-default.jpg');

    return (
        <div id="page-repository-detail">
            <Page
                title={`${repository.name}`}
                sideMenu={
                    <div>
                        <Row className="logo-div">
                            <div
                                className="repo-image"
                                style={{
                                    backgroundImage: `url(${image})`
                                }}
                            />
                        </Row>
                        <div className="repo-mame">{repository.name}</div>
                        <div className="repo-details">
                            <b>23 Colaboradores</b>
                        </div>
                    </div>
                }
            >
                <Box sx={{ width: '100%' }}>
                    <AppCard className="app-card">
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tabValue} onChange={handleChange}>
                                <Tab
                                    label="Information"
                                    {...getTabProps('information')}
                                    value={'information'}
                                />
                                <Tab
                                    label="Coments"
                                    {...getTabProps('comments')}
                                    value={'comments'}
                                />
                                <Tab
                                    label="Colaborators"
                                    {...getTabProps('colaborators')}
                                    value={'colaborators'}
                                />
                            </Tabs>
                        </Box>

                        <CustomTabPanel value={tabValue} index={'information'}>
                            <div className="info-content">
                                <InnerContent title={'Resume'} content={repository.resume} />
                                <div className="minorInfo">🚀{repository.likes}</div>
                                <div className="minorInfo">
                                    <b>Status:</b> {repository.status}
                                </div>
                                <div className="minorInfo">
                                    <b>Type</b>: {repository.type}
                                </div>
                                <div className="info-body">
                                    <div>
                                        <b>Body</b>
                                    </div>
                                    <div
                                        className="body-box"
                                        dangerouslySetInnerHTML={{ __html: repository.body }}
                                    />
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabValue} index={'comments'}>
                            <div>
                                {repositoryComments.length > 0 ? repositoryComments.map((comment, index) => (
                                    <Comment {...comment} key={comment.id} />
                                )) : <div className="no-comments">No comments</div>}
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabValue} index={'colaborators'}>
                                {repositoryColaborators.length > 0 ? repositoryColaborators.map((colaborator, index) => (
                                    <Member {...colaborator} key={colaborator.id} />
                                )) : <div className="no-comments">No colaborators</div>}
                        </CustomTabPanel>
                    </AppCard>
                </Box>
            </Page>
        </div>
    );
}
