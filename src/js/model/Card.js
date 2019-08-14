import {Label} from './Label';

export class Card {

    /**
     * 
     * @param {string} id
     * @param {string} text 
     * @param {Label} labels 
     * @param {string} cardInfo
     */
    constructor(id, text, labels){
        this.id = id;
        this.text = text;
        this.labels = labels;
        this.cardInfo = ''
    }

}