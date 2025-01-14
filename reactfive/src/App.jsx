import React, { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import "./App.css";

const App = () => {
  const initialURL = " https://pokeapi.co/api/v2/pokemon"
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
  // useEffectは関数の実行タイミングをReactのレンダリング後まで遅らせるhook
    const fetchPokemonData = async () => {
      // すべてのポケモンのデータを取得
      let res = await getAllPokemon(initialURL);

      // console.log(res);
      setNextURL(res.next);
      loadPokemon(res.results);
      // 各ポケモンの詳細データを取得
    };
    fetchPokemonData();
  },[]);

  const loadPokemon = async(data) => {
    let _pokemonData = await Promise.all(
      // Promise.allは、複数の非同期処理を並行して実行し、すべて完了するまで待つ。ここでは内部のdata.mapが返すすべてのプロセスが解決されるまで待ち、結果を_pokemonDataに格納する。
      // awaitキーワードを使うことで、すべての非同期処理が完了するまで処理を一時停止する
      data.map((pokemon) => {
      // dataはポケモンデータの配列
      // mapメソッドで各ポケモンに対して非同期関数getPokemonを呼び出す
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
    // 取得したポケモンデータを_pokemonDataとして状態に設定する
    // 外部で定義されたsetPokemonData関数を使って状態を更新する
  };
  console.log(pokemonData)

  const handlePrevPage = async() => {
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
  }
  const handleNextPage = async() => {
    let data = await getAllPokemon(nextURL);
    // nextURLは次のページのAPIエンドポイント
    await loadPokemon(data.results);
    // 取得したdata.resultsを使ってloadPokemon関数を呼び出す
    setNextURL(data.next);
    setPrevURL(data.previous);
    // data.next/previousで前後のページのURLを取得して、nextURL/prevURLステートに設定する
  }

  return(
    <>
      <Navbar />
      <div className= 'App'>
        <div className="pokemonCardContainer">
          {pokemonData.map((pokemon, i) => {
            return(
              <Card key={i} pokemon={pokemon} />
            );
          })}
        </div>
        <div className="btn">
          <button onClick={handlePrevPage}>前へ</button>
          <button onClick={handleNextPage}>次へ</button>
        </div>
      </div>
    </>
  );
}

export default App;

