import { ModalController } from "../modalController";

export class ModalsService{
    constructor(){
        this.modals = {};
        this.activeModal = '';
    }

    registerModal(name, modal){
        this.modals[name] = new ModalController();
        this.modals[name].setModal(modal);
        return this.modals[name];
    }

    unregisterModal(name){
        if (this.modals[name]){
            this.modals[name].close();
            this.modals[name].setModal(null);
            this.modals[name] = null;
        }
    }

    openModal(name, data){
        if(this.modals[name]){
            if (this.modals[this.activeModal]){
                this.modals[this.activeModal].close();
            }
            this.modals[name].open(data);
            this.activeModal = name;
        }
    }

    closeModal(name, data) {
        if (this.modals[name]) {
            this.activeModa = '';
            this.modals[name].close(data);
        }
    }

    toggleModal(name, data) {
        if (this.modals[name]) {
            this.modals[name].toggle(data);
        }
    }
}