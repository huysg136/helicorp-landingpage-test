import React from 'react';

interface ColorSwatchProps {
  colorHex: string;
  colorName: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  colorHex,
  colorName,
  isSelected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-10 rounded-full border-2 transition-all duration-300 relative focus:outline-none ${
        isSelected
          ? 'border-[#004ac6] dark:border-[#2563eb] scale-110'
          : 'border-transparent hover:scale-105'
      }`}
      title={colorName}
    >
      <span
        className="absolute inset-1 rounded-full shadow-inner"
        style={{ backgroundColor: colorHex }}
      />
    </button>
  );
};
