import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            name: '',
            pass: ''
        };
    }

    goBack() {
        this.context.router.goBack();
    }

    handleSubmit() {
        const nameErrors = this.validateValue(this.state.name, {
            name: 'Имя',
            minLength: 4,
            maxLength: 20,
            pattern: /^[a-zA-Z0-9]+$/
        });

        const passErrors = this.validateValue(this.state.pass, {
            name: 'Пароль',
            minLength: 4,
            maxLength: 20,
            pattern: /^[a-zA-Z0-9]+$/
        });

        this.setState({ messages: nameErrors.concat(passErrors) });

        if (this.state.messages.length === 0) {
            console.log('Login with ' + this.state.name + ' : ' + this.state.pass);
        }
    }

    inputChange(event) {
        event.persist();

        const value = event.target.value;

        const options = {
            minLength: 4,
            maxLength: 20,
            pattern: /^[a-zA-Z0-9]+$/
        };

        if (event.target.id === 'nameInput') {
            this.setState({ name: value });
            options.name = 'Имя';
            const messages = this.validateValue(value, options);
            this.setState({
                messages: messages.concat(this.state.messages.filter(m => m.id !== options.name))
            });
        } else {
            this.setState({ pass: value });
            options.name = 'Пароль';
            const messages = this.validateValue(value, options);
            this.setState({
                messages: this.state.messages.filter(m => m.id !== options.name).concat(messages)
            });
        }
    }


    validateValue(value, options) {
        const messages = [];

        if (!value || value.length == 0) {
            messages.push('Заполните поле ' + options.name);
            if (!value) return messages.map(m => { return { id: options.name, message: m }});
        }

        if (options.minLength && value.length < options.minLength) {
            messages.push('Минимальная длина поля ' + options.name + ' : ' + options.minLength);
        }

        if (options.maxLength && value.maxLength > options.maxLength) {
            messages.push('Максимальная длина поля ' + options.name + ' : ' + options.maxLength);
        }

        if (options.pattern && !value.match(options.pattern)) {
            messages.push(options.name + ' содержит недопустимые символы');
        }

        return messages.map(m => { return { id: options.name, message: m } });
    }

    render() {
        const messages = this.state.messages.map(m => {
            return (
                <li>
                    <span className="sr-only">Error:</span>
                    {m.message}
                </li>
            )
        });

        return (
            <div id="login-form" className="overlay">
                <button type="button" className="close" onClick={this.goBack.bind(this)}>
                    <span>&times;</span>
                </button>
                <div className="content">
                    <form>
                        <h2>Вход в учетную запись</h2>

                        <ul className="alert alert-danger">{messages}</ul>

                        <label htmlFor="nameInput" className="sr-only">Имя</label>
                        <input className="form-control" type="text" id="nameInput" placeholder="Ваше имя"
                               required="true" autoFocus="true" pattern="[a-zA-Z0-9]+" minLength="4" maxLength="20"
                               onChange={this.inputChange.bind(this)}/>
                        <label htmlFor="passInput" className="sr-only">Пароль</label>
                        <input className="form-control" type="password" id="passInput" placeholder="Ваш пароль"
                               required="true" pattern="[a-zA-Z0-9]+" minLength="4" maxLength="20"
                               onChange={this.inputChange.bind(this)} />

                        <div style={{ textAlign: "left", marginBottom: "10px" }}>
                            <Link to="/signup">Нет учетной записи?</Link>
                        </div>

                        <button className="btn btn-lg btn-primary btn-block" type="submit"
                                onClick={this.handleSubmit.bind(this)}>
                            Войти
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    console.log(state);
    return state;
}

export default connect(mapStateToProps)(LoginForm)
