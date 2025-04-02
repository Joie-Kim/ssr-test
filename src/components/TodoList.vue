<template>
  <div class="todo-container">
    <h1>할 일 목록</h1>
    <div class="todo-input">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="새로운 할 일을 입력하세요"
        type="text"
      />
      <button @click="addTodo">추가</button>
    </div>
    <ul class="todo-list">
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <input type="checkbox" v-model="todo.completed" />
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)" class="delete-btn">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newTodo = ref('');
const todos = ref([]);

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value,
      completed: false,
    });
    newTodo.value = '';
  }
};

const removeTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};
</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.todo-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  gap: 10px;
}

.todo-list li.completed span {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  background-color: #f44336;
  margin-left: auto;
}

.delete-btn:hover {
  background-color: #da190b;
}
</style>
