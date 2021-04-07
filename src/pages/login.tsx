import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";

const LOGIN_MUTATION = gql`
    mutation PotatoMutation($email: String!, $password: String!) {
        login(input: { email: $email, passowrd: $password }) {
            ok
            error
            token
        }
    }
`;

interface ILoginForm {
    email: string;
    password: string;
}

export const Login = () => {
    const {
        register,
        getValues,
        formState: { errors },
        handleSubmit,
    } = useForm<ILoginForm>();
    const [loginMutation, { loading, error, data }] = useMutation<ILoginForm>(LOGIN_MUTATION);

    const onSubmit = () => {
        const { email, password } = getValues();
        loginMutation({
            variables: {
                email,
                password,
            },
        });
    };

    return (
        <span className="h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
                <h3 className="text-2xl text-gray-800">Log In</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 px-5">
                    <div className="flex flex-col">
                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            className="input"
                            placeholder="Email"
                        />
                        {errors.email?.message && <FormError errorMessage={errors.email.message} />}
                    </div>
                    <div className="flex flex-col">
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: 10,
                            })}
                            type="password"
                            className="input"
                            placeholder="Password"
                        />
                        {errors.password?.message && (
                            <FormError errorMessage={errors.password.message} />
                        )}
                        {errors.password?.type === "minLength" && (
                            <FormError errorMessage={"Password must be more than 10 chars."} />
                        )}
                    </div>
                    <button type="submit" className="mt-3 btn">
                        Login
                    </button>
                </form>
            </div>
        </span>
    );
};
