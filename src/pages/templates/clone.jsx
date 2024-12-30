import { Box, Heading, Button, Flex } from "@chakra-ui/react";

import { IaChat } from "../../components/iaChat";
import { TemplateForm } from "./form";
import { TemplateService } from "../../services/template";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";

import { toast } from "sonner";

import { useParams } from "react-router-dom";

export function CloneTemplate() {
  const { id } = useParams();
  const {
    data: template,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["template", { id }],
    queryFn: async () => await TemplateService.getTemplate({ id }),
  });

  const { mutateAsync: cloneTemplateMutation } = useMutation({
    mutationFn: TemplateService.createTemplate,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-templates"],
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await cloneTemplateMutation({
        dados: {
          ...data,
          status: data.status[0],
        },
      });
      if (response.status === 201) {
        toast.success("Template criada com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao criar template!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="8">
        <Heading fontSize="2xl" color="orange.500">
          Clonar template
        </Heading>
        <Button type="submit" form="clone-template-form" colorPalette="cyan">
          Salvar
        </Button>
      </Flex>
      {!isLoading && template && (
        <TemplateForm
          data={template}
          onSubmit={onSubmit}
          formId="clone-template-form"
        />
      )}
      <IaChat />
    </Box>
  );
}
