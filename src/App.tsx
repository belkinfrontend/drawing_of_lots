import React from 'react';
import './App.css';
import { players } from './constants';
import { Player } from './types';
import { getRandomTeamNames } from './helpers';
import ControlledRadioButtonsGroup from './components/ControlledRadioButtonsGroup';
import TextField from '@mui/material/TextField/TextField';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Stack,
  Avatar,
  Chip,
  Box,
} from '@mui/material';

function App() {
  const [chosenPlayers, setChosenPlayers] = React.useState<Player[]>(players);
  const [inputValue, setInputValue] = React.useState('');

  const [team1, setTeam1] = React.useState<Player[]>([]);
  const [team2, setTeam2] = React.useState<Player[]>([]);
  const [team3, setTeam3] = React.useState<Player[]>([]);
  const [teamMode, setTeamMode] = React.useState('2');

  const teamNamesArray = getRandomTeamNames();

  const addPlayer = (event: SelectChangeEvent) => {
    const selectedPlayer = players.find(
      (player) => player.id === +event.target.value
    );

    if (chosenPlayers.find((player) => player.id === selectedPlayer?.id))
      return;
    if (selectedPlayer) {
      setChosenPlayers((prevState) => [...prevState, selectedPlayer]);
    }
    event.target.value = '';
  };

  const renderTeam = (team: Player[]) =>
    team.map((player) => (
      <Chip
        key={player.id}
        className="player"
        avatar={<Avatar alt="Natacha" src={player.avatar} />}
        label={`${player.isCapitan ? '👑' : ''} ${player.name}`}
        variant="outlined"
      />
    ));

  const removePlayer = (player: Player) => {
    setChosenPlayers(chosenPlayers.filter((p) => p.id !== player.id));
  };

  const randomTeamWithCapitanSorted = (randomTeam: Player[]) => {
    const randomIndexTeam = Math.floor(Math.random() * randomTeam.length);
    const randomPlayer = randomTeam[randomIndexTeam];
    const randomPlayers1WithCapitan = [
      ...randomTeam.slice(0, randomIndexTeam),
      { ...randomPlayer, isCapitan: true },
      ...randomTeam.slice(randomIndexTeam + 1),
    ];

    const randomPlayers1WithCapitanSorted = randomPlayers1WithCapitan.sort(
      (a, b) => (a.isCapitan ? -1 : 1) + (b.isCapitan ? 1 : -1)
    );

    return randomPlayers1WithCapitanSorted;
  };

  return (
    <main>
      <ControlledRadioButtonsGroup
        teamMode={teamMode}
        setTeamMode={setTeamMode}
      />

      <FormControl sx={{ m: 2, minWidth: '100%' }}>
        <InputLabel id="demo-controlled-open-select-label">Player</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          // open={open}
          // onClose={handleClose}
          // onOpen={handleOpen}
          value={''}
          label="addPlayer"
          onChange={addPlayer}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {players.map((player) => (
            <MenuItem key={player.id} value={player.id}>
              {player.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ my: 3 }}>
        <TextField
          id="outlined-controlled"
          label="Player's name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setChosenPlayers((prevState) => [
                ...prevState,
                {
                  id: Date.now(),
                  name: inputValue,
                  avatar: '',
                },
              ]);
              if (e.target instanceof HTMLInputElement) {
                e.target.value = '';
              }
            }
          }}
        />
      </Box>

      <div>
        {chosenPlayers.map((player) => (
          <Chip
            key={player.id}
            className="player"
            title="Click to remove"
            avatar={<Avatar alt="Natacha" src={player.avatar} />}
            label={player.name}
            variant="outlined"
            onClick={() => removePlayer(player)}
          />
        ))}
      </div>

      <Stack direction="row" spacing={2} sx={{ m: 3 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            const teams: Player[][] = [];
            for (let i = 0; i < Number(teamMode); i++) {
              teams.push([]);
            }
            const copyOfChosenPlayers = [...chosenPlayers].sort(
              () => 0.5 - Math.random()
            );
            let teamIndex = 0;
            copyOfChosenPlayers.forEach((player) => {
              teams[teamIndex % Number(teamMode)].push(player);
              teamIndex += 1;
            });
            setTeam1(randomTeamWithCapitanSorted(teams[0]));
            setTeam2(randomTeamWithCapitanSorted(teams[1]));
            if (teams.length === 3) {
              setTeam3(randomTeamWithCapitanSorted(teams[2]));
            }
          }}
        >
          Mix!
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setChosenPlayers([]);
            setTeam1([]);
            setTeam2([]);
            setTeam3([]);
          }}
        >
          Clear
        </Button>
      </Stack>
      {!!team1.length && (
        <div>
          <div>
            <p className="teamName">{teamNamesArray[0]}:</p>
            {renderTeam(team1)}
          </div>
          <hr />
          <div>
            <p className="teamName">{teamNamesArray[1]}:</p>
            {renderTeam(team2)}
          </div>
          <hr />
          {teamMode === '3' && (
            <div>
              <p className="teamName">{teamNamesArray[2]}:</p>
              {renderTeam(team3)}
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
