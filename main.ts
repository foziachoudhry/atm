#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";


//user Balance & Pin Code
let myBalance = 10000;
let myPin = 12345;

// print message
console.log(chalk.green("\n \tWellcome to Fozia`s ATM Machine\n"));

let pinCode = await inquirer.prompt([
	{
		name: "pin",
		type: "number",
		message: chalk.yellow("Enter your pin code:")
	}
])
if(pinCode.pin === myPin){
	console.log(chalk.blue("\nPin number is correct , Login Successfully!\n"));

	let optionsAns = await inquirer.prompt([
		{
			name: "option",
			type: "list",
			message: "Select an option:",
			choices : ["Withdraw Ammount","Balance Enquiry"]
		}
	])
	if(optionsAns.option === "Withdraw Ammount"){
		let withdrawAns = await inquirer.prompt([
			{
				name: "withdrawMethod",
				type: "list",
				message: "select a withdraw method:",
				choices: ["Fast Cash", "Enter Amount"]
			}
		])
		if(withdrawAns.withdrawMethod === "Fast Cash"){
			let fastCashAns = await inquirer.prompt([ 
				{
					name: "fastCash",
					type: "list",
					message: "select Amount:",
					choices: [500,1000,5000,10000,20000,]
				}
			])
			if(fastCashAns.fastCash > myBalance){
				console.log("Insufficient Balance");

			}
			else{
				myBalance -= fastCashAns.fastCash
				console.log(`${fastCashAns.fastCash} withdraw successfully`);
				console.log(`your Remaining Balance is: ${myBalance}`);
			}

		}
		else if(withdrawAns.withdrawMethod === "Enter Amount"){
			let amountDetection = await inquirer.prompt([
			{
				name: "amount",
				type: "number",
				message: "Enter the amount to withdraw :"
			}
		])
		if(amountDetection.amount > myBalance){
			console.log(chalk.red("Insufficient Balance"));
		}
		else{

			myBalance -= amountDetection.amount;
			console.log(`${amountDetection.amount} withdraw successfully`);
			console.log(`Your remaining Blance is: ${myBalance}` );
		}

		}
		
	}
	else if(optionsAns.option === "Balance Enquiry" ){
		console.log(`Your Account Balance is : ${myBalance}`);
		}

}
else{
	console.log(chalk.red("\nYour Pin is Incorrect, Try Again\n"));
}


