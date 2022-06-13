export class Document{
    public name: string;
    constructor(public id, name, public description, public url, public children?){
        this.name = name;
    }   
}