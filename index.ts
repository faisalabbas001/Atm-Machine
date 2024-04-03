#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from "chalk";


    let myBalance=6000;
    let mypin=1234;
    
    console.log( chalk.blue(" \n \t Welcome to the ATM-Machine\n"));
    let continueATM = true;

    while (continueATM) {
        let pinAnswer=await inquirer.prompt([
            {
                name:"pin",
                type:"number",
                message: chalk.yellow("please enter your pin")
            }
        ]);

        if(pinAnswer.pin===mypin){
            console.log("pin is correct :Succesfully");
            
            let operationAns=await inquirer.prompt([
                {
                    name:"operation",
                    type:"list",
                    message: chalk.blue("Select any option "),
                    choices:["Withdraw Amount","check Balance", "Exit"]
                }
            ]);

            if(operationAns.operation === "Withdraw Amount"){
                
                let withdrawAns=await inquirer.prompt([{
                    name:"withdrawMethod",
                    type:"list",
                    message: chalk.blue("select a withdraw method"),
                    choices:["Fast Cash","Enter the Amount"]
                }]);

                if(withdrawAns.withdrawMethod === "Fast Cash"){
                    let fastCashAns=await inquirer.prompt([{
                        name:"fastCash",
                        type:"list",
                        message: chalk.blue("Select Amount"),
                        choices: ["1000","2000","5000","10000","20000"]
                    }]);

                    if(parseInt(fastCashAns.fastCash) > myBalance){
                        console.log( chalk.red("insufficient Balance !!"))
                    } else {
                        myBalance -= parseInt(fastCashAns.fastCash);
                        console.log( chalk.blue(" withdraw successfully ")+ chalk.yellow(fastCashAns.fastCash));
                        console.log( chalk.blue("your remaining balance is ")+ chalk.yellow(myBalance))
                    }
                } else if(withdrawAns.withdrawMethod === "Enter the Amount"){
                    let amountAns=await inquirer.prompt([
                        {
                            name:"amount",
                            type:"number",
                            message: chalk.blue("Enter the amount to withdraw")
                        }
                    ]);

                    if(amountAns.amount > myBalance){
                        console.log( chalk.red("insufficient Balance !!"))
                    } else {
                        myBalance -= amountAns.amount;
                        console.log(chalk.blue("withdraw succesfully")+ chalk.yellow(amountAns.amount));
                        console.log( chalk.blue("your remaining Balance is") + chalk.yellow(myBalance))
                    }
                }

            } else if(operationAns.operation === "check Balance"){
                console.log( chalk.green(`Welcome Your current Balance is ${myBalance}`));
            } else if (operationAns.operation === "Exit") {
                continueATM = false;
                break;
            }

            let continueAns = await inquirer.prompt([
                {
                    name: "continue",
                    type: "list",
                    message: chalk.blue("Do you want to perform another operation?"),
                    choices: ["Yes", "No"]
                }
            ]);

            if (continueAns.continue === "No") {
                continueATM = false;
                break;
            }
        } else {
            console.log( chalk.red("opps you enter the wrong pin code !! try Again "));
        }
    }

    console.log(chalk.blue("Thank you for using ATM! Goodbye."));

