<template>
<transition name="todo" appear>
    <li>
        <label>
            <input type="checkbox" :checked="todo.done" @change="modifyCheck(todo.id)"/>
            <span v-show="!todo.isEdit">{{todo.name}}</span>
            <input ref="editInput" @blur="saveEdit(todo,$event)" v-show="todo.isEdit" type="text" :value="todo.name"/>
        </label>
        <button class="btn btn-danger" @click="removeTodo(todo.id)">删除</button>
        <button v-show="!todo.isEdit" class="btn btn-edit" @click="editTodo(todo)">编辑</button>
  </li>
  </transition>
</template>

<script>
export default {
    name:"MyItem",
    props:['todo'],
    methods:{
      modifyCheck(id){
        //设置选中状态 调用事件总线的事件
        this.$bus.$emit('handleCheck',id)
      },
      //触发事件总线事件，删除todo
      removeTodo(id){
        this.$bus.$emit('deleteTodo',id);
      },
      editTodo(todo){
        if(Object.prototype.hasOwnProperty.call(todo, 'isEdit')){
          todo.isEdit=true
        }else{
          //如果当前todo不存在isEdit属性给当前todo添加属性
          this.$set(todo,'isEdit',true)
        }
        //点击编辑后获取焦点
        this.$nextTick(function(){
          //获取焦点
          this.$refs.editInput.focus()
        })
        
      },
      saveEdit(todo,e){
        if(!e.target.value.trim()){
          alert("输入不能为空")
        }else{
          todo.isEdit=false
          //触发事件，并把修改后的todo内容和id传递过去
          this.$bus.$emit('updateTodo',todo.id,e.target.value)
        }
        
      }
    }
}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
li label {
  float: left;
  cursor: pointer;
}
li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}
li button {
  float: right;
  display: none;
  margin-top: 3px;
}
li:before {
  content: initial;
}
li:last-child {
  border-bottom: none;
}
li:hover{
  background-color: #ddd;
}
li:hover button{
  display: block;
}
.todo-enter-active{
  animation: todo 0.5s linear;
}
.todo-leave-active{
  animation: todo 0.5s linear reverse;
}
@keyframes todo {
  from{
    transform: translateX(100%);
  }
  to{
    transform: translateX(0px);
  }
}
</style>