import { Component } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  showForm=false;
  editForm: boolean=false;
  searchTask="";
  resultTasks:Task[]=[]
  myTask:Task={
    label:'',
    completed:false
  }
  tasks:Task[]=[]; 
  constructor(private taskService: TasksService){}
  ngOnInit(){
    this.getTasks();
  } 
  getTasks(){
    this.taskService.findAll()
     .subscribe(tasks => 
      this.resultTasks=this.tasks=tasks);
   }
   deleteTask(id: any){
    this.taskService.delete(id)
    .subscribe(()=>{
      this.resultTasks=this.tasks.filter(task=> task.id!=id)
    });
   }
   persisteTask(){
    this.taskService.persist(this.myTask)
    .subscribe((task)=>{
      this.tasks=[task,...this.tasks];
      this.resetTask();
      
    });
    this.showForm=false;
   }
   resetTask(){
    this.myTask={
      label:'',
      completed:false

    }
   }
   thoggleCompleted(task:any){
    this.taskService.completed(task.id,task.completed)
    .subscribe(()=>{
      task.completed=!task.completed;
    });
   }

   editTask(task: any){
    this.myTask=task
    this.editForm=true
   }
   updateTask(){
    this.taskService.update(this.myTask)
    .subscribe(task=>{
      this.resetTask();
      this.editForm=false;
    });
   }
   searchTasks(){
    this.resultTasks=this.tasks.filter((task)=>task.label.toLowerCase().includes(this.searchTask.toLowerCase()));
   }
   
}
