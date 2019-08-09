var instance = null;
export class ModalController{
    
    constructor(){
        this.isOpen = false;
        this.text = '';
        this.modal = null;
        instance = this;
    }

    static getInstance(){
        if (instance){
            return instance;
        } else {
            instance = new ModalController();
            return instance;
        }
    }

    setModal(modal){
        console.log(modal);
        this.modal = modal;
    }

    open(){
        this.isOpen = true;
        if(this.modal){
            this.modal.show();
        }
    }

    close(){
        this.isOpen = false;
        if (this.modal) {
            this.modal.hide();
        }
    }

    toggle(){
        this.isOpen = !this.isOpen;
    }

    setOpen( open ){
        this.isOpen = open;
    }

}