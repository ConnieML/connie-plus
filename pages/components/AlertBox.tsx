import React from "react";
import { Alert } from "@twilio-paste/core";
import { Text } from "@twilio-paste/core";
import { Anchor } from "@twilio-paste/core/anchor";

function AlertBox() {
  return (
    <Alert variant="neutral">
      <Text as="p">
        <strong>Attention:</strong> This is a prototype. Send on any feedback to{" "}
        <Anchor href="mailto:cberno@asaging.org?subject=First%20Test%20-%20Feedback">
          Connie Care Team
        </Anchor>
      </Text>
    </Alert>
  );
}

export default AlertBox;
