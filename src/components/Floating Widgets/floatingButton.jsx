import React, { useState } from 'react';
import './FloatingWidget.css';

const FloatingButton = ({
  icon = '💬',
  closeIcon = '✕',
  position = 'bottom-right',
  size = 60,
  bgColor = '#007bff',
  hoverColor = '#0056b3',
  textColor = '#ffffff',
  tooltip = '',
  onClick,
  children,
  pulse = true,
  badge = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (children) {
      setIsOpen(!isOpen);
    }
    onClick?.();
  };

  const positionStyles = {
    'bottom-right': { bottom: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
    'top-right': { top: '20px', right: '20px' },
    'top-left': { top: '20px', left: '20px' },
  };

  return (
    <div 
      className="floating-container" 
      style={positionStyles[position]}
    >
      {/* Expandable Content */}
      {children && (
        <div className={`floating-content ${isOpen ? 'open' : ''}`}>
          {children}
        </div>
      )}

      {/* Main Floating Button */}
      <button
        className={`floating-button ${pulse && !isOpen ? 'pulse' : ''}`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: size,
          height: size,
          backgroundColor: isHovered ? hoverColor : bgColor,
          color: textColor,
          fontSize: size * 0.4,
        }}
        aria-label={tooltip}
      >
        <span className={`button-icon ${isOpen ? 'rotate' : ''}`}>
          {isOpen ? closeIcon : icon}
        </span>

        {/* Badge */}
        {badge && !isOpen && (
          <span className="floating-badge">{badge}</span>
        )}

        {/* Tooltip */}
        {tooltip && !isOpen && (
          <span className="floating-tooltip">{tooltip}</span>
        )}
      </button>
    </div>
  );
};

export default FloatingButton;