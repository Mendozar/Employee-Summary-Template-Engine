const Employee = require("./Employee");

// Constructor class for Intern

class Intern extends Employee {
    constructor(name, id, email, school){

        super(name, id, email);

        this.school = school;
        
    }

    // Functions returning Engineer info

    getSchool(){
        return this.school;
    }
    getRole(){
        return "Intern";
    }
}

module.exports = Intern;