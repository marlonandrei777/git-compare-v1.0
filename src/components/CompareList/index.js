import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository } from './styles';

const  CompareList = ({ repositories, repositoryRemove, repositoryAtt }) => (
    <Container>
        { repositories.map(repository => (
            <Repository key={repository.id}>
                <header>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                    <strong>{repository.name}</strong>
                    <small>{repository.owner.login}</small>
                </header>

                <ul>
                    <li>
                        {repository.stargazers_count} <small>stars</small>
                    </li>
                    <li>
                        {repository.forks_count} <small>forks</small>
                    </li>
                    <li>
                        {repository.open_issues_count} <small>issues</small>
                    </li>
                    <li>
                        {repository.lastCommit} <small>last commit</small>
                    </li>
                </ul>

                <div>
                    <button onClick={() => repositoryAtt(repository.id)}>Update</button>
                    <button onClick={() => repositoryRemove(repository.id)}>Remove</button>
                </div>
            </Repository>
        ))}
    </Container>
);

CompareList.propTypes = {
    repositories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        owner: PropTypes.shape({
            login: PropTypes.string,
            avatar_url: PropTypes.string,
        }),
        stargazers_count: PropTypes.number,
        forks_count: PropTypes.number,
        open_issues_count: PropTypes.number,
        pushed_at: PropTypes.string,
    })).isRequired,
    repositoryRemove: PropTypes.func.isRequired,
    repositoryAtt: PropTypes.func.isRequired
}

export default CompareList;
