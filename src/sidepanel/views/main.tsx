import React from "react";
import { Container, EmptyState, OverlaySpinner, Text } from "react-ck";

export const MainView = (): React.ReactElement => (
  <Container spacingY>
    <Text variation="h1">AI CoSearch</Text>
    <Text>Use the browser normally and additional information will be presented here</Text>
    <OverlaySpinner.Container>
      <OverlaySpinner active />
      <Text>Use the browser normally and additional information will be presented here</Text>
    </OverlaySpinner.Container>
    <EmptyState>
      Use the browser normally and additional information will be presented here
    </EmptyState>
  </Container>
);
