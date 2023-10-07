export interface CqRange {
    id: number;
    establishmentCode: string;
    brixMin: number;
    brixMax: number;
    colorMin: number;
    colorMax: number;
    consistencyMin: number;
    consistencyMax: number;
    acidityMin: number;
    acidityMax: number;
    phMin: number;
    phMax: number;
    naturalSaltMin: number;
    naturalSaltMax: number;
    impuritiesMin: number;
    impuritiesMax: number;
    fungusMin: number;
    fungusMax: number;
    temperatureMin: number;
    temperatureMax: number;
    foreignMatterInsectMin: number;
    foreignMatterInsectMax: number;
    foreignMatterRodentMin: number;
    foreignMatterRodentMax: number;
    createdAt: string;
    updatedAt: string;
}
