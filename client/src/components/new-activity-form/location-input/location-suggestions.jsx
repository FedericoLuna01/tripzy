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
  setValue,
}) {
  return (
    <div className={styles.suggestionsContainer}>
      <Combobox
        value={value}
        as="div"
        onChange={(value) => setValue(value.description)}
      >
        <ComboboxInput
          className={"input"}
          placeholder="Escribe una ubicación..."
          value={value}
          onChange={onChange}
        />
        <ComboboxOptions className={styles.options} transition>
          {suggestions.map((option) => (
            <ComboboxOption key={option.description} value={option}>
              {({ selected }) => (
                <div className={selected ? styles.optionActive : styles.option}>
                  {option.description}
                </div>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
