import { Repository } from '../models/api/repository';
import { RepositoryDto } from '../models/dtos/repository.dto';
import { RepositoryPhase } from '../models/enums/repository-phase';
import { RepositoryType } from '../models/enums/repository-type';
import { RepositoryFilter } from '../models/filters/repository-search.filter';
import { http } from './config/http';
import { URLS } from './config/urls';

export const createRepositoryService = () => {
    const search = (filter: RepositoryFilter): Promise<Repository[]> => {
        return new Promise((resolve) => resolve(mockRepository));
        // return http()
        //     .get<any>(URLS.api.repository.search(), {
        //         params: filter
        //     })
        //     .then((response) => response.data);
    };

    const getById = (id: number): Promise<Repository> => {
        return new Promise((resolve) => resolve(mockRepository.find((r) => r.id === id)!));
        // return http()
        //     .get<any>(URLS.api.repository.getById(id))
        //     .then((response) => response.data);
    };

    const update = (id: number, dto: RepositoryDto): Promise<Repository[]> => {
        return http()
            .put<any>(URLS.api.repository.update(id), dto)
            .then((response) => response.data);
    };

    const create = (dto: RepositoryDto): Promise<Repository[]> => {
        return http()
            .post<any>(URLS.api.repository.create(), dto)
            .then((response) => response.data);
    };

    return {
        search,
        getById,
        update,
        create
    };
};

const mockRepository: Repository[] = [
    {
        id: 1,
        type: RepositoryType.project,
        name: 'Projeto A',
        resume: 'Este é o resumo detalhado do Projeto A, que contém informações adicionais sobre o projeto e seus objetivos. O Projeto A visa resolver problemas específicos na área de tecnologia, proporcionando soluções inovadoras para nossos clientes. Este resumo fornece insights sobre os principais recursos e benefícios do projeto.',
        body: 'Descrição detalhada do Projeto A',
        ranking: 5,
        phases: RepositoryPhase.init,
        likes: 3422
    },
    {
        id: 2,
        type: RepositoryType.idea,
        name: 'Ideia 1',
        resume: 'Este é o resumo detalhado da Ideia 1, que apresenta informações essenciais sobre a ideia e seu potencial. A Ideia 1 tem o objetivo de revolucionar a forma como lidamos com problemas cotidianos, oferecendo uma abordagem inovadora e única. Este resumo destaca os principais conceitos por trás da ideia.',
        body: 'Descrição detalhada da Ideia 1',
        ranking: 3,
        phases: RepositoryPhase.development,
        likes: 3422
    },
    {
        id: 3,
        type: RepositoryType.project,
        name: 'Projeto B',
        resume: 'Este é o resumo detalhado do Projeto B, que descreve os objetivos e metas do projeto em profundidade. O Projeto B tem como foco melhorar a eficiência em processos de negócios, oferecendo soluções avançadas. Este resumo fornece uma visão clara dos benefícios do projeto.',
        body: 'Descrição detalhada do Projeto B',
        ranking: 4,
        phases: RepositoryPhase.test,
        likes: 3422
    },
    {
        id: 4,
        type: RepositoryType.idea,
        name: 'Ideia 2',
        resume: 'Resumo da Ideia 2',
        body: 'Descrição detalhada da Ideia 2',
        ranking: 2,
        phases: RepositoryPhase.concluded,
        likes: 3422
    },
    {
        id: 5,
        type: RepositoryType.project,
        name: 'Projeto C',
        resume: 'Resumo do Projeto C',
        body: 'Descrição detalhada do Projeto C',
        ranking: 5,
        phases: RepositoryPhase.init,
        likes: 3422
    },
    {
        id: 6,
        type: RepositoryType.idea,
        name: 'Ideia 3',
        resume: 'Resumo da Ideia 3',
        body: 'Descrição detalhada da Ideia 3',
        ranking: 3,
        phases: RepositoryPhase.development,
        likes: 3422
    },
    {
        id: 7,
        type: RepositoryType.project,
        name: 'Projeto D',
        resume: 'Resumo do Projeto D',
        body: 'Descrição detalhada do Projeto D',
        ranking: 4,
        phases: RepositoryPhase.test,
        likes: 3422
    },
    {
        id: 8,
        type: RepositoryType.idea,
        name: 'Ideia 4',
        resume: 'Resumo da Ideia 4',
        body: 'Descrição detalhada da Ideia 4',
        ranking: 2,
        phases: RepositoryPhase.concluded,
        likes: 3422
    },
    {
        id: 9,
        type: RepositoryType.project,
        name: 'Projeto E',
        resume: 'Resumo do Projeto E',
        body: 'Descrição detalhada do Projeto E',
        ranking: 5,
        phases: RepositoryPhase.init,
        likes: 3422
    },
    {
        id: 10,
        type: RepositoryType.idea,
        name: 'Ideia 5',
        resume: 'Resumo da Ideia 5',
        body: 'Descrição detalhada da Ideia 5',
        ranking: 3,
        phases: RepositoryPhase.development,
        likes: 3422
    }
];
