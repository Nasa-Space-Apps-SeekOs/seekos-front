const ERRORS: { [key: string]: string } = {
    UNKNOWN_ERROR: 'Erro desconhecido',
    NOT_FOUND: 'Não encontrado',
    ALREADY_EXISTS: 'Já existe',
    AUTHENTICATION_ERROR: 'Erro de autenticação',
    INVALID_INPUT: 'Entrada inválida',
    NOT_AUTHORIZED: 'Não autorizado',
    INVALID_TOKEN: 'Token inválido',
    STRATEGY_ERROR: 'Erro de estratégia',
    DATABASE_ERROR: 'Erro de banco de dados',
    USER_NOT_FOUND: 'Usuário não encontrado',
    OPERATION_NOT_PERMITTED: 'Operação não permitida'
};

export const mapHttpError = (error: any): string => {
    return (
        ERRORS[error.response?.data?.message] || error.response?.data?.message || 'Algo errado...'
    );
};
