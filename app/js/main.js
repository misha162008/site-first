var myModule = (function(){
	//Инициализация модуля
	var init = function(){
		_setUpListners();
		//то что должно произойти сразу
	};

	//прослушивает события
	var _setUpListners = function(){
		//прослушка событий
		$('#bPopup_run').on('click', _showModale); // открыть модальное окно
		$('#form_add_project').on('submit', _addProject);//добавление проекта
		$('#form_add_oder').on('submit', _addProject);//добавление заказчика
		$('#form_for_enter').on('submit', _addProject);//форма входа
	};


	//работает с модальным окном
	var _showModale = function(e){
		console.log("Привет ");

		e.preventDefault();

		var divPopup = $('#add_project_bPopup'),
			form = divPopup.find('.form_add_project');
		divPopup.bPopup({
			speed:550,
			onClose: function(){
				form.find('.server-mes').text('').hide();
				form.find('.inputs_add_project, .text_add_project, .textarea_add_project, .input_name, .textarea_style, .input_chek').trigger('hideTooltip');
				form.find('.has-error').removeClass('has-error');
			}
		});
	};

	//добавляет проект
	var _addProject = function(e){
		console.log("привет от формы");
		e.preventDefault();

		var form = $(this),
			url = "add_project.php",
			myServerGiveMeAnAnswer = _ajaxForm(form, url);


		myServerGiveMeAnAnswer.done = (function(ans) {

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
		});
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
		data = form.serialize();

	console.log(data);

		var result = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		}).fail(function(ans) {
			console.log("error");
			form.find('.error-mes').text("ошибка сервера").show();
		});

		return result;
	};

	//Возвращаем объект (публичные методы)
	return{
		init: init
	};

})();

myModule.init();

window.qtp = myModule;























/*$(document).ready(function(){
		
		bPopup_run.onclick = function(){
		$("#add_project_bPopup").bPopup();
	};

	$('#name_add_project').qtip({
		 content:  {... },
		position:{
			my: 'center right',
			at: 'center left'
		}

	});
});
*/