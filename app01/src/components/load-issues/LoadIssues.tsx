import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loadIssues } from '../../store/listsSlice';



const LoadIssues = () => {

    const [repoUrl, setRepoUrl] = useState<string>('');

    const [owner, setOwner] = useState<any>(null);
    const [repo, setRepo] = useState<string | null>('');

    const dispatch = useDispatch();

    const handleInputRepo = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRepoUrl(e.target.value);
    }

    const getOwner = async (owner: string) => {
        const ownerUrl = `https://api.github.com/users/${owner}`;
        const response = await fetch(ownerUrl);
        const ownerData = await response.json();

        setOwner(ownerData);
        console.log('ownerData', ownerData);
    }

    const handleLoadIssues = async () => {
        if (!repoUrl.trim().length) return;

        const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/');

        if (owner === null || repo === null) return;

        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;

        const response = await fetch(apiUrl);
        const fetchedIssues = await response.json();

        dispatch(loadIssues({ issues: fetchedIssues }));

        setRepo(repoUrl);
        setRepoUrl('');

        getOwner(owner);
    }

    const handleOwnerLink = (): void => {
        window.open(owner.html_url, '_blank');
    }

    const handleRepoLink = (): void => {
        window.open(repo!, '_blank');
    }

    return (
        <>
            <TextField
                placeholder='Enter repo URL'
                value={repoUrl}
                onChange={handleInputRepo}
            />

            {owner && <Button onClick={handleOwnerLink}> Link owner </Button>}
            {repo && <Button onClick={handleRepoLink}> Link repo </Button>}

            <Button
                variant='outlined'
                onClick={handleLoadIssues}
            >
                Load issues
            </Button>
        </>
    );
}

export default LoadIssues;