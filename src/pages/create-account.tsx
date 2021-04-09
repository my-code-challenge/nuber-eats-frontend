import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import nuberLogo from "../images/eats-logo.svg";
import { Button } from "../components/Button";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { UserRole } from "../__generated__/globalTypes";
import {
    createAccountMutation,
    createAccountMutationVariables,
} from "../__generated__/createAccountMutation";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
        createAccount(input: $createAccountInput) {
            ok
            error
        }
    }
`;

interface ICreateAccountForm {
    email: string;
    password: string;
    role: UserRole;
}

export const CreateAccount = () => {
    const history = useHistory();
    const {
        register,
        getValues,
        watch,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm<ICreateAccountForm>({ mode: "onChange", defaultValues: { role: UserRole.Client } });

    const onCompleted = ({ createAccount: { ok } }: createAccountMutation) => {
        if (ok) {
            alert("Account Create! Login now!");
            history.push("/login");
        }
    };

    const [createAccountMutation, { loading, data: createAccountMutationResult }] = useMutation<
        createAccountMutation,
        createAccountMutationVariables
    >(CREATE_ACCOUNT_MUTATION, { onCompleted });

    const onSubmit = () => {
        if (!loading) {
            const { email, password, role } = getValues();
            createAccountMutation({
                variables: {
                    createAccountInput: { email, password, role },
                },
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Create Account | Nuber Eats</title>
            </Helmet>
            <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
                <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
                    <img src={nuberLogo} alt="nuberLogo" className="w-52 mb-10" />
                    <h4 className="w-full font-medium text-left text-xl mb-5">시작하기</h4>
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
                                autoComplete="off"
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
                        <select {...register("role", { required: true })} className="input">
                            {Object.keys(UserRole).map((role, index) => (
                                <option key={`role-${index}`}>{role}</option>
                            ))}
                        </select>
                        <Button canClick={isValid} loading={loading} actionText={"회원가입"} />
                        {createAccountMutationResult?.createAccount.error && (
                            <FormError
                                errorMessage={createAccountMutationResult.createAccount.error}
                            />
                        )}
                    </form>
                    <div>
                        Already have an account?{" "}
                        <Link to="/login" className="text-lime-600 hover:underline">
                            🚀Login Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
