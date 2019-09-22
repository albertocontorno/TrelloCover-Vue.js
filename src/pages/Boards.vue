<template>
    <div class="row boards-row">
        <div class="col-xs-12 board-new">
            <Button v-if="!showNew" label=" New Board" class="board-new-btn" classes="success btn" @click="newBoard()">
                <font-awesome-icon icon="plus" class="icon-right"/>
            </Button>
            <div v-if="showNew" class="row center-xs">
                <div class="col-xs-12 col-sm-6 col-md-4">
                    Title<Input v-model="newTitle"/>
                    private <Input :iType="'checkbox'" v-model="newPrivate"/> 
                    <Button label="New Board" class="board-new-btn" classes="success btn" @click="newBoard(true)" :disabled="newTitle == ''"/>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-3 boards-col" v-for="board of userInfo.boards" :key="board.id">
            <div class=" board-el">
                <div class="board-el-title">{{board.title}}</div>
                <div class="row no-margin">
                    <div class="col-xs-12 col-sm-6 col-add-padding-tb">
                        <Button label="Open" class="w-100" classes="info btn" @click="openBoard(board.id)">
                            <font-awesome-icon icon="location-arrow"/>
                        </Button>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-add-padding-tb">
                        <Button label="Delete" class="w-100" classes="error btn" @click="deleteBoard(board.id)">
                            <font-awesome-icon icon="trash"/>
                        </Button>
                    </div>
                </div>
                <div class="row no-margin">
                    <div class="col-xs-12 col-sm-6 col-add-padding-tb">
                        <Button label="Options" class="w-100" classes="info btn" @click="optionsBoard(board.id)">
                            <font-awesome-icon icon="cogs"/>
                        </Button>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-add-padding-tb">
                        <Button label="Rename" class="w-100" classes="info btn" @click="renameBoard(board.id)">
                            <font-awesome-icon icon="pen"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '../components/Button';
import Input from '../components/Input';
import { Board } from '../js/model/Board';
export default {
    name: 'Boards',
    inject: ['authService', 'boardService', 'utilsService'],
    components:{
        Button,
        Input
    },
    data(){
        return {
            title: '',
            boards: [],
            userInfo: {},
            showNew: false,
            newTitle: '',
            newPrivate: false
        }
    },
    methods: {
        openBoard(id){
            this.$router.push('/board/'+id);
        },
        deleteBoard(id){
             console.log("deleteBoard ", id);
             this.boardService.deleteBoard(id, this.userInfo.boards, this.userInfo.uid);
        },
        optionsBoard(id){
             console.log("optionsBoard ", id);
        },
        renameBoard(id){
             console.log("renameBoard ", id);
        },
        newBoard(create = false){
            if(create){
                const id = this.utilsService.uuidv4();
                let newBoard = new Board(id, 'admin', this.newTitle, [], [], this.userInfo.uid);
                console.log("create a new board");
                this.boardService.createBoard(newBoard, this.userInfo.uid);
                this.userInfo.boards.push(newBoard);
            } else {
                console.log("show creation new board ");
            }
            this.showNew = !create;
        }
    },
    mounted(){
        console.log("USER IN BOARDS", this.authService.user);
        this.userInfo = this.authService.user.info;
    }
}
</script>

<style scoped>

.board-new{
    text-align: center;
}

.board-new-btn{
    font-size: 1.2em;
}

.boards-row{
    padding: 5px 20px;
}

.boards-col{
    padding: 10px;
}

.board-el{
    background: whitesmoke;
    box-shadow: #000000de 1px 1px 3px -1px;
    border-radius: 3px;
    padding: 5px;
    height: 100%;
}

.board-el-title{
    font-weight: bold;
    text-align: center;
    font-size: 1.3em;
    word-break: break-all;
    padding: 5px;
}
</style>