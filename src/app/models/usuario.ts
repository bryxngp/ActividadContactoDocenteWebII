export interface Usuario{
    id?:string;
    name:String;
    email: String;
    phone:String;
    password:string;
    rol: 'ADMIN' | 'EMPLEADO';
}