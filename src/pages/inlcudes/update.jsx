import { Box, Heading, Button, Flex } from "@chakra-ui/react";

import { IaChat } from "../../components/iaChat";
import { IncludeForm } from "./form";
import { IncludeService } from "../../services/include";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";

import { toast } from "sonner";

import { useParams } from "react-router-dom";

export function UpdateInclude() {
  const { id } = useParams();
  const {
    data: include,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["include", { id }],
    queryFn: async () => await IncludeService.getInclude({ id }),
  });

  const { mutateAsync: updateIncludeMutation } = useMutation({
    mutationFn: IncludeService.updateInclude,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-includes"],
      });
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await updateIncludeMutation({
        id,
        dados: {
          ...data,
          status: data.status[0],
        },
      });
      if (response) {
        toast.success("Include atualizar com sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar include!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Detalhes do include
        </Heading>
        <Button type="submit" form="update-include-form" colorPalette="cyan">
          Atualizar
        </Button>
      </Flex>
      {!isLoading && include && (
        <IncludeForm
          data={include}
          onSubmit={onSubmit}
          formId="update-include-form"
        />
      )}
      <IaChat />
    </Box>
  );
}
