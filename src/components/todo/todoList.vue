<template>
  <div>
    <div class="container">
      <br>
      <div class="row">
        <div class="col-12">
          <form class="form" v-on:submit="addTodo">
            <div class="d-flex">
              <input class="form-control mr-4 form-control-lg g-custom-rounded" type="text"
                     placeholder="Add things" v-model="inputVal">
              <button class="btn btn-primary g-custom-rounded"><i class="fas fa-plus-square"></i></button>
            </div>
          </form>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-8">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="radio" id="inlineRadio1" v-on:click="filterTodos('all')" checked>
            <label class="form-check-label" for="inlineRadio1">ALL</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="radio" id="inlineRadio2" v-on:click="filterTodos('completed')">
            <label class="form-check-label" for="inlineRadio2">Completed</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="radio" id="inlineRadio3" v-on:click="filterTodos('incomplete')">
            <label class="form-check-label" for="inlineRadio3">Incomplete</label>
          </div>

        </div>
        <div class="col-4">
          <div class="text-right">
            Completed tasks: {{ completedPercentage }}
          </div>
        </div>
      </div>
      <div class="row mt-4 mb-3">
        <div class="col-12">
          <button type="button" class="btn btn-danger g-custom-rounded" v-on:click="clearAll">Clear ALL</button>
        </div>

      </div>

      <div class="row mt-2">
        <div class="col-12">
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center"
                v-bind:class="{ completed: todo.completed }"
                v-bind:key="index"
                v-for="(todo, index) in filteredTodos">

            <span v-on:click="toggleTodo(todo)" v-bind:class="{ complete_todo: todo.completed }">
              {{ todo.text }}
            </span>

              <span class="badge btn-outline-danger" v-on:click="deleteTodo(index)">
              <i class="far fa-trash-alt fa-2x"></i>
            </span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>


</template>

<script>
  var STORAGE_KEY = 'bs-vue-todo-app-1234';
  var todoStorage = {
    fetch: function () {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    },
    save: function (todo) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todo));
    }
  };


  var filters = {
    all: function (todoList) {
      return todoList;
    },
    completed: function (todoList) {
      return todoList.filter(function (todo) {
        return todo.completed;
      });
    },
    incomplete: function (todoList) {
      return todoList.filter(function (todo) {
        return !todo.completed;
      });
    }
  };

  export default {
    name: "todoList",
    data: function () {
      return {
        inputVal: '',
        todoList: todoStorage.fetch(),
        visibility: 'all'
      }
    },
    watch: {
      todoList: {
        handler: function (todo) {
          todoStorage.save(todo);
        }
      }
    },
    computed: {
      filteredTodos: function () {
        return filters[this.visibility](this.todoList);
      },
      completedPercentage: function () {
        var per = (Math.floor((filters.completed(this.todoList).length / this.todoList.length) * 100));
        if (isNaN(per)) {
          per = 0;
        }
        return per + "%";
      },
    },
    methods: {
      addTodo: function (e) {
        e.preventDefault();

        if (this.inputVal) {
          this.todoList.push({
            text: this.inputVal,
            completed: false
          });
        }
        this.inputVal = '';
      },
      toggleTodo: function (todo) {
        todo.completed = !todo.completed;
      },
      filterTodos: function (filter) {
        this.visibility = filter;
      },
      deleteTodo: function (index) {
        this.todoList.splice(index, 1);
      },
      clearAll: function () {
        if (confirm('전체 삭제 하시겠습니까?')) {
          this.todoList = [];
        }
      }
    }
  };
</script>

<style scoped>
  .g-custom-rounded {
    border-radius: 1rem;
  }

  .complete_todo {
    text-decoration: line-through;
  }
</style>
