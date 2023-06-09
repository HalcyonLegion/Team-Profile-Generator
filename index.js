const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Create an array to store team members' info
const team = [];

//There will be common questions for each member

const commonQuestions = [
    {
      type: 'input',
      name: 'name',
      message: 'Enter name:',
    },
    {
      type: 'input',
      name: 'id',
      message: 'Enter ID:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter email:',
    },
  ];

  // Manager specific question for Office Number:
  const managerQuestions = [
    ...commonQuestions,
    {
      type: 'input',
      name: 'officeNumber',
      message: 'Enter office number:',
    },
  ];

  // Engineer specific question for the Github Username
  const engineerQuestions = [
    ...commonQuestions,
    {
      type: 'input',
      name: 'github',
      message: 'Enter GitHub username:',
    },
  ];

  // Intern specific question for their School
  const internQuestions = [
    ...commonQuestions,
    {
      type: 'input',
      name: 'school',
      message: 'Enter school:',
    },
  ];

  // Need to add a prompt to get the application to ask me who I want to add after the Manager.

  const addEmployee = async () => {
    const { role } = await inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: 'Which kind of team member would you like to add?',
        choices: ['Engineer', 'Intern', 'Finish building my team'],
      },
    ]);

    // Need space here to finish fleshing out this function

    // This should end the process and let uss know it has been created
    if (role === 'Finish building my team') {
        const generatedHTML = render(team);
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        fs.writeFileSync(outputPath, generatedHTML, 'utf-8');
        console.log('Team profile page has been successfully created!');
        return;
      }
    
      // Logic for when engineer is and isn't selected
      const questions = role === 'Engineer' ? engineerQuestions : internQuestions;
      const answers = await inquirer.prompt(questions);
      
      const employeeType = {
        Engineer: Engineer,
        Intern: Intern
      };
    
      team.push(new employeeType[role](answers.name, answers.id, answers.email, role === 'Engineer' ? answers.github : answers.school));
    
      // Repeat the process until 'Finish building my team' is selected
      addEmployee();
    };

// When the app is fired up it needs to ask about the Manager first.

const initApp = async () => {
    const managerAnswers = await inquirer.prompt(managerQuestions);
    const manager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber);
    team.push(manager);
    addEmployee();
  };
  
  initApp();