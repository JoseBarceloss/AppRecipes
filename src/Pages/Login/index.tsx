import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input';
import { initialLoginValue } from '../../utils/initialLoginValue';
import { FormLoginType } from '../../types';
import Button from '../../Components/Button';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function Login() {
  const [formData, setFormData] = useState<FormLoginType>(initialLoginValue);
  const [email, setEmail] = useLocalStorage('user', '');
  const navigate = useNavigate();

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail({ email: formData.email });
    navigate('/meals');
  };

  const regexPassword = /^(.{7,})$/;
  const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
  const isValid = regexPassword.test(formData.password)
    && regexEmail.test(formData.email);

  return (
    <div className="login-container">
      <form onSubmit={ handleFormSubmit }>
        <Input
          data-testid="email-input"
          labelText="Email: "
          type="email"
          name="email"
          id="email"
          value={ formData.email }
          onChange={ handleFormChange }
          placeholder="Digite seu e-mail"
        />

        <Input
          data-testid="password-input"
          labelText="Senha: "
          type="password"
          name="password"
          id="password"
          value={ formData.password }
          placeholder="Digite sua senha"
          onChange={ handleFormChange }
        />

        <Button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ !isValid }
        >
          Entrar
        </Button>
      </form>
    </div>
  );
}

export default Login;
