import React, { useState } from "react";

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [names, setUserNames] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleInputeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    fetchData();

    if (inputValue.length > 0 && names.length > 0) {
      const filteredNames: string[] = names.filter((name) =>
        name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredNames);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      const userNames: string[] = data.map(
        (user: { username: string }) => user.username
      );
      setUserNames(userNames);
    } catch (e) {
      console.log("ERROE: ", e);
    }
  };

  const handleSelect = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div>
      <h1>Autocomplete</h1>
      <input type="text" value={inputValue} onChange={handleInputeChange} />
      {showSuggestions && (
        <ul>
          {suggestions.map((suggestion: string, index: number) => (
            <li key={index} onClick={() => handleSelect(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
