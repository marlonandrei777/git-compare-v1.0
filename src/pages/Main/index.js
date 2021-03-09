import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import logo from '../../assets/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

export default class Main extends Component {

    state = {
        loading: false,
        repositoryError: false,
        repositoryInput: '', // peguei o valor digitado no input
        repositories: [],
    };

    handleAddRepository = async (e) => {
        e.preventDefault(); /* prevenir o comportamento padrão de um envio de formulário */

        this.setState({ loading: true });

        try {
            const { data:  repository } = await api.get(`/repos/${this.state.repositoryInput}`);

            repository.lastCommit = moment(repository.pushed_at).fromNow();

            this.setState({
                repositoryInput: '',
                repositories: [...this.state.repositories, repository],
                repositoryError: false,
            })
        } catch (error) {
            this.setState({ repositoryError: true })
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        return (
            <Container>
                <img src={logo} alt="Github Compare" />

                <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}> {/*  */}
                    <input
                        type="text"
                        placeholder="usuário/repositório"
                        value={this.state.repositoryInput}
                        onChange={ e => this.setState({ repositoryInput: e.target.value })} /* é basicamente o evento do js q é desparado toda vez q acontece uma alteração no inpute esse onchange retorna um evento*/
                    />
                    <button type="submit">{this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
                </Form>

                <CompareList repositories={this.state.repositories}/> {/* recebi como propriedade o this. (informações do state) */}
            </Container>
        );
    }
}
