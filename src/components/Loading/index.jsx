import React from "react";
import PropTypes from "prop-types";
import { Box, Container, LinearProgress } from "@material-ui/core";

LoadingPage.propTypes = {};

function LoadingPage(props) {
  return (
    <Box>
      <Container>
        <LinearProgress color="primary" />
      </Container>
    </Box>
  );
}

export default LoadingPage;
