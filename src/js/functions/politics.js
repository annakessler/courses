function check() {
	var submit = document.getElementsByName('submit')[0];
	if (document.getElementById('politics').checked)
		submit.disabled = '';
	else
		submit.disabled = 'disabled';
}