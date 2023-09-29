import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";

import { SubmitHandler, useForm } from "react-hook-form";

import { parseCookies } from "nookies";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Flex, Stack } from "@chakra-ui/react";

import Input from "../components/Form/input";

import { useAuth } from "../contexts/hooks/useAuth";
import { withSSRGuest } from "../utils/withSSRGuest";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("digite um email"),
  password: yup.string().required("Senha obrigatória"),
});

export const getServerSideProps = withSSRGuest(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  }
);

const SignIn: NextPage = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { signIn } = useAuth();

  const handleSignIn: SubmitHandler<SignInFormData> = async ({
    email,
    password,
  }) => {
    await signIn({ email, password });
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          maxW="360px"
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              name="email"
              label="E-mail"
              type="email"
              error={formState.errors.email}
              {...register("email")}
            />
            <Input
              name="password"
              label="Senha"
              type="password"
              error={formState.errors.password}
              {...register("password")}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default SignIn;
