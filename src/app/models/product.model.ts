export class Product {
    id: string;
    name: string;
    description: string;
    value: number;
    ammount?: number;

    constructor(id, name, description, value, ammount?) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.value = value;
        this.ammount = ammount;

    }
}