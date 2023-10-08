import { Box, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { Row } from 'react-grid-system';
import { useParams } from 'react-router-dom';
import AppCard from '../../components/AppCard';
import { useLoader } from '../../contexts/LoaderContext';
import { Repository, RepositoryComment } from '../../models/api/repository';
import { RepositoryService, createRepositoryService } from '../../services/repository.service';
import InnerContent from './components/InnerContent';
import Page from './components/Page/index';
import { CustomTabPanel, TabsValue, getTabProps } from './components/TabsUtils';
import './index.scss';

export default function RepositoryDetail() {
    const loader = useLoader();
    const { id } = useParams<{ id: string }>();
    const repService = createRepositoryService();
    const [repository, setRepository] = useState<Repository>({} as Repository);
    const [repositoryComments, setRepositoryComments] = useState<RepositoryComment[]>([] as RepositoryComment[]);
    const [tabValue, setTabValue] = useState<TabsValue>('information');
    const [tabsData, setTabsData] = useState<any>({
        information: null,
        comments: null,
        colaborators: null
    });

    const tabsColector = {
        information: (repService: RepositoryService, id: number) => {
            loader.show();
            return repService.getById(id).then(response => setRepository(response)).finally(() => loader.hide());
        },
        comments: (repService: RepositoryService, id: number) => {
            loader.show();
            return repService.getCommets(id).then(response => setRepositoryComments(response)).finally(() => loader.hide());
        },
        colaborators: (repService: RepositoryService, id: number) => {
            return {}
        }
    }

    useEffect(() => {
        if (tabsData[tabValue]) return;
        setTabsData({
            ...tabsData, 
            [tabValue]: tabsColector[tabValue](repService, Number(id))
        })
    }, [tabValue]);


    const handleChange = (event: React.SyntheticEvent, newValue: TabsValue) => {
        setTabValue(newValue);
    };

    return (
        <div id="page-repository-detail">

            <Page title={`${repository.name}`} sideMenu={
                <div>
                    <Row className="logo-div">
                        <div className="repo-image" style={{backgroundImage: `url(https://www.cnet.com/a/img/resize/1fd603bee192c5ae0baad98958fc9f6937b9253d/hub/2023/07/28/c1518c71-4589-45e1-ba9b-4a696c1c3d8d/screen-shot-2023-07-28-at-1-30-28-pm.png?auto=webp&fit=crop&height=1200&width=1200)`}}
                            />
                    </Row>
                    <div className='repo-mame'>{repository.name}</div>
                    <div className="repo-details"><b>23 Colaboradores</b></div>
                </div>
            }>
                <Box sx={{ width: '100%' }}>
                <AppCard className="app-card">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleChange}>
                            <Tab label="Information" {...getTabProps('information')} value={'information'}/>
                            <Tab label="Coments" {...getTabProps('comments')} value={'comments'}/>
                            <Tab label="Colaborators" {...getTabProps('colaborators')} value={'colaborators'}/>
                        </Tabs>
                    </Box>

                        <CustomTabPanel value={tabValue} index={'information'}>
                            <div className="info-content">
                                <InnerContent title={'Resume'} content={repository.resume}/>
                                <div className="minorInfo">
                                        🚀{repository.likes}
                                </div>
                                <div className="minorInfo">
                                    <b>Status:</b> {repository.status}
                                </div>
                                <div className="minorInfo">
                                    <b>Type</b>: {repository.type}
                                </div>
                                <div className="info-body">
                                    <div><b>Body</b></div>
                                    <div className="body-box" dangerouslySetInnerHTML={{ __html: repository.body }} />
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabValue} index={'comments'}>
                           <div>
                           {repositoryComments.map((comment, index) => (
                                <div className="comment-box" key={comment.id}>
                                    <div className="comment-header">
                                        <div className="comment-user">
                                            <div className="comment-user-name">bgmartins</div>
                                        </div>
                                        <div className="comment-date">{comment.created_at}</div>
                                    </div>
                                    <div className="comment-body">
                                        <div className="comment-body-text">{comment.comment}</div>
                                    </div>
                                </div>
                            ))}
                            
                           </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabValue} index={'colaborators'}>
                            Colaboradores
                        </CustomTabPanel>
                </AppCard>
                </Box>
            </Page>
        </div>
    );
}