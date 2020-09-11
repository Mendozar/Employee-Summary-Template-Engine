// Pull in the inquirer and fs node packages
const inquirer = require("inquirer");
const fs = require("fs");

// Pull in the Manager, Intern & Manager 
// .js files within the lib folder
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

// Initiate the CLI application to capture the team members.
async function start(){
    console.log("Tell us about your team:");

    // Initiate the the team page string url and team count.
    let teamHTML = "";
    let teamSize;

    // Store the size of the team.
    await inquirer.prompt(
        {
            type: "number",
            message: "How many people are in your team?",
            name: "noOfTeamMem"
        }
    )
    .then((data) => {
        teamSize = data.noOfTeamMem + 1;
    });
    
    // End program if there are no team members.
    if (teamSize === 0){
        console.log("Please come back when you have a team!");
        return;
    }
    
    // Ask the same questions for each team member.
    for(i = 1; i < teamSize; i++){

        let name;
        let id;
        let title;
        let email;

        await inquirer.prompt([ 
            {
                type: "input",
                message: `What is employee (${i})'s name?`,
                name: "name"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s id?`,
                name: "id"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s Email?`,
                name: "email"
            },
            {
                type: "list",
                message: `What is employee (${i})'s title?`,
                name: "title",
                choices: ["Engineer", "Intern", "Manager"]
            }
        ])

        // Store the responses.
        .then((data) => {
            name = data.name;
            id = data.id;
            title = data.title;
            email = data.email;
        });

        // Switch Case depending on the title of the employee
        switch (title){
            case "Manager":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Manager's Office Number?",
                        name: "officeNo"
                    }
                ]).then((data) => {
                    const manager = new Manager(name, id, email, data.officeNo);

                    // Reads and places HTML from manager.html in teamMember.
                    teamMember = fs.readFileSync("templates/manager.html");

                    // Append the the teamMember string to the teamHTML.
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;

            // Intern
            case "Intern":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What University is your Intern attending?",
                        name: "school"
                    }
                ]).then((data) => {
                    const intern = new Intern(name, id, email, data.school);
                    teamMember = fs.readFileSync("templates/intern.html");
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;

            // Engineer
            case "Engineer":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Engineer's GitHub?",
                        name: "github"
                    }
                ]).then((data) => {
                    const engineer = new Engineer(name, id, email, data.github);
                    teamMember = fs.readFileSync("templates/engineer.html");
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;
        }
    }

start();