export {}

declare module 'express-serve-static-core' {
  interface Request {
    userId: string,
    cookieDate: number | undefined,
    user: UserType,
  }
}