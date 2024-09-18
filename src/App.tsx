import { Button, Stack, Typography } from '@mui/material';
import MillieGif from './assets/millie.gif';
import { useState } from 'react';

const App: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const toggleHidden = () => setHidden((old) => !old);
  return (
    <Stack width={300} height={300}>
      <Typography>Millie</Typography>
      <Button onClick={toggleHidden} variant="contained">
        {hidden ? 'Hide' : 'Show'}
      </Button>
      {!hidden && <img src={MillieGif} />}
    </Stack>
  );
};
export default App;
