import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Trail, Float, Line, Sphere, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Box from "@mui/material/Box";
import sound from "../blipper.mp3";
import "./loadstyles.css";

const audio = new Audio(sound);

const start = async () => {
  await audio.play();
  navigator.vibrate(38);
};

// NEW DESIGN

function Animated() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10] }}>
      <color args={["#d3d3d3"]} />
      <Float speed={5} rotationIntensity={3} floatIntensity={1}>
        <Atom />
      </Float>
      {/* <Stars saturation={0.5} count={10} speed={5.5} /> */}
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={0.1} />
      </EffectComposer>
    </Canvas>
  );
}

function Atom(props) {
  const points = useMemo(
    () =>
      new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(
        100
      ),
    []
  );
  return (
    <group {...props}>
      <Line worldUnits points={points} color={[2, 1.5, 2]} lineWidth={0.1} />
      <Line
        worldUnits
        points={points}
        color={[2, 1.5, 2]}
        lineWidth={0.1}
        rotation={[0, 0, 1]}
      />
      <Line
        worldUnits
        points={points}
        color={[2, 1.5, 2]}
        lineWidth={0.1}
        rotation={[0, 0, -1]}
      />
      <Electron position={[0, 0, 0.5]} speed={6} />
      <Electron
        position={[0, 0, 0.5]}
        rotation={[0, 0, Math.PI / 3]}
        speed={6.5}
      />
      <Electron
        position={[0, 0, 0.5]}
        rotation={[0, 0, -Math.PI / 3]}
        speed={7}
      />
      <Sphere dpr={[1, 2]} lineWidth={0.1} args={[0.55, 64, 64]}>
        <meshBasicMaterial color={[6, 0.5, 2]} toneMapped={false} />
      </Sphere>
    </group>
  );
}

function Electron({ radius = 2.75, speed = 11, ...props }) {
  const ref = useRef();
  useFrame(state => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.set(
      Math.sin(t) * radius,
      (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
      0
    );
  });
  return (
    <group {...props}>
      <Trail
        local
        width={0}
        length={6}
        color={new THREE.Color(2, 1, 10)}
        attenuation={t => t * t}
      >
        <mesh ref={ref}>
          <sphereGeometry args={[0.25]} />
          <meshBasicMaterial color={[22, 1, 22]} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
}

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
      <Backdrop
        sx={{
          color: "#d3d3d3",
          backdropFilter: "blur(15px)",
          zIndex: theme => theme.zIndex.drawer + 1
        }}
        open={open}
      >
        {/* <Card sx={{ maxWidth: 345 }}>

          <div style={{}} id="bars3">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <img
            src="https://www.ysraarogyasri.ap.gov.in/documents/d/guest/logo1"
            alt="Asri Logo Loading"
          ></img>
        </Card> */}
        <Card sx={{ maxWidth: 355, scale: "80%" }}>
          <CardActionArea>
            <CardMedia
              sx={{
                paddingTop: "4px",
                marginBottom: "-15px",
                scale: "80%",
                paddingBottom: "-14px"
              }}
              component="img"
              image="https://www.ysraarogyasri.ap.gov.in/documents/d/guest/logo1"
              alt="asri_logo"
            />
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ ml: 29.5, mb: 2.2 }}
            >
              Loading
            </Typography>
            <CardContent>
              <div
                style={{
                  scale: "205%",
                  marginLeft: "100px",
                  marginTop: "1.5px"
                }}
                id="bars3"
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Backdrop>
    </div>
  );
}
