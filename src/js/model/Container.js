import {Card} from './Card';

export class Container {

    /**
     * 
     * @param {string} id 
     * @param {Card[]} cards 
     * @param {title} title 
     */
    constructor(id, cards, title){
        this.id = id;
        this.cards = cards;
        this.title = title;
    }
}