import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Box, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppCard from '../../components/AppCard';
import { Repository } from '../../models/api/repository';
import { RepositoryService, createRepositoryService } from '../../services/repository.service';
import InnerContent from './components/InnerContent';
import Page from './components/Page/index';
import { CustomTabPanel, TabsValue, getTabProps } from './components/TabsUtils';
import './index.scss';

export default function RepositoryDetail() {
    const { id } = useParams<{ id: string }>();
    const repService = createRepositoryService();
    const [repository, setRepository] = useState<Repository>({} as Repository);
    const [tabValue, setTabValue] = useState<TabsValue>('information');
    const [tabsData, setTabsData] = useState<any>({
        information: null,
        comments: null,
        colaborators: null
    });

    const tabsColector = {
        information: (repService: RepositoryService, id: number) => {
            return repService.getById(id).then(response => setRepository(response))
        },
        comments: (repService: RepositoryService, id: number) => {
            return {}
        },
        colaborators: (repService: RepositoryService, id: number) => {
            return {}
        }
    }

    useEffect(() => {
        setTabsData({
            ...tabsData, 
            tabValue: tabsColector[tabValue](repService, Number(id))
        })
    }, [tabValue]);


    const handleChange = (event: React.SyntheticEvent, newValue: TabsValue) => {
        setTabValue(newValue);
    };

    return (
        <div id="page-repository-detail">

            <Page title={`${repository.name}`}>
                <Box sx={{ width: '100%' }}>
                <AppCard className="">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleChange}>
                            <Tab label="Information" {...getTabProps('information')} value={'information'}/>
                            <Tab label="Coments" {...getTabProps('comments')} value={'comments'}/>
                            <Tab label="Colaborators" {...getTabProps('colaborators')} value={'colaborators'}/>
                        </Tabs>
                    </Box>

                        <CustomTabPanel value={tabValue} index={'information'}>
                            <div className="info-content">
                                <InnerContent title={'Body'} content={repository.body}/>
                                <InnerContent title={'Resume'} content={repository.resume}/>
                                <div className="minorInfo">
                                        <RocketLaunchIcon/>{repository.likes}
                                </div>
                                <div className="minorInfo">
                                    <b>{'Status'}:</b> {repository.phases}
                                </div>
                                <div className="minorInfo">
                                    <b>{'Type'}</b>: {repository.type}
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabValue} index={'comments'}>
                            Comentários
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