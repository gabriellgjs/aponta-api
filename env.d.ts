declare namespace NodeJS {
    export type ProcessEnv = {
        PORT: string
        BASE_URL: string
        JWT_SECRET: string
        EXPIRES_IN: string
        DATABASE_NAME: string
        DATABASE_USER: string
        DATABASE_PASSWORD: string
        DATABASE_URL: string
    }
}
