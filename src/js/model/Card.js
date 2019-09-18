import {Label} from './Label';
import {CardInfo}from './CardInfo';
export class Card {

    /**
     * 
     * @param {string} id
     * @param {string} text 
     * @param {Label} labels 
     * @param {CardInfo} cardInfo
     */
    constructor(id, text, labels, cardInfo){
        this.id = id;
        this.text = text;
        this.labels = labels;
        this.cardInfo = cardInfo;
    }

}