import React, { useEffect, useState } from "react";

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [userNames, setUserNames] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleInputeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (inputValue.length === 0) {
        setUserNames([]);
        return;
      }
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?name_like=${inputValue}`
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
    fetchData();
  }, [inputValue]);

  useEffect(() => {
    if (inputValue.length > 0 && userNames.length > 0) {
      setSuggestions(userNames);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [inputValue, userNames]);

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
