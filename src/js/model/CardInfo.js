import {Label} from './Label';
import {CheckList} from './CheckList';
import {Activity} from './Activity';

export class CardInfo{
    /**
     *Creates an instance of CardInfo.
     * @param {string[]} comments
     * @param {CheckList[]} checkLists
     * @param {string[]} members
     * @param {string} description
     * @param {Activity[]} activities
     * @param {Date} deadline
     * @param {string[]} attachments
     * @param {Label[]} labels
     * @param {string} id
     * @param {string} listId
     * @param {string} listTitle
     * @param {string[]} watchers
     * @param {boolean} archived
     * @memberof CardInfo
     */
    constructor(comments = [], checkLists = [], members = [], description = '', activities= [],
        deadline = null, attachments = [], labels = [], id  ='', listId  ='', listTitle = '', watchers = [], archived = false){
        this.comments = comments;
        this.checkLists = checkLists; 
        this.members = members;
        this.description = description;
        this.activities = activities;
        this.deadline = deadline;
        this.attachments = attachments;
        this.labels = labels;
        this.id = id;
        this.listId = listId;
        this.listTitle = listTitle;
        this.watchers = watchers;
        this.archived = archived;
    }
}