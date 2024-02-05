import { Link } from 'react-router-dom';
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
      <div>
        <Link to="/drinks">
          <img
            src={ drinkIcon }
            alt="Drink icon"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/meals">
          <img
            src={ mealIcon }
            alt="drink icon"
            data-testid="meals-bottom-btn"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
