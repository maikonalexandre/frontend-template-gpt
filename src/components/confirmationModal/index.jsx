import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";

import { Button, Heading } from "@chakra-ui/react";

export const ConfirmationModal = ({
  visible,
  title,
  description,
  handleConfirm,
  handleClose,
}) => {
  return (
    <DialogRoot placement="center" lazyMount open={visible}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Heading>{title}</Heading>
          </DialogTitle>
        </DialogHeader>
        <DialogBody fontSize="md">{description}</DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              onClick={handleClose}
              fontWeight="semibold"
              fontSize="md"
              colorPalette="red"
            >
              Cancelar
            </Button>
          </DialogActionTrigger>
          <Button
            onClick={handleConfirm}
            fontWeight="semibold"
            fontSize="md"
            colorPalette="cyan"
          >
            Confirmar
          </Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={handleClose} />
      </DialogContent>
    </DialogRoot>
  );
};