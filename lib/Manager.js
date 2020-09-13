const Employee = require("./Employee");

// Constructor class for Employee

class Manager extends Employee {
    constructor(name, id, email, officeNo){

        super(name, id, email);

        this.officeNumber = officeNo;
        
    }

    // Functions returning Engineer info

    getOfficeNumber(){
        return this.officeNumber;
    }
    getRole(){
        return "Manager";
    }
}

module.exports = Manager;