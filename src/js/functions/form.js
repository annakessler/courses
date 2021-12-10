	function change() {
		let telegram = document.querySelector(".form-telegram");
		telegram.value = "@";
	}

	function AtSign() {
		let nickname = document.querySelector(".form-telegram");
		let value = nickname.value;

		nickname.value = '@' + value;
	}