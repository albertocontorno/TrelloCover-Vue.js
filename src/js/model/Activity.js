//TODO CREATE ACTIVITIES ENUM (FROM DB!)
//CREATE COMMON ACTIVITIES FUNCTION FACTORIES

export class Activity{
    /**
     *Creates an instance of Activity.
     * @param {string} description
     * @param {Date} date
     * @param {string} user
     * @memberof Activity
     */
    constructor(description, date, user){
        this.description = description;
        this.date = date;
        this.user;
    }
}