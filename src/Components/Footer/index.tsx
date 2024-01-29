import React from 'react';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      style={ {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#f2f2f2',
        textAlign: 'center',
        padding: '10px 0',
        zIndex: 999,
      } }
      data-testid="footer"
    >
      <a href="/drinks">
        <img
          src={ drinkIcon }
          alt="Drink"
          style={ { width: '30px', marginRight: '10px' } }
          data-testid="drinks-bottom-btn"
        />
      </a>
      <a href="/meals">
        <img
          src={ mealIcon }
          alt="Meal"
          style={ { width: '30px', marginRight: '10px' } }
          data-testid="meals-bottom-btn"
        />
      </a>
    </footer>
  );
}

export default Footer;
