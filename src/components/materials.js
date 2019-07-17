export var MATERIALS = (function (undefined) {

	// settings

	var LIST_CHUNK_LENGTH = 20;
	var IMAGE_MIN_SIZE = 150;
	var IMAGE_MAX_SIZE = 300;
	var TYPES_COLORS = {
		'fabric': [220, 50, 50],
		'seam': [50, 220, 50],
		'attachment': [50, 50, 220]
	};
	var TYPES = Object.keys(TYPES_COLORS);

	var materials = [];

	// utils

	var randomizeResponse = function (callback, res) {
		var delay = Math.random() * 200;
		setTimeout(function () {
			callback(res);
		}, delay);
	};

	var deepCopy = function (obj) {
		return JSON.parse(JSON.stringify(obj));
	};

	var getMaterialById = function (id) {
		for (var i = 0; i < materials.length; i++) {
			if (materials[i].id == id) {
				return materials[i];
			}
		}

		return null;
	};

	var pad = function (str, length, chr) {
		while (str.length < length) {
			str = chr + str;
		}
		return str;
	};

	var getMaterialImageSrc = function (width, height, color, name) {
		var canvas = document.createElementNS("http://www.w3.org/1999/xhtml","canvas");
		canvas.width = width;
		canvas.height = height;

		var context = canvas.getContext("2d");

		var gradient = context.createLinearGradient(0, 0, 0, height);
		gradient.addColorStop(0, "#" + pad(color.toString(16), 6, "0"));
		gradient.addColorStop(1, "rgba(" + (color >> 16 & 0xFF).toString() + ", " + (color >> 8 & 0xFF).toString() + ", " + (color & 0xFF).toString() + ", 0.8)" );

		context.fillStyle = gradient;
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.font = "bold 14px Arial";
		context.fillStyle = "#FFFFFF";

		var metrics = context.measureText(name);
		context.fillText(name, (canvas.width - metrics.width) / 2, canvas.height / 2 + 6);

		return canvas.toDataURL("image/png");
	};

	var getMaterialColor = function (type) {
		var color = TYPES_COLORS[type].slice();
		color[0] += Math.round(Math.random() * 60) - 30;
		color[1] += Math.round(Math.random() * 60) - 30;
		color[2] += Math.round(Math.random() * 60) - 30;

		return ((color[0] & 0xFF) << 16) + ((color[1] & 0xFF) << 8) + (color[2] & 0xFF);
	};

	// create materials

	var materialsTypesCount = {};
	TYPES.forEach(function (type) {
		materialsTypesCount[type] = 0;
	});

	var materialsCount = Math.ceil(Math.random() * 50) + 50;

	var type, name, width, height, color, imgSrc;
	for (var i = 0; i < materialsCount; i++) {
		type = TYPES[Math.floor(Math.random() * TYPES.length)];
		materialsTypesCount[type]++;

		name = type + " #" + materialsTypesCount[type];

		width = IMAGE_MIN_SIZE + Math.random() * (IMAGE_MAX_SIZE - IMAGE_MIN_SIZE);
		height = IMAGE_MIN_SIZE + Math.random() * (IMAGE_MAX_SIZE - IMAGE_MIN_SIZE);

		color = getMaterialColor(type);

		imgSrc = getMaterialImageSrc(width, height, color, name);

		materials.push({
			id: i,
			type: type,
			name: name,
			width: width,
			height: height,
			color: color,
			imgSrc: imgSrc
		});
	}

	// public API

	return {
		// get

		getCount: function (callback) {
			randomizeResponse(callback, materials.length);
		},

		getList: function (startIndex, callback) {
			if (typeof startIndex != "number" || startIndex < 0 || startIndex >= materials.length) {
				return [];
			}

			var res = deepCopy(materials.slice(startIndex, startIndex + LIST_CHUNK_LENGTH));

			randomizeResponse(callback, res);
		},

		// set

		setName: function (id, name, callback) {
			if (typeof name != "string" || !name) {
				randomizeResponse(callback, false);
				return;
			}

			var material = getMaterialById(id);
			if (!material) {
				randomizeResponse(callback, false);
				return;
			}

			material.name = name;
			material.imgSrc = getMaterialImageSrc(material.width, material.height, material.color, material.name);

			randomizeResponse(callback, true);
		},

		setSize: function (id, width, height, callback) {
			if (typeof width != "number" || width <= 0 || typeof height != "number" || height <= 0) {
				randomizeResponse(callback, false);
				return;
			}

			var material = getMaterialById(id);
			if (!material) {
				randomizeResponse(callback, false);
				return;
			}

			material.width = width;
			material.height = height;
			material.imgSrc = getMaterialImageSrc(material.width, material.height, material.color, material.name);

			randomizeResponse(callback, true);
		},

		setColor: function (id, color, callback) {
			if (typeof color != "number" || color < 0) {
				randomizeResponse(callback, false);
				return;
			}

			var material = getMaterialById(id);
			if (!material) {
				randomizeResponse(callback, false);
				return;
			}

			material.color = color;
			material.imgSrc = getMaterialImageSrc(material.width, material.height, material.color, material.name);

			randomizeResponse(callback, true);
		}
	};

})();
