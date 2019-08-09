import {Subject} from '../Subject';

export class LabelService{
    constructor(db){
        this.labels = new Subject([], true);
        this.db = db;
    }

    loadLabels(force){
        let p = new Promise(
            function(resolve, err)   {
                setTimeout(() => {resolve( [
                    { id: 0, text: 'Label0', color: 'purple' }, { id: 1, text: 'Label1', color: 'green' },
                    { id: 2, text: 'Label2', color: 'gray' }, { id: 3, text: 'Label3', color: 'red' },
                    { id: 4, text: 'Label4', color: 'yellow' }, { id: 5, text: 'Label5', color: 'white' },
                    { id: 6, text: 'Label6', color: 'red' }, { id: 7, text: 'Label7', color: 'black' },
                    { id: 8, text: 'Label8', color: 'orange' }, { id: 9, text: 'Label9', color: 'blue' },
                ])}, 1000)
            }
        );
        
        return p.then(labels => {
            this.labels.values = labels; 
            this.sortLabels('color');
            this.labels.notify();
        });
    }

    getLabels(){
        if(!this.labels.values){ return []; }
        return this.labels.values || [];
    }

    update(){
        this.labels.notify();
    }

    addLabel(label){
        //Save Label on server 
        //add label to labels and notify (it will be reactive with firebase)
        label.id = this.labels.values.length;
        this.labels.values.push(label);
        this.sortLabels('color');
        this.labels.notify();
    }

    modifyLabel(index, text, color){
        let label = this.labels.values[index];
        if(!label) return false;
        label.text = text;
        label.color = color;
        this.sortLabels('color');
        return true;
    }

    deleteLabel(index){
        this.labels.values.splice(index, 1);
    }

    sortLabels(attr){
        console.log("SORT")
        this.labels.values.sort( (a,b) => {
            if(a[attr] < b[attr]){
                return -1;
            } else {
                return 1;
            }
        });
    }

}