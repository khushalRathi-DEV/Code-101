import fs from "fs";
import path from "path";
import { Command } from "commander";
import chalk from "chalk";
 2 
const program = new Command();
const filePath = path.join(process.cwd(),"todos.json");


// function for reading the todos
function readTodos(){
  if(!fs.existsSync)
    return [];
  const data = fs.readFileSync(filePath,"utf-8");
  return JSON.parse(data);
}

//function for writing todos to the destination folder
function writeTodos(todos) {
  fs.writeFileSync(filePath,JSON.stringify(todos,null,2),"utf-8");
}

// Add a new todo
program
  .command("add <task>")
  .description("Add a new todo")
  .action((task) => {
    const todos=readTodos();
    todos.push({task,done:false });
    writeTodos(todos);
    console.log(chalk.green("Todo added successfully"));
  });

//Delete a todo
program
  .command("delete <index>")
  .description("Delete a todo by its index")
  .action((index) => {
    const todos = readTodos();
    if(index> 0 && index< todos.length())
    {
      todos.splice(index-1,1);
      writeTodos();
      console.log(chalk.red("Todo deleted successfully!"));
    }
    else
      console.log(chalk.yellow("Invalid index"));
  })

//mark a todo done

program
  .command("done <index>")
  .description("mark a todo as done")
  .action((index) => {
    const todos = readTodos();
    if(index> 0 && index< todos.length)
      {
        todos[index-1].done= true;
        writeTodos();
        console.log(chalk.red("Todo marked as done"));
      }
      else
        console.log(chalk.yellow("Invalid index"));

  })


  //list or view all the existing todos
program
  .command("list")
  .description("List/View all the todos")
  .action(() => {
    const todos = readTodos();
    if(todos.length===0)
      console.log(chalk.magenta("No todos found!!"));
    else  
    {
      todos.forEach((todo,index) => {
        const status = todo.done
        ? chalk.green("[Done]")
        : chalk.red("[Pending]");
      console.log(`${index+1} ${status} ${todo.task}`);
      });
    }
  });

  program.parse(process.argv);