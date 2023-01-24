<template>
  <div class="todo-footer" v-show="total">
    <label>
      <input type="checkbox" v-model="isAll"/>
    </label>
    <span>
      <span>已完成{{doneTotal}}</span> / 全部{{todos.length}}
    </span>
    <button class="btn btn-danger" @click="removeAll" >清除已完成任务</button>
  </div>
</template>

<script>
export default {
    name:"MyFool",
    props:['todos'],
    computed:{
      //当前任务总数
      total(){
        return this.todos.length
      },
        //计算已完成的任务
      doneTotal(){
        //条件遍历
        const x=this.todos.reduce((pre,obj)=>{
            return pre + (obj.done ? 1 : 0 )
        },0)
        return x;
      },
      //是否完成全部任务
      isAll:{
        get(){
          return this.total===this.doneTotal && this.total>0
        },
        set(value){
          this.$emit('modifyAll',value)
        }
      }
    },
    methods:{
      // //e是dom对象
      // changeAll(e){
      //   this.modifyAll(e.target.checked)
      // }
      removeAll(){
        this.$emit('deleteAllTodo')
      }
    }
}
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}
.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}
.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}
.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>