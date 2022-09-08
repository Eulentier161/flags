import { countryMapping } from "../utils/countries";
import { Button, Container, LinearProgress, Typography } from "@mui/material";
import sample from "lodash.sample";
import samplesize from "lodash.samplesize";
import { useEffect, useState } from "react";

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
          Object.values(countryMapping).filter(
            (country) => country !== right[1]
          ),
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
          backgroundImage: `url("/flags/${current[0]}.svg")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "blur(20px) brightness(20%)",
          height: "100%",
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: -1
        }}
      ></div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={`/flags/${current[0]}.svg`} height={400} width={600} />
        <Typography sx={{ fontWeight: "bold" }}>Score: {score}</Typography>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1em",
            flexWrap: "wrap",
          }}
        >
          {options.map((option) => (
            <Button
              key={option}
              onClick={() => {
                option === current[1]
                  ? setScore(score + 1)
                  : setScore(score - 1);
              }}
              sx={{ margin: ".5em" }}
              variant="outlined"
            >
              {option}
            </Button>
          ))}
        </Container>
      </Container>
    </>
  );
}
