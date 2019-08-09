export class Subject{
    constructor(values, immediate = false){
        this.values = values;
        this.subscribers = [];
        this.immediate = immediate;
    }

    subscribe(fn){
        this.subscribers.push(fn);
        if (this.immediate) {
            return fn(this.values);
        }
    }

    notify(){
        this.subscribers.forEach( subFn => subFn(this.values) );
    }

    unsubscribe(fn){
        let index = this.subscribers.findIndex( subFn => subFn === fn );
        if (index > -1){
            this.subscribers.splice(index,1);
        }
    }
}