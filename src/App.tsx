import { Button, Stack } from '@mui/material';
import MillieGif from './assets/millie.gif';
import { useState } from 'react';

const App: React.FC = () => {
  const [hidden, setHidden] = useState(true);
  const toggleHidden = () => setHidden((old) => !old);
  return (
    <Stack width={300} height={300}>
      <Button onClick={toggleHidden} variant="contained">
        {hidden ? "Where's Millie?" : "There's Millie!"}
      </Button>
      {!hidden && <img src={MillieGif} />}
    </Stack>
  );
};
export default App;
