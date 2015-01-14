$(document).ready(function() {
	//Add a todo
	$('#add-form').submit(function() {
		console.log("prout");
		var todoName = $('#todo-name').val();
		var todoDate = $('#todo-date').val();
		console.log(todoName);
		console.log(todoDate);

		//simplistic fields validation
		if (todoName === '') {
			alert("please add a name");
		} else if (todoDate === '') {
			alert("please add a date");
		} else {
			var todos = JSON.parse(localStorage.getItem('todos'));
			if (todos === null) {
				todos = [];
			}
			var newTodo = {
				"todo-name": todoName,
				"todo-date" : todoDate
			}

			todos.push(newTodo);
			localStorage.setItem('todos', JSON.stringify(todos));
		}
	});
});