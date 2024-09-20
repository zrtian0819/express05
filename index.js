const express = require("express");
const { singers } = require("./singers.json");

console.log(singers);
const app = express();

app.get("/", (req, res) => {
	res.send("網站主頁");
});

app.get("/singer/:id.html", (req, res) => {
	const { id } = req.params;
	const result = singers.find((singer) => {
		if (singer.id == id) {
			return true;
		}
	});
	if (!result) {
		res.send("<h2>404 - 找不到歌手</h2>");
		return;
	}
	res.send(`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0"
		/>
		<title>歌手:${result.singer_name}</title>
		<style>
			img {
				width: 100%;
			}
		</style>
	</head>
	<body>
		<h1>${result.singer_name}</h1>
		<h3>${result.singer_id}</h3>
		<img
			src="${result.singer_img}"
			alt=""
		/>
	</body>
</html>
`);
});

app.get("/", (req, res) => {
	res.send("網站主頁");
});

app.all("*", (req, res) => {
	res.send("<h2>404 not found</h2>");
});

app.listen(3000, () => {
	console.log("running at http://localhost:3000");
});
