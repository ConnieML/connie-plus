import React, { Component } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeader,
  ModalHeading
} from "@twilio-paste/core/modal";

export class UsageNoteModal extends Component {
  render() {
    return (
      <Modal
        ariaLabelledby={modalHeadingID}
        isOpen={isOpen}
        onDismiss={handleClose}
        size="default"
      >
        <ModalHeader>
          <ModalHeading as="h3" id={modalHeadingID}>
            Create new project
          </ModalHeading>
        </ModalHeader>
        <ModalBody>
          <Paragraph>
            Create a new Project within your Organization. Please contact your
            account representative to configure invoicing.
          </Paragraph>
          <Label htmlFor={projectInputID}>Project Name</Label>
          <Input
            onChange={(e) => setProjectName(e.currentTarget.value)}
            id={projectInputID}
            type="text"
            value={projectName}
          />
        </ModalBody>
        <ModalFooter>
          <ModalFooterActions>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary">Submit</Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>
    );
  }
}
