const Employee = require("./Employee");

// Constructor class for Engineer

class Engineer extends Employee {
    constructor(name, id, email, github){

        super(name, id, email);

        this.github = github;
        
    }

    // Functions returning Engineer info

    getGithub(){
        return this.github;
    }
    getRole(){
        return "Engineer";
    }
}

module.exports = Engineer;