export function loadImage(url) {
  return new Promise(res => {
    const image = new Image();
    image.addEventListener('load', () => {
      res(image);
    });
    image.src = url;
  });
}

export function loadLevel(name) {
  return fetch(`/levels/${name}.json`).then(res => res.json());
}
