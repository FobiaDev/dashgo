import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { SubmitHandler, useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";

import { mirageapi, setupAPIClient } from "../../services/api";

import { queryClient } from "../../services/queryClient";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Input from "../../components/Form/input";
import { withSSRAuth } from "../../utils/withSSRAuth";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("digite um email"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No minimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export const getServerSideProps = withSSRAuth(
  async (context) => {
    return {
      props: {},
    };
  },
  {
    permissions: ["metrics.list"],
    roles: ["administrator"],
  }
);

const CreateUser: NextPage = () => {
  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await mirageapi.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (user) => {
    await createUser.mutateAsync(user);

    router.push("/users");
  };

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>

      <Box>
        <Header />

        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
          <Sidebar />

          <Box
            flex="1"
            borderRadius={8}
            bg="gray.800"
            p={["6", "8"]}
            as="form"
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <Heading size="lg" fontWeight="normal">
              Criar usuário
            </Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input
                  name="name"
                  label="Nome completo"
                  {...register("name")}
                  error={formState.errors.name}
                />
                <Input
                  name="email"
                  type="email"
                  label="E-mail"
                  {...register("email")}
                  error={formState.errors.email}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input
                  name="password"
                  type="password"
                  label="Senha"
                  {...register("password")}
                  error={formState.errors.password}
                />
                <Input
                  name="password_confirmation"
                  type="password"
                  label="Confirmação da senha"
                  {...register("password_confirmation")}
                  error={formState.errors.password_confirmation}
                />
              </SimpleGrid>
            </VStack>
            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha">
                    Cancelar
                  </Button>
                </Link>
                <Button
                  colorScheme="pink"
                  type="submit"
                  isLoading={formState.isSubmitting}
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default CreateUser;
