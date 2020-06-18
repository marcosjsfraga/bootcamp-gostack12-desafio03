import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get('/repositories').then(response => {
			setRepositories(response.data);
		});
	}, []);

	async function handleAddRepository() {
		const response = await api.post('/repositories', {
			title: `Novo Repo ${Date.now()}`,
			url: "https://github.com/marcosjsfraga/ecoleta-backend",
			techs: ["ReajJS", "React Native"]
		});

		const repository = response.data;
		setRepositories([...repositories, repository]);
	}

	async function handleRemoveRepository(id) {
		await api.delete(`/repositories/${id}`);

		const repositoryIndex = repositories.findIndex(repository => repository.id === id);

		if (repositoryIndex >= 0) {
		  	const repoList = [...repositories];
		  	repoList.splice(repositoryIndex, 1);
		  	setRepositories(repoList);
		}		
	}

	return (
		<div>
			
			<ul data-testid="repository-list">
				{
					repositories.map(repository => 
						<li key={repository.id}>
							{repository.title}
							<button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
						</li> 
					)
				}
			</ul>
			
			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
