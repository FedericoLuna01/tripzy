
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import styles from "./location-suggestions.module.css";

export default function LocationSuggestions({
  suggestions,
  value,
  onChange,
  onSuggestionClick,
}) {
  return (
    <div className={styles.suggestionsContainer}>
      <Combobox as="div" onChange={onSuggestionClick}>
        <ComboboxInput
          className={"input"}
          placeholder="Escribe una ubicación..."
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
        {suggestions.length > 0 && (
          <ComboboxOptions className={styles.options} transition>
            {suggestions.map((option) => (
              <ComboboxOption key={option.place_id} value={option}>
                {({ selected }) => (
                  <div
                    className={selected ? styles.optionActive : styles.option}
                  >
                    {option.description}
                  </div>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </Combobox>
    </div>
  );
}

