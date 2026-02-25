export interface Usuario{
    id?:number;
    nombre:String;
    email: String;
    password:string;
    rol: 'ROLE_ADMIN' | 'ROLE_VETERINARIO';
}