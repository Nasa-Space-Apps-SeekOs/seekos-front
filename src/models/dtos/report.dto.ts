export interface ReportDto {
    reportQuantity: number;
    operatorId: number;
    port: number;
    
    productionOrderNumber?: number;
    type?: string;
    brix?: number;
    color?: number;
    consistency?: number;
    acidity?: number;
    ph?: number;
    naturalSalt?: number;
    impurities?: number;
    refining?: string;
    fungus?: number;
    temperature?: number;
    foreignMatterInsect?: number;
    foreignMatterRodent?: number;
    message?: string;
    specifications?: string;
    observations?: string;
    printerAddress?: string;
}
