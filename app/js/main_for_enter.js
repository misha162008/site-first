var myModule = (function(){
	//Инициализация модуля
	var init = function(){
		_setUpListners();
		//то что должно произойти сразу
	};

	//прослушивает события
	var _setUpListners = function(){
		//прослушка событий
		$('#form_for_enter').on('submit', _addProject);//форма входа
	};

	//добавляет проект
	var _addProject = function(e){
		console.log("привет от формы");
		if (e.preventDefault) { // если метод существует
		    e.preventDefault(); // то вызвать его
		} else { // иначе вариант IE8-:
		    e.returnValue = false;
		}

		var form = $(this),
			url = "add_enter.php",
			myServerGiveMeAnAnswer = _ajaxForm(form, url);
	};

	//универсальная функция которая может
		//1. проверить форму 
		//2. собрать данные формы
		//3. вернуть ответ сервера
		//для ее работы мы используем
		//@form - форма
		//@url - адресс php файла
	var _ajaxForm = function(form, url){
		if (!validation.validateForm(form)) return false;// Возвращает false, если не проходит валидацию
		data = form.serialize();  // что бы сервер понял строку

	console.log(data);

		var result = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,  // дата что отправляем на сервер, ans то что вернеся
		}).done(function(ans) {

			var successBox = form.find('.success-mes'),
				errorBox = form.find('.error-mes');

			console.log(ans);
			if(ans.status === 'Ok'){
				errorBox.hide();
				successBox.text(ans.text).show();
			}else{
				successBox.hide();
				errorBox.text(ans.text).show();
			}
		}).fail(function(ans) {
			console.log("error");
			form.find('.error-mes').text("ошибка сервера").show();
		});

		return result;
	};

	//Возвращаем объект (публичные методы)
	return {
		init: init
	};

})();

if ($('#form_for_enter').length > 0) {
	myModule.init();
	console.log('my Module');
}


