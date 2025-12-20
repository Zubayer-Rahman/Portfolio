import React, { useState } from 'react';
import './FloatingWidget.css';

const FloatingMenu = ({
  mainIcon = '➕',
  closeIcon = '✕',
  position = 'bottom-right',
  bgColor = '#007bff',
  items = [],
  direction = 'up', // up, down, left, right
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionStyles = {
    'bottom-right': { bottom: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
    'top-right': { top: '20px', right: '20px' },
    'top-left': { top: '20px', left: '20px' },
  };

  const getItemStyle = (index) => {
    const offset = (index + 1) * 60;
    const directions = {
      up: { bottom: offset, left: 0 },
      down: { top: offset, left: 0 },
      left: { right: offset, top: 0 },
      right: { left: offset, top: 0 },
    };
    return directions[direction];
  };

  return (
    <div 
      className="floating-menu-container" 
      style={positionStyles[position]}
    >
      {/* Menu Items */}
      <div className={`menu-items ${isOpen ? 'open' : ''}`}>
        {items.map((item, index) => (
          <button
            key={index}
            className="menu-item"
            onClick={() => {
              item.onClick?.();
              setIsOpen(false);
            }}
            style={{
              ...getItemStyle(index),
              backgroundColor: item.bgColor || '#6c757d',
              transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
            }}
            title={item.label}
          >
            <span>{item.icon}</span>
            {item.label && <span className="menu-label">{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Main Button */}
      <button
        className={`floating-button main-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: bgColor }}
      >
        <span className={`button-icon ${isOpen ? 'rotate' : ''}`}>
          {isOpen ? closeIcon : mainIcon}
        </span>
      </button>
    </div>
  );
};

export default FloatingMenu;