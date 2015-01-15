var todoList = JSON.parse(localStorage.getItem('todos'));

$(document).ready(function() {
	//display existing todos
	var i = 0;
	if(localStorage.getItem('todos') != null) {
		$.each(todoList, function(key, value) {
			$('#todos').prepend('<li id="task-'+i+'"><a id="todo-link" href="#edit" data-todo-name ="'+value.todoName+'" data-todo-date="'+value.todoDate+'">'+value.todoName+'</a></li>');
			i++;
		});
		//Refresh
		$('#todos').listview('refresh');
	}

	//Add a todo
	$('#add-form').submit(function() {
		var todoName = $('#todo-name').val();
		var todoDate = $('#todo-date').val();

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
				"todoName": todoName,
				"todoDate" : todoDate
			}

			todos.push(newTodo);
			localStorage.setItem('todos', JSON.stringify(todos));
		}
	});

	//Delete all todos
	$('#clear-btn').click(function() {
		localStorage.clear();
	});
});