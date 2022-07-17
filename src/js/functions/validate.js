let validateForms = function (selector, rules, messages) {
	new window.JustValidate(selector, {
		rules: rules,
		messages: messages,
		submitHandler: function (form, values, ajax) {
			ajax({
				url: "telegram.php",
				method: "POST",
				data: values,
				async: true,
				callback: function () {
					console.log("Заявка отправлена");
				},
			});
		},
	});
};

validateForms(
	".form-inner",
	{
		email: {
			required: true,
			email: true,
		},
	},
	{
		email: {
			email: "Введите корректную почту",
		},
	}
);
