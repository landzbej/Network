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

  test('toArray works', () => {
    expect(list.toArray()).toEqual(list.todos);
  })

  test('first works', () => {
    expect(list.first()).toBe(list.todos[0]);
  })

  test('last works', () => {
    expect(list.last()).toBe(list.pop());
  })

  test('shift works', () => {
    let newlist = list.todos.slice();
    expect(list.shift()).toBe(newlist[0]);
    expect(list).not.toEqual(newlist);
  })

  test('pop works', () => {
    let newlist = list.todos.slice();
    expect(list.pop()).toBe(newlist.slice().pop());
    expect(list).not.toBe(newlist);
  })

  test('isDone works', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  })

  test('add works', () => {
    let todo5 = 'buy food';
    expect(() => list.add(todo5)).toThrow();
  })

  test('itemAt', () => {
    expect(list.itemAt(0)).toBe(todo1);
    expect(() => list.itemAt(5)).toThrow();
  })

  test('markDoneAt', () => {
    list.markDoneAt(0);
    expect(list.todos[0].done).toBe(true);
    expect(() => list.markDoneAt(5)).toThrow();
  })

  test('markAllDone', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  })

  test('removeAt', () => {
    expect(list.removeAt(1)).toEqual([todo2])
    expect(() => list.removeAt(5)).toThrow();
  })

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
expect(list.toString()).toBe(string);
// });
// test('toString again', () => {
    
    list.markDoneAt(0);
    let string2 = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;
expect(list.toString()).toBe(string2);

list.markAllDone();
    let string3 = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
expect(list.toString()).toBe(string3);
  });
  
  test('forEach works', () => {
    let results = [];
    list.forEach(elem => results.push(elem));
    expect(list.todos).toEqual(results);
  });

  test('filter works', () => {
    list.markDoneAt(0);
    let results = list.todos.filter(elem => elem.done === true);
    expect(results).toEqual([todo1]);
  })
  // your tests go here
});