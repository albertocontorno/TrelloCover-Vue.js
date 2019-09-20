import {Card} from './Card';

export class Container {

    /**
     * 
     * @param {string} id 
     * @param {Card[]} cards 
     * @param {string} title 
     * @param {string} boardId;
     */
    constructor(id, cards, title, boardId){
        this.id = id;
        this.cards = cards;
        this.title = title;
        this.boardId = boardId;
    }
}