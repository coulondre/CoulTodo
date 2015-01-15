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

	//Edit a todo
	$('#todos').on('click', '#todo-link', function() {
		localStorage.setItem('currentTodoName',$(this).data('todo-name'));
		localStorage.setItem('currentTodoDate',$(this).data('todo-date'));
	});

	$(document).on('pageshow','#edit',function(){
		var currentTodoName = localStorage.getItem('currentTodoName');
		var currentTodoDate = localStorage.getItem('currentTodoDate');
		$('#edit-form input[name=todo-name]',this).val(currentTodoName);
		$('#edit-form input[name=todo-date]',this).val(currentTodoDate);
	});

	//Delete all todos
	$('#clear-btn').click(function() {
		localStorage.clear();
	});

	//Delete a todo
	$('#edit-form').on('click', '#delete', function() {
		var currentTodoName = localStorage.getItem('currentTodoName');
		var currentTodoDate = localStorage.getItem('currentTodoDate');

		for(var i=0; i < todoList.length; i++){
			if(todoList[i].todoName == currentTodoName){
				todoList.splice(i,1);
			}
			localStorage.setItem('todos',JSON.stringify(todoList));
		}	
		//Close and go home
		$.mobile.changePage($('#home'),'pop');
	});

	$(document).on('pageshow','#home',function(){
		window.location.reload();
	});
});