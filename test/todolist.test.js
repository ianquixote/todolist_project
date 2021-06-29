const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first todo item', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last returns the last todo item', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('the shift method removes and returns the first item in the list.', () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.todos).toEqual([todo2, todo3]);
  });

  test('pop() removes last item in list and returns it', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.todos).toEqual([todo1, todo2]);
  });

  test('isDone() returns true when all items in the list are done, false otherwise', () => {
    expect(list.isDone()).toBe(false);
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();
    expect(list.isDone()).toBe(true);
  });

  test("TypeError occurs when attempting to add an item to the list that isn't a Todo object", () => {
    expect(() => list.add(3)).toThrow(TypeError);
    expect(() => list.add('hi')).toThrow(TypeError);
    expect(() => list.add([1, 2, 3])).toThrow(TypeError);
    expect(() => list.add(new Todo('Eat lunch'))).not.toThrow(TypeError);
  });

  test('itemAt() returns item at specified index in list and should raise ReferenceError if we specify an index with no element', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(1)).toEqual(todo2);
    expect(list.itemAt(2)).toEqual(todo3);
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
  });

  test('markDoneAt() sets the done property of an item to true and raises ReferenceError if index is invalid', () => {
    expect(() => list.markDoneAt(6)).toThrow(ReferenceError);

    list.markDoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
  });

  test('markUndoneAt() marks todo at given index not done', () => {
    expect(() => list.markUndoneAt(6)).toThrow(ReferenceError);

    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    list.markUndoneAt(0);
    expect(todo1.isDone()).toBe(false);
  });

  test('markAllDone() marks all todos as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('removeAt() removes a todo at a specified index', () => {
    expect(() => list.removeAt(6)).toThrow(ReferenceError);

    list.removeAt(1);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    todo1.markDone();
    expect(list.toString()).toBe(string);
  });

  test('toString returns string representation of the list when all todos are done', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();
    expect(list.toString()).toBe(string);
  });


  test('forEach() iterates over each item in the list', () => {
    list.forEach(item => item.markDone());
    expect(list.isDone()).toBe(true);
  });

  test('filter() returns a new todo list object with all the items that cause a callback to return true', () => {
    todo1.markDone();
    let newList = list.filter(item => item.isDone());

    expect(newList.toArray()).toEqual([todo1]);
    expect(newList instanceof TodoList).toBe(true);
  });

  test('markDone() marks an item with the passed in title as done', () => {
    list.markDone('Buy milk');
    expect(todo1.isDone()).toBe(true);
  });
});
