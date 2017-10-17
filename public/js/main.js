import Compositor from './Compositor.js';
import { loadLevel } from './loaders.js';
import { loadBackgroundSprites, loadMarioSprite } from './sprites.js';
import { createBackgroundLayer } from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprite, pos) {
  return function drawSpriteLayer(context) {
    for (let i = 0; i < 20; ++i) {
      sprite.draw('idle', context, pos.x + i * 16, pos.y);
    }
  };
}

Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1')
]).then(([mariosSprite, backgroundSprites, level]) => {
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
  comp.layers.push(backgroundLayer);

  const pos = {
    x: 64,
    y: 64
  };

  const spriteLayer = createSpriteLayer(mariosSprite, pos);
  comp.layers.push(spriteLayer);

  function update() {
    comp.draw(context);
    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }

  update();
});
