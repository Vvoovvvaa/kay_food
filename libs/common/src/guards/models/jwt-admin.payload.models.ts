export interface AdminAuthGuard{
    sub:number |string
    name:string
    temp?:boolean
}