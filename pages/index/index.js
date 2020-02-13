Page({
  data: {
    input: '',
    todos: [],
    count: 0,
    doneCount: 0,
    allCompleted: false,
  },

  save: function () {
    wx.setStorageSync('todo_list', this.data.todos)
  },

  load: function () {
    var todos = wx.getStorageSync('todo_list')
    if (todos) {
      var count = todos.length
      console.log(count)
      var doneCount = todos.filter(function (item) {
        return item.completed
      }).length
      
      this.setData({ todos: todos, count: count, doneCount: doneCount})
    }
  },

  onLoad: function () {
    this.load()
  },

  onShareAppMessage: function() {
    return {
      title: '一个简约的读书书籍清单todolist'
    }
  },

  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value })
  },

  addTodoHandle: function (e) {
    if (!this.data.input || !this.data.input.trim()) return
    var todos = this.data.todos
    todos.push({ name: this.data.input, completed: false })
    this.setData({
      input: '',
      todos: todos,
      count: this.data.count + 1
    })
    this.save()
  },

  toggleTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    todos[index].completed = !todos[index].completed
    this.setData({
      todos: todos,
      doneCount: this.data.doneCount + (todos[index].completed ? 1 : -1)
    })
    this.save()
  },

  removeTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    var remove = todos.splice(index, 1)[0]
    this.setData({
      todos: todos,
      doneCount: this.data.doneCount - (remove.completed ? 1 : 0),
      count: this.data.count - 1
    })
    this.save()
  }

})
