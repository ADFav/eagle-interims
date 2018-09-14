export interface FirestoreReference<T> {
    data: T;
    path?: string;
    edit? : boolean;
}
