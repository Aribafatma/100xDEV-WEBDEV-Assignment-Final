import React, { useState } from "react";

function PokemonCards() {
  const [category, setCategory] = useState("");
  const [count, setCount] = useState(0);
  const [cards, setCards] = useState([]);

  const fetchPokemons = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${category}`);
    const data = await res.json();

    // Get first N Pokémon from category
    const selected = data.pokemon.slice(0, count);

    // Fetch details for each Pokémon
    const details = await Promise.all(
      selected.map(async (p) => {
        const pokeRes = await fetch(p.pokemon.url);
        return await pokeRes.json();
      })
    );

    setCards(details);
  };

  return (
    <div>
      <h1>Pokémon Cards</h1>
      <input
        type="number"
        placeholder="Number of cards"
        onChange={(e) => setCount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category (fire, water, etc.)"
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={fetchPokemons}>Generate</button>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cards.map((pokemon) => (
          <div
            key={pokemon.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              width: "200px",
            }}
          >
            <h3>{pokemon.name}</h3>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width="100"
            />
            <p>Type: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
            <p>HP: {pokemon.stats[0].base_stat}</p>
            <p>Attack: {pokemon.stats[1].base_stat}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonCards;
