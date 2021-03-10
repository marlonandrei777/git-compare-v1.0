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

    async componentDidMount() {
        this.setState({ loading: true });
        this.setState({ loading: false, repositories: await this.getLocalRepositories() });
    }

    // peguei os dados armazenados no localStorage
    getLocalRepositories = async () => JSON.parse(await localStorage.getItem('@GitHubCompare:repositories')) || []

    handleAddRepository = async (e) => {

        e.preventDefault(); /* prevenir o comportamento padrão de um envio de formulário */

        this.setState({ loading: true });

        try {
            const { data:  repository } = await api.get(`/repos/${this.state.repositoryInput}`);

            repository.lastCommit = moment(repository.pushed_at).fromNow();

            const pos = this.state.repositories.filter(id => id.id === repository.id);
            if (pos.length === 0) {

                // armazenando array no local storage
                localStorage.setItem(
                    '@GitHubCompare:repositories',
                    JSON.stringify([repository, ...this.state.repositories])
                );

                this.setState({
                    repositoryInput: '',
                    repositories: [...this.state.repositories, repository],
                    repositoryError: false,
                })
            } else {
                this.setState({ repositoryAlready: true, repositoryError: true });
            }

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
