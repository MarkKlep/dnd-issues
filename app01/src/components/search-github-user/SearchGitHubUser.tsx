import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

const SearchGitHubUser = () => {
    const [githubData, setGithubData] = useState<any>({});
    const [githubUser, setGithubUser] = useState<string>('');

    const searchUser = (): void => {
        const url = `https://api.github.com/users/${githubUser}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setGithubData(data);
            })
            .catch(err => console.error(err));
    }

    const handleLoadGithubData = (): void => {
        setGithubData({});

        if (githubUser.trim().length) {
            searchUser();
        }
        setGithubUser('');
    }

    const handleUserAccount = (): void => {
        window.open(githubData.html_url, '_blank');
        //window.location.href = githubData.html_url;
    }

    return (
        <Stack direction='row' spacing={10} alignItems='center' color='black'>
            <TextField
                placeholder='Enter github username...'
                value={githubUser}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGithubUser(e.target.value)}
            />

            <Button
                sx={{ width: 100 }}
                variant='contained'
                onClick={handleLoadGithubData}
            >
                Search
            </Button>

            {githubData.login && (
                <>
                    <img src={githubData.avatar_url} alt='avatar' height='100' width='100' />
                    <p>Name: {githubData.name}</p>
                    {githubData.location && <p>Location: {githubData.location}</p>}
                    {githubData.company && <p>Company: {githubData.company}</p>}
                    {githubData.html_url && <p onClick={handleUserAccount}>Link: {githubData.html_url}</p>}
                </>
            )}
        </Stack>
    );
}

export default SearchGitHubUser;
