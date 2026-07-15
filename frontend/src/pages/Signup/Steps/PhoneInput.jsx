import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { countries } from "./countryCode";

function toFlagEmoji(iso) {
  return iso
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

function parseValue(value, defaultIso) {
  const fallback =
    countries.find((c) => c.iso === defaultIso) || countries[0];

  if (!value) {
    return { country: fallback, local: "" };
  }

  const match = [...countries]
    .sort((a, b) => b.dialCode.length - a.dialCode.length)
    .find((c) => value.startsWith(c.dialCode));

  if (match) {
    return {
      country: match,
      local: value.slice(match.dialCode.length).replace(/\D/g, ""),
    };
  }

  return { country: fallback, local: value.replace(/\D/g, "") };
}

export default function PhoneInput({
  value,
  onChange,
  defaultIso = "IN",
}) {
  const initial = parseValue(value, defaultIso);

  const [country, setCountry] = useState(initial.country);
  const [localNumber, setLocalNumber] = useState(initial.local);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const emitChange = (nextCountry, digits) => {
    onChange(digits ? `${nextCountry.dialCode} ${digits}` : "");
  };

  const handleCountrySelect = (c) => {
    setCountry(c);
    setOpen(false);
    setSearch("");
    emitChange(c, localNumber);
  };

  const handleNumberChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 14);
    setLocalNumber(digits);
    emitChange(country, digits);
  };

  const filtered = countries.filter((c) =>
    `${c.name} ${c.dialCode}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="phone-input" ref={wrapperRef}>
      <div className="phone-input-field">
        <button
          type="button"
          className="phone-country-btn"
          onClick={() => setOpen((o) => !o)}
          aria-label="Choose country code"
        >
          <span className="phone-flag">{toFlagEmoji(country.iso)}</span>
          <span className="phone-dial">{country.dialCode}</span>
          <FaChevronDown className="phone-chevron" />
        </button>

        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          className="phone-number-input"
          placeholder="98765 43210"
          value={localNumber}
          onChange={handleNumberChange}
        />
      </div>

      {open && (
        <div className="phone-dropdown">
          <input
            type="text"
            className="phone-search"
            placeholder="Search country or code"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />

          <div className="phone-options">
            {filtered.map((c) => (
              <button
                type="button"
                key={c.iso}
                className={`phone-option ${
                  c.iso === country.iso ? "active" : ""
                }`}
                onClick={() => handleCountrySelect(c)}
              >
                <span className="phone-flag">{toFlagEmoji(c.iso)}</span>
                <span className="phone-option-name">{c.name}</span>
                <span className="phone-option-dial">{c.dialCode}</span>
              </button>
            ))}

            {filtered.length === 0 && (
              <div className="phone-no-results">No matches</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}