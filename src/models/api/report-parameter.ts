export interface ReportParameter {
    id: number;
    establishmentCode: string;
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
    productionOrderNumber: number;
    printerAddress: string;
    useScale: boolean;
    scaleDelayToReport: number;
    updatedAt: string;
}
