import { createContext, useContext, useEffect, useState } from 'react';
import { Operator } from '../models/api/operator';
import { createOperatorService } from '../services/operator.service';
import { useLoader } from './LoaderContext';
import { useToast } from './ToastContext';
import { createStorage } from '../core/storage';

export interface IOperatorProvider {
    operator: Operator | undefined;
    getOperator: (registration: string, showLoader?: boolean) => void;
    clearOperator: () => void;
}

interface OperatorProviderProps {
    children: JSX.Element;
}

const OperatorContext = createContext<IOperatorProvider | undefined>(undefined);

const OperatorProvider = (props: OperatorProviderProps) => {
    const loader = useLoader();
    const toast = useToast();

    const storage = createStorage();
    const operatorService = createOperatorService();

    const [operator, setOperator] = useState<Operator>();

    useEffect(() => {
        const lastOperator = storage.getData().lastOperator;
        if (lastOperator) {
            setOperator(lastOperator);
        }
    }, []);

    const getOperator = (registration: string) => {
        operatorService
            .getByRegistration(registration)
            .then((response) => {
                setOperator(response);
                storage.setData({
                    ...storage.getData(),
                    lastOperator: response
                });
                storage.saveData();
            })
            .catch(() => {});
    };

    const clearOperator = () => {
        setOperator(undefined);
    };

    return (
        <OperatorContext.Provider
            value={{
                operator,
                getOperator,
                clearOperator
            }}
        >
            {props.children}
        </OperatorContext.Provider>
    );
};

export default OperatorProvider;

export const useOperatorContext = () => useContext(OperatorContext)!;
