import { CountryOptions } from '../utils/types';
import { ChangeEventHandler, useRef, useState } from 'react';

const KEY_CODES = {
  DOWN: 40,
  UP: 38,
  PAGE_DOWN: 34,
  ESCAPE: 27,
  PAGE_UP: 33,
  ENTER: 13,
};

export default function useAutoComplete({
  source,
  onChange,
}: {
  source: (s: string) => CountryOptions[];
  onChange: (e: ChangeEventHandler<HTMLInputElement>) => void;
}) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [suggestions, setSuggestions] = useState<CountryOptions[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [textValue, setTextValue] = useState('');

  function selectOption(index: number) {
    if (index > -1) {
      onChange((e) => console.log(e.target.value));
      setTextValue(suggestions[index].label);
    }
    clearSuggestions();
  }

  function getSuggestions(searchTerm: string) {
    if (searchTerm && source) {
      const options = source(searchTerm);
      setSuggestions(options);
    }
  }

  function clearSuggestions() {
    setSuggestions([]);
    setSelectedIndex(-1);
  }

  function onTextChange(searchTerm: string) {
    setTextValue(searchTerm);
    clearSuggestions();
    getSuggestions(searchTerm);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const keyOperation = {
      [KEY_CODES.ENTER]: () => selectOption(selectedIndex),
      [KEY_CODES.ESCAPE]: clearSuggestions,
    };
    if (keyOperation[e.keyCode]) {
      keyOperation[e.keyCode]();
    } else {
      setSelectedIndex(-1);
    }
  }

  return {
    bindOption: {
      onClick: (e: React.MouseEvent<HTMLLIElement>) => {
        const nodes = Array.from(
          listRef.current ? listRef.current.children : []
        );
        const elem = (e.target as HTMLElement).closest('li');
        if (elem) selectOption(nodes.indexOf(elem));
      },
    },
    bindInput: {
      value: textValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        onTextChange((e.target as HTMLInputElement).value),
      onKeyDown,
    },
    bindOptions: {
      ref: listRef,
    },
    suggestions,
    selectedIndex,
  };
}
