<template>
     <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- 给子组件传递函数 -->
        <my-header @addTodo="addTodo"/>
        <my-list :todos="todos"/>
        <my-fool :todos="todos" @modifyAll="modifyAll" @deleteAllTodo="deleteAllTodo"/>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader'
import MyList from './components/MyList'
import MyFool from './components/MyFool'

    export default {
        name:'App',
        components:{MyHeader,MyList,MyFool},
        data(){
          return {
            todos:JSON.parse(localStorage.getItem('todos')) || []
          }
        },
        methods:{
          addTodo(e){
            //给数组添加元素
            this.todos.unshift(e)            
          },
          //修改列表内元素选中状态函数
          handleCheck(id){
            this.todos.forEach(element => {
              if(element.id===id) element.done=!element.done
            });
          },
          //删除todo
          deleteTodo(id){
            this.todos = this.todos.filter(todo => {
              return todo.id!== id
            })
          },
          // 修改所有todo选中状态
          modifyAll(opt){
            this.todos.forEach((todo)=>{
              todo.done=opt
            })
          },
          // 清除所有已完成任务
          deleteAllTodo(){
            this.todos = this.todos.filter(todo => {
              //只保留未完成的
              return !todo.done
            })
          },
          //更新todo内容
          updateTodo(id,title){
            this.todos.forEach((todo)=>{
             if( todo.id===id){
                todo.name=title
             }
            })
          }
    },
    watch:{
      todos:{
        deep:true,
        handler(value){
          localStorage.setItem('todos',JSON.stringify(value))
        }
      }
    },
    mounted(){
      //给事件总线绑定事件
      this.$bus.$on('handleCheck',this.handleCheck)
      this.$bus.$on('deleteTodo',this.deleteTodo)
      this.$bus.$on('updateTodo',this.updateTodo)
    },
    //销毁app组件前取消注册事件
    beforeDestoy(){
      this.$bus.$off(['handleCheck','deleteTodo','updateTodo'])
    }
    }
</script>

<style>
/*base*/
body {
  background: #fff;
}
.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}
.btn-edit {
  color: #fff;
  background-color: lightgreen;
  border: 1px solid green;
  margin-right: 5px;
}
.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}
.btn-edit:hover {
  color: #fff;
  background-color: green;
}
.btn:focus {
  outline: none;
}
.btn-edit {
  background-color: skyblue;
  border: blue;
}
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>