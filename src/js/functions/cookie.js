const cookieEl = document.querySelector(".cookie");
const okEl = document.querySelector(".cookie__accept");

okEl.addEventListener("click", () => {
	cookieEl.classList.remove("cookie--show");
});

let cookies = () => {
	if (!Cookies.get("hide-cookie")) {
		setTimeout(() => {
			cookieEl.classList.add("cookie--show");
		}, 1000);
	}

	Cookies.set("hide-cookie", "true", {
		expires: 30,
	});
};

cookies();
