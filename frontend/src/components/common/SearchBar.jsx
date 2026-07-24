import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./styles/SearchBar.css";

const SearchBar = ({
  value,
  onChange,
  placeholder,
  loading,
  disabled,
  allowClear,
  onSearch,
  className,
}) => {
  const handleChange = (e) => {
    onChange?.(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onChange?.("");
    }

    if (e.key === "Enter") {
      onSearch?.(value);
    }
  };

  return (
    <Input
      size="large"
      className={`search-bar ${className}`}
      prefix={<SearchOutlined />}
      value={value}
      placeholder={placeholder}
      allowClear={allowClear}
      loading={loading}
      disabled={disabled}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPressEnter={() => onSearch?.(value)}
    />
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  allowClear: PropTypes.bool,
  onSearch: PropTypes.func,
  className: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: "Search...",
  loading: false,
  disabled: false,
  allowClear: true,
  onSearch: null,
  className: "",
};

export default SearchBar;