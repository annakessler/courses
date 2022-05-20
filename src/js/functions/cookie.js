const cookieEl = document.querySelector(".cookie");
const okEl = document.querySelector(".cookie__accept");

okEl.addEventListener("click", () => {
	cookieEl.style.display = "none";
});

let cookies = () => {
	if (!Cookies.get("hide-cookie")) {
		setTimeout(() => {
			cookieEl.style.display = "block";
		}, 1000);
	}

	Cookies.set("hide-cookie", "true", {
		expires: 30,
	});
};

cookies();
