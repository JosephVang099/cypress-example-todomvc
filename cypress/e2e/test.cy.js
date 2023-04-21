describe('TodoModel', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('adds a todo', () => {
      cy.window().then(win => {
        const model = new win.app.TodoModel('todos-cypress')
        const initialTodos = model.todos
  
        model.addTodo('New Todo')
  
        expect(model.todos).to.have.lengthOf(initialTodos.length + 1)
        expect(model.todos[model.todos.length - 1].title).to.equal('New Todo')
      })
    })
  
    it('toggles all todos', () => {
      cy.window().then(win => {
        const model = new win.app.TodoModel('todos-cypress')
        model.addTodo('Todo 1')
        model.addTodo('Todo 2')
  
        model.toggleAll(true)
  
        expect(model.todos[0].completed).to.be.true
        expect(model.todos[1].completed).to.be.true
      })
    })
  

  
    it('destroys a todo', () => {
      cy.window().then(win => {
        const model = new win.app.TodoModel('todos-cypress')
        model.addTodo('Todo 1')
        model.addTodo('Todo 2')
        const todoToDestroy = model.todos[0]
  
        model.destroy(todoToDestroy)
  
        expect(model.todos).to.have.lengthOf(1)
        expect(model.todos[0].title).to.equal('Todo 2')
      })
    })
  
    it('saves a todo', () => {
      cy.window().then(win => {
        const model = new win.app.TodoModel('todos-cypress')
        model.addTodo('Todo 1')
        const todoToSave = model.todos[0]
  
        model.save(todoToSave, 'Updated Todo')
  
        expect(model.todos[0].title).to.equal('Updated Todo')
      })
    })
  
    it('clears completed todos', () => {
      cy.window().then(win => {
        const model = new win.app.TodoModel('todos-cypress')
        model.addTodo('Todo 1')
        model.addTodo('Todo 2')
        model.todos[0].completed = true
  
        model.clearCompleted()
  
        expect(model.todos).to.have.lengthOf(1)
        expect(model.todos[0].title).to.equal('Todo 2')
      })
    })
  })