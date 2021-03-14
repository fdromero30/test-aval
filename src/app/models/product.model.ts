export class Product {

    name: string;
    description: string;
    value: string;
    ammount?: number;
    id?: string;

    constructor(name, description, value, ammount?, id?) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.value = value;
        this.ammount = ammount;

    }
}