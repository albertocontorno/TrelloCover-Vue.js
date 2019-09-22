import {Subject} from '../Subject';
import {Observable} from '../Observable';
export class LabelService{
    constructor(db){
        this.labels = new Subject([], true);
        this.db = db;
        this.eventDispatcher = new Observable(['add-label', 'delete-label', 'edit-label', 'select-label']);
    }

    getLabels(){
        if(!this.labels.values){ return []; }
        return this.labels.values || [];
    }

    update(){
        this.labels.notify();
    }

    addLabel(label){
        label.id = this.labels.values.length;
        this.labels.values.push(label);
        this.sortLabels('color');
        this.eventDispatcher.notify('add-label', label);
        this.update();
        return true;
    }

    modifyLabel(index, text, color){
        let label = this.labels.values[index];
        if(!label) return false;
        label.text = text;
        label.color = color;
        this.sortLabels('color');
        this.eventDispatcher.notify('edit-label', label);
        this.update();
        return true;
    }

    deleteLabel(index){
        let deletedLabeld = this.labels.values.splice(index, 1)[0];
        this.eventDispatcher.notify('delete-label', deletedLabeld);
        this.update();
        return true;
    }

    sortLabels(attr){
        this.labels.values.sort( (a,b) => {
            if(a[attr] < b[attr]){
                return -1;
            } else {
                return 1;
            }
        });
    }

}