import { AppBar, Button, Container, LinearProgress, Toolbar, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FlagIcon from '@mui/icons-material/Flag';
import sample from 'lodash.sample';
import samplesize from 'lodash.samplesize';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { countryMapping } from '../utils/countries';

export default function Home() {
  const [current, setCurrent] = useState<[string, string]>();
  const [options, setOptions] = useState<string[]>();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const right = sample(Object.entries(countryMapping))!;
    setCurrent(right);
    setOptions(
      [
        ...samplesize(
          Object.values(countryMapping).filter((country) => country !== right[1]),
          3
        )!,
        right[1],
      ].sort(() => Math.random() - 0.5)
    );
  }, [score]);

  if (!options || !current) return <LinearProgress />;
  return (
    <>
      <div
        style={{
          backgroundPosition: 'center',
          filter: 'blur(20px) brightness(20%)',
          height: '100%',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <Image alt='' src={`/flags/${current[0]}.svg`} layout='fill' objectFit='cover' />
      </div>
      <AppBar sx={{ marginBottom: '1em' }} position='relative' color='transparent'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link href='https://flagpedia.net' passHref>
            <Button color='inherit' variant='outlined' startIcon={<FlagIcon />}>
              Flags
            </Button>
          </Link>
          <Typography variant='h4' component='h1'>
            Flag Game
          </Typography>
          <Link href='https://github.com/Eulentier161/flags' passHref>
            <Button color='inherit' variant='outlined' startIcon={<GitHubIcon />}>
              GitHub
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Image alt='flag' src={`/flags/${current[0]}.svg`} height={400} width={600} />
        <Typography sx={{ fontWeight: 'bold' }}>Score: {score}</Typography>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1em',
            flexWrap: 'wrap',
          }}
        >
          {options.map((option) => (
            <Button
              color='inherit'
              key={option}
              onClick={() => {
                option === current[1] ? setScore(score + 1) : setScore(score - 1);
              }}
              sx={{ margin: '.5em' }}
              variant='outlined'
            >
              {option}
            </Button>
          ))}
        </Container>
      </Container>
    </>
  );
}
