import { Container } from './Container';
import {Label} from './Label';

export class Board{
    
    /**
     * 
     * @param {string} id 
     * @param {Container[]} containers
     * @param {Label[]} labels 
     * @param {string} owner 
     * @param {string} title 
     */
    constructor(id, owner, title, containers, labels, uid){
        this.id = id;
        this.lists = containers || [];
        this.labels = labels || [];
        this.owner = owner || '';
        this.title = title || '';
        this.members = [uid];
    }

}