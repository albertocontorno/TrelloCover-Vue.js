
export class Observable{
    constructor(events){
        this.subscribers = {};
        if(events){
            events.forEach(e => this.subscribers[e] = []);
        }
    }

    subscribe(event, fn){
        if(!this.subscribers[event]){
            console.warn(`Can't subscribe to event '${event}': not in the list of subscribable events`);
            return;
        }
        this.subscribers[event].push(fn);
        return new Subscription(this.subscribers[event].length-1, this.subscribers[event]);
    }

    notify(event, data){
        if(this.subscribers[event]){
            this.subscribers[event].forEach(fn => { fn(data); });
        }
    }
}

class Subscription{
    constructor(id, subscribers){
        this.id = id;
        this.subscribers = subscribers;
    }

    unsubscribe(){
        console.log('Unsubscribe from observable');
        this.subscribers.splice(this.id, 1);
    }
}