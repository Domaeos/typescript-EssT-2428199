enum TodoStatus {
    Done = "done",
    InProgress = "in-progress",
    Todo = "todo"

}

interface TodoItem {
    id: number;
    title: string;
    completedOn?: Date;
    status: TodoStatus
}

const todoItem: TodoItem[] = [
    { id: 1, title: "Learn HTML", status: TodoStatus.Done, completedOn: new Date("2021-09-11") },
    { id: 2, title: "Learn TypeScript", status: TodoStatus.InProgress },
    { id: 3, title: "Write the best app in the world", status: TodoStatus.Todo },
]

function addTodoItem(todo: string): TodoItem {
    const id = getNextId(todoItem)

    const newTodo: TodoItem = {
        id,
        title: todo,
        status: TodoStatus.Todo,
    }

    todoItem.push(newTodo)

    return newTodo
}

function getNextId<T extends { id: number }>(items: T[]): number {
    return items.reduce((max, x) => x.id > max ? x.id : max, 0) + 1
}

const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app")

console.log(JSON.stringify(newTodo))
