import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";
import nuberLogo from "../images/eats-logo.svg";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

export const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput: LoginInput!) {
        login(input: $loginInput) {
            ok
            error
            token
        }
    }
`;

export interface ILoginForm {
    email: string;
    password: string;
}

const Login = () => {
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ILoginForm>({
        mode: "onChange",
    });
    const onCompleted = (data: loginMutation) => {
        const {
            login: { ok, token },
        } = data;
        if (ok && token) {
            localStorage.setItem(LOCALSTORAGE_TOKEN, token);
            authTokenVar(token);
            isLoggedInVar(true);
        }
    };
    const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
        loginMutation,
        loginMutationVariables
    >(LOGIN_MUTATION, {
        onCompleted,
    });
    const onSubmit = () => {
        if (!loading) {
            const { email, password } = getValues();
            loginMutation({
                variables: {
                    loginInput: {
                        email,
                        password,
                    },
                },
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Login | Nuber Eats</title>
            </Helmet>
            <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
                <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
                    <img src={nuberLogo} alt="nuberLogo" className="w-52 mb-10" />
                    <h4 className="w-full font-medium text-left text-xl mb-5">
                        돌아오신 것을 환영합니다
                    </h4>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 my-5 w-full">
                        <div className="flex flex-col">
                            <input
                                {...register("email", {
                                    required: "이메일 입력은 필수입니다",
                                    pattern: {
                                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "이메일 형식이 아닙니다",
                                    },
                                })}
                                type="email"
                                className="input"
                                placeholder="Email"
                            />
                            {errors.email?.message && (
                                <FormError errorMessage={errors.email.message} />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <input
                                {...register("password", {
                                    required: "비밀번호 입력은 필수입니다",
                                    // minLength: 10,
                                })}
                                type="password"
                                className="input"
                                placeholder="Password"
                            />
                            {errors.password?.message && (
                                <FormError errorMessage={errors.password.message} />
                            )}
                            {/* {errors.password?.type === "minLength" && (
                            <FormError errorMessage={"Password must be more than 10 chars."} />
                        )} */}
                        </div>
                        <Button
                            canClick={isValid}
                            loading={loading}
                            actionText={"Login"}
                            id="loginBtn"
                        />
                        {loginMutationResult?.login.error && (
                            <FormError errorMessage={loginMutationResult.login.error} />
                        )}
                    </form>
                    <div>
                        New to nuber?{" "}
                        <Link to="/create-account" className="text-lime-600 hover:underline">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
