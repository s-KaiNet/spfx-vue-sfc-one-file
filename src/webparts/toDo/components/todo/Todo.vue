<template>
    <div>
        <h1>{{message}}</h1>
        <div id="new-todo">
            <input type="text" @keyup.enter="addTodo" v-model="todoTitle" placeholder="what needs to be done?">
        </div>
        <ul>
            <todo-item v-for="(todo, index) in mytodos" :key="index + todo" :todoText="todo" v-on:completed="completed"></todo-item>
        </ul>        
    </div>
</template>

<script lang="ts">
import * as Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import TodoItem from '../todo-item/Todoitem.vue';
import { ITodoWebPartProps } from '../../ITodoWebPartProps';

@Component({
  components: {
    'todo-item': TodoItem
  }
})
export default class Todo extends Vue implements ITodoWebPartProps {
  @Prop
  public message: string;
  @Prop
  public todos: string[];

  public mytodos: string[] = this.todos;
  public todoTitle: string = '';

  public addTodo(): void {
    if(!this.todoTitle){
      return;
    }

    this.mytodos.push(this.todoTitle);
    this.todoTitle = '';
  }

  public completed(todo: string): void {
    const index: number = this.mytodos.indexOf(todo, 0);
    if (index > -1) {
      this.mytodos.splice(index, 1);
    }
  }
}
</script>
<style scoped lang="sass">
h1 {
    text-align: center;
    margin: 0;
    color: rgba(175, 47, 47, 0.15);
    font-size: 80px;
}

ul{
    list-style: none;
}

#new-todo {
    text-align: center;

    input {
        padding: 16px 16px 16px 16px;
        border: 1px solid #d6d4d4;
        width: 300px;
    }
}
</style>