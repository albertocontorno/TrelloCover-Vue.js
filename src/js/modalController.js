export class ModalController{
    
    constructor(){
        this.isOpen = false;
        this.modal = null;
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

    toggle(data){
        this.isOpen = !this.isOpen;
        if (this.modal) {
            this.modal.toggle(data);
        }
    }

    setOpen( open ){
        this.isOpen = open;
    }

}