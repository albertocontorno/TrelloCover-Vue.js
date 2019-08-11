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
        //Save Label on server
        label.id = this.labels.values.length;
        this.labels.values.push(label);
        this.sortLabels('color');
        this.eventDispatcher.notify('add-label', label);
        /* this.db.collection('users').doc(uid.trim()).update({
            "boards": firebase.firestore.FieldValue.arrayUnion({id: nb.id, title: nb.title})
        }) */
        console.log("");
        this.update();
    }

    modifyLabel(index, text, color){
        //Save Label on server
        let label = this.labels.values[index];
        if(!label) return false;
        label.text = text;
        label.color = color;
        this.sortLabels('color');
        return true;
    }

    deleteLabel(index){
        //Save Label on server
        this.labels.values.splice(index, 1);
        this.update();
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