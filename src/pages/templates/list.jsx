import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
  Text,
} from "@chakra-ui/react";

import { FilePenLine, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TemplateService } from "../../services/template";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "../../config/react-query";

export function ListTemplates() {
  const navigate = useNavigate();

  const {
    data: templates,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["list-templates"],
    queryFn: TemplateService.listTemplates,
  });

  const { mutateAsync: deleteTemplateMutation } = useMutation({
    mutationFn: TemplateService.deleteTemplete,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["list-templates"],
      });
    },
  });

  const onDelete = async (id) => {
    try {
      const response = await deleteTemplateMutation({ id });
      if (response.status === 204) {
        toast.success("Include deletada com sucesso");
      }
    } catch (error) {
      console.log(error);

      toast.error("Erro ao deletar include!");
    }
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading fontSize="2xl" color="orange.500">
          Templates
        </Heading>
        <Button
          onClick={() => navigate("/templates/create")}
          colorPalette="cyan"
        >
          Criar template
        </Button>
      </Flex>

      <Box mt="8">
        {isLoading && <Text>Listando templates...</Text>}
        {!isLoading && error && <Text>Ouve um erro ao listar templates!</Text>}
        {!isLoading && !error && templates.length == 0 && (
          <Text>Não foram encontradas templates</Text>
        )}
        {!isLoading && templates && templates.length > 0 && (
          <Table.Root variant="line" striped>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Nome</Table.ColumnHeader>
                <Table.ColumnHeader>Conteúdo</Table.ColumnHeader>
                <Table.ColumnHeader>Descrição</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {templates.map((template) => (
                <Table.Row key={template._id}>
                  <Table.Cell>{template.nome}</Table.Cell>
                  <Table.Cell>{template.descricao}</Table.Cell>
                  <Table.Cell>{template.templateEjs}</Table.Cell>
                  <Table.Cell>{template.status}</Table.Cell>
                  <Table.Cell placeItems="end">
                    <Flex gap="4">
                      <IconButton
                        onClick={() => navigate(`/template/${template._id}`)}
                        colorPalette="cyan"
                        size="xs"
                      >
                        <FilePenLine />
                      </IconButton>
                      <IconButton
                        onClick={() => onDelete(template._id)}
                        colorPalette="red"
                        size="xs"
                      >
                        <Trash2 />
                      </IconButton>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Box>
    </Box>
  );
}
