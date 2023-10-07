import { Operator } from './operator';

export interface Report {
    id: number;
    company: string;
    establishmentCode: string;
    gmCode: string;
    productionOrderNumber: number;
    lotValidationDate: string;
    reportQuantity: number;
    port: number;
    type: string;
    brix: number;
    color: number;
    consistency: number;
    acidity: number;
    ph: number;
    naturalSalt: number;
    impurities: number;
    refining: string;
    fungus: number;
    temperature: number;
    foreignMatterInsect: number;
    foreignMatterRodent: number;
    message: string;
    specifications: string;
    observations: string;
    reportNumber: number;
    lotNumber: string;
    operator: Operator;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}
