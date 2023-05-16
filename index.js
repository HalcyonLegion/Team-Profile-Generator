const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

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