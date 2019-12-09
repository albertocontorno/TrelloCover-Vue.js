export class UsersService{

    constructor(db, db2){
        this.db = db;
        this.db2 = db2;
    }

    async searchUsers(searchString){
        let usersFound = await Promise.all([
            this.db2.ref('/users/').orderByChild("uid").startAt(searchString).endAt(searchString+'\uf8ff').once('value'),
            this.db2.ref('/users/').orderByChild("username").startAt(searchString).endAt(searchString+'\uf8ff').once('value'),
        ])
        let users = [];
        usersFound.forEach( res => {
            res.forEach( user =>{
                users.push(user.val())
            });
        });
        return users;
    }

    
    async getUsers(userIds){
       
        let userQueries = [];
        
        userIds.forEach( userId =>{
            userQueries.push(this.db2.ref('/users/'+userId).once('value'))
        });

        let usersFound = await Promise.all(userQueries)

        let users = [];
        usersFound.forEach( res => {
            users.push(res.val())
        });
        return users;
    }

    async getUser(userId){
        let userFound = await this.db2.ref('/users/'+userId).once('value')
        return userFound.val();
    }

}