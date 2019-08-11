export class Subject{
    constructor(values, immediate = false){
        this.values = values;
        this.subscribers = [];
        this.immediate = immediate;
    }

    subscribe(fn){
        this.subscribers.push(fn);
        if (this.immediate) {
            fn(this.values);
        }
        return new Subscription(this.subscribers.length-1, this.subscribers);
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

class Subscription{
    constructor(id, subscribers){
        this.id = id;
        this.subscribers = subscribers;
    }

    unsubscribe(){
        this.subscribers.splice(this.id, 1);
    }
}