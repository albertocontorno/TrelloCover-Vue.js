export class CheckList{

    /**
     *Creates an instance of CheckList.
     * @param {string} title
     * @param {CheckListItem[]} items
     * @param {}
     * @memberof CheckList
     */
    constructor(title, items){
        this.title = title;
        this.items = items || [];
    }
}

export class CheckListItem{
    /**
     *Creates an instance of CheckListItem.
     * @param {string} text
     * @param {boolean} done
     * @memberof CheckListItem
     */
    constructor(text, done){
        this.text = text;
        this.done = done;
    }
}