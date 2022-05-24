let inputs = document.querySelectorAll("#username");
let im = new Inputmask({
	mask: "@*{0,32}",
	definitions: {
		"*": { validator: "[0-9A-Za-z_]" },
	},
});
im.mask(inputs);
