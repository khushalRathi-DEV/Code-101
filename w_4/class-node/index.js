// import chalk from 'chalk';

// console.log(chalk.blue("Hello World "));
// console.log(chalk.red("This is an error message!!"));
// console.log(chalk.green.underline("Error has been fixed"));
const fs=require('fs');
const { Command } = require('commander');
const program = new Command();

program
    .name('File related Cli')
    .description('CLI to do file based tasks')
    .version('0.8.0');

program.command('count_words')
    .description('Count the number of lines in a file')
    .argument('<file>','file to count')
    .action((file)=>{
      fs.readFile(file,'utf8',(err,data)=>{
        if(err){
          console.log(err);
        }
        else{
          const words=data.split(' ').length;
          console.log(`There are ${words} words in ${file}`);
        }
      })
    })

program.command('count_lines')
    .description('Count the number of lines in a file')
    .argument('<file>','file to count')
    .action((file)=>{
      fs.readFile(file,'utf8',(err,data)=>{
        if(err){
          console.log(err);
        }
        else{
          const lines=data.split('/n').length;
          console.log(`There are ${lines} words in ${file}`);
        }
      })
    })
program.parse();