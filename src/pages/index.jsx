import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col } from "react-awesome-styled-grid";
import { FaSpotify } from "react-icons/fa";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { H1, H2, H3 } from "../components/Headings";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Pineapple from "../components/Pineapple";

const Home = () => {
  const [spotifyUser] = useLocalStorage("spotify_user");

  const goToSpotifyLogin = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${
      process.env.ClientID
    }&response_type=code&redirect_uri=${encodeURIComponent(
      process.env.BASE_URL
    )}/auth&scope=user-read-private user-read-email user-read-playback-state user-read-currently-playing`;
  };

  return (
    <Container>
      <Row justify="center">
        <Col align="center">
          <Pineapple type="listen" width={200} />
          <H1>Spotify widget for OBS</H1>
        </Col>

        {!spotifyUser && (
          <Col align="center" xs={4}>
            <div style={{ padding: "24px 0" }}>
              <Button onClick={goToSpotifyLogin}>
                <FaSpotify style={{ marginRight: 8 }} />
                <span>Login with spotify</span>
              </Button>
            </div>
          </Col>
        )}
      </Row>
      <Row>
        <Col align="flex-start" xs={0.5}>
          <Pineapple type="idea" width={48} />
        </Col>
        <Col justify="center">
          <H2>O que é?</H2>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            Um widget que mostra a que está tocando atualmente no seu spotify.
            Foi construído para ser utilizado com o OBS Studio ou Streamlabs OBS
            (ou outro aplicativo de broadcast que aceite fontes de url). Desta
            forma, quem está assistindo sua live, sabe que música está tocando.
          </p>
        </Col>
      </Row>
      <Row>
        <Col align="flex-start" xs={0.5}>
          <Pineapple type="cool" width={48} />
        </Col>
        <Col justify="center">
          <H2>Exemplo de widget</H2>
        </Col>
      </Row>
      <Row>
        <Col align="center" xs={4}>
          <Link href={`/current/${spotifyUser}`}>
            <a>
              <img style={{ width: "100%" }} src="/widget.png" />
            </a>
          </Link>
        </Col>
      </Row>

      {spotifyUser && (
        <>
          <Row>
            <Col align="flex-start" xs={0.5}>
              <Pineapple type="laptop" width={48} />
            </Col>
            <Col justify="center">
              <H2>Seu link</H2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link href={`/current/${spotifyUser}`}>
                <a>{`${process.env.BASE_URL}/current/${spotifyUser}`}</a>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col align="flex-start" xs={0.5}>
              <Pineapple type="student" width={48} />
            </Col>
            <Col justify="center">
              <H2>Instruções</H2>
            </Col>
          </Row>
          <Row>
            <Col>
              <H3>OBS studio/Streamlabs OBS</H3>
              <p>
                Basta adicionar uma fonte do tipo "browser" com sua url.
                Recomendo o tamanho de 450px por 150px. Depois basta
                redimensionar e posicionar onde quiser.
              </p>
            </Col>
          </Row>
        </>
      )}
      <Footer />
    </Container>
  );
};

export default Home;
