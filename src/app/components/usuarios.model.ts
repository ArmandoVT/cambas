export class UsuariosModel {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    id: number;
    title: string;
    description: string;
    country: string;
    date: Date;
    idPost: number;
}


export class CommentsModel {
    body: string;
    date: Date;
    postId: number;
}
