let validateForms = function (selector, rules, messages) {
	new window.JustValidate(selector, {
		rules: rules,
		messages: messages
	}, );
}

validateForms('.form-inner', {
	email: {
		required: true,
		email: true
	},
}, {
	email: {
		email: 'Введите корректную почту'
	}
})