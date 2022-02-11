import { Position } from "./position";

export class IComponent{
    _id?: number;
    name: string;
    description: string;
    picture: string;
    itemCode: string;
    barCode: string;
    productid: number;
    type: string;
    positions?: Position[]
    

   
   

}