import React, { Component } from "react";
import { Stack } from "@twilio-paste/stack";
import { Box } from "@twilio-paste/core";

export class Navgrid extends Component {
  render() {
    return (
      <Stack orientation="vertical">
        <Box
          as="nav"
          backgroundColor="colorBackground"
          height="100vh"
          padding="space30"
          position="relative"
          overflow="hidden"
        ></Box>
      </Stack>
    );
  }
}

export default Navgrid;
