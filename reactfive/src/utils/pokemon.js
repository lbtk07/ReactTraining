export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
  // Promiseは2つの引数resolveとrejectを取る関数を受け取る
  // 処理が成功したらresolve、失敗したらrejectが呼び出される
    fetch(url)
    // fetchは指定されたURLからデータを取得するためのブラウザAPI
    // この関数もPromiseを返す
      .then((res) => res.json())
      // fetchが成功するとレスポンスresが返される.thenはjsonでのレスポンス形式に変換するために使われている
      .then((data) => resolve(data));
      // jsonに変換されたデータが取得されると.thenを使ってそれを受け取り、resolveに渡す
      // これによりPromiseが成功として解決される
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resolve(data);
      });
  });
};