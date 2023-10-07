console.log(process.env)

export const ENV: {
    REACT_APP_API_BASE_URL: string;
    REACT_APP_SCALE_URL: string;
} = process.env as any;
