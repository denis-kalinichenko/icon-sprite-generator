const compileSprite = spriter => new Promise((resolve, reject) => {
  spriter.compile((error, result) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(result.symbol.sprite.contents.toString());
  });
});

module.exports = compileSprite;
