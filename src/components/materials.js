export const MATERIALS = (function() {
  // settings

  const LIST_CHUNK_LENGTH = 20;
  const IMAGE_MIN_SIZE = 150;
  const IMAGE_MAX_SIZE = 300;
  const TYPES_COLORS = {
    fabric: [220, 50, 50],
    seam: [50, 220, 50],
    attachment: [50, 50, 220]
  };
  const TYPES = Object.keys(TYPES_COLORS);

  const materials = [];

  // utils

  const randomizeResponse = function(callback, res) {
    const delay = Math.random() * 200;
    setTimeout(() => {
      callback(res);
    }, delay);
  };

  const deepCopy = function(obj) {
    return JSON.parse(JSON.stringify(obj));
  };

  const getMaterialById = function(id) {
    for (let i = 0; i < materials.length; i++)
      if (materials[i].id === id) return materials[i];

    return null;
  };

  const pad = function(str, length, chr) {
    while (str.length < length) str = chr + str;

    return str;
  };

  const getMaterialImageSrc = function(width, height, color, name) {
    const canvas = document.createElementNS(
      'http://www.w3.org/1999/xhtml',
      'canvas'
    );
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');

    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `#${pad(color.toString(16), 6, '0')}`);
    gradient.addColorStop(
      1,
      `rgba(${(color >> 16 & 0xff).toString()}, ${(
        color >> 8 &
        0xff
      ).toString()}, ${(color & 0xff).toString()}, 0.8)`
    );

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = 'bold 14px Arial';
    context.fillStyle = '#FFFFFF';

    const metrics = context.measureText(name);
    context.fillText(
      name,
      (canvas.width - metrics.width) / 2,
      canvas.height / 2 + 6
    );

    return canvas.toDataURL('image/png');
  };

  const getMaterialColor = function(type) {
    const color = TYPES_COLORS[type].slice();
    color[0] += Math.round(Math.random() * 60) - 30;
    color[1] += Math.round(Math.random() * 60) - 30;
    color[2] += Math.round(Math.random() * 60) - 30;

    return (
      ((color[0] & 0xff) << 16) + ((color[1] & 0xff) << 8) + (color[2] & 0xff)
    );
  };

  // create materials

  const materialsTypesCount = {};
  TYPES.forEach(type => {
    materialsTypesCount[type] = 0;
  });

  const materialsCount = Math.ceil(Math.random() * 50) + 50;

  let type, name, width, height, color, imgSrc;
  for (let i = 0; i < materialsCount; i++) {
    type = TYPES[Math.floor(Math.random() * TYPES.length)];
    materialsTypesCount[type]++;

    name = `${type} #${materialsTypesCount[type]}`;

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

    getCount: function(callback) {
      randomizeResponse(callback, materials.length);
    },

    getList: function(startIndex, callback) {
      if (
        typeof startIndex !== 'number' ||
        startIndex < 0 ||
        startIndex >= materials.length
      )
        return [];

      const res = deepCopy(
        materials.slice(startIndex, startIndex + LIST_CHUNK_LENGTH)
      );

      randomizeResponse(callback, res);
    },

    // set

    setName: function(id, value, callback) {
      if (typeof value !== 'string' || !value) {
        randomizeResponse(callback, false);
        return;
      }

      const material = getMaterialById(id);
      if (!material) {
        randomizeResponse(callback, false);
        return;
      }

      material.name = value;
      material.imgSrc = getMaterialImageSrc(
        material.width,
        material.height,
        material.color,
        material.name
      );

      randomizeResponse(callback, true);
    },

    setSize: function(id, newWidth, newHeight, callback) {
      if (
        typeof newWidth !== 'number' ||
        newWidth <= 0 ||
        typeof newHeight !== 'number' ||
        newHeight <= 0
      ) {
        randomizeResponse(callback, false);
        return;
      }

      const material = getMaterialById(id);
      if (!material) {
        randomizeResponse(callback, false);
        return;
      }

      material.width = newWidth;
      material.height = newHeight;
      material.imgSrc = getMaterialImageSrc(
        material.width,
        material.height,
        material.color,
        material.name
      );

      randomizeResponse(callback, true);
    },

    setColor: function(id, value, callback) {
      if (typeof value !== 'number' || value < 0) {
        randomizeResponse(callback, false);
        return;
      }

      const material = getMaterialById(id);
      if (!material) {
        randomizeResponse(callback, false);
        return;
      }

      material.color = value;
      material.imgSrc = getMaterialImageSrc(
        material.width,
        material.height,
        material.color,
        material.name
      );

      randomizeResponse(callback, true);
    }
  };
})();
