export interface ProductionOrder {
    id: number;
    orderNumber: number;
    startDate: string;
    itemCode: string;
    itemDescription: string;
    unit: string;
    orderQuantity: number;
    producedQuantity: number;
    reportedBarrelsQuantity: number;
    operationCode: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    reportAlertsCount?: number;
}
