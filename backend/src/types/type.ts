export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;

    characterictics: {
        article: string;
        type: string;
        material: string;
        height: number;
        width: number;
        country: string;
    }[];
}