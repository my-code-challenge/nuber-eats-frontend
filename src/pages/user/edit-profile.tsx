import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { useMe } from "../../hooks/useMe";
import {
    editProfileMutation,
    editProfileMutationVariables,
} from "../../__generated__/editProfileMutation";

const EDIT_PROFILE_MUTATION = gql`
    mutation editProfileMutation($input: EditProfileInput!) {
        editProfile(input: $input) {
            ok
            error
        }
    }
`;

interface IFormProps {
    email?: string;
    password?: string;
}

export const EditProfile = () => {
    const client = useApolloClient();
    const { data: userData } = useMe();

    const onCompleted = (data: editProfileMutation) => {
        const {
            editProfile: { ok },
        } = data;
        if (ok) {
            // update the cache
        }
    };

    const [editProfile, { loading }] = useMutation<
        editProfileMutation,
        editProfileMutationVariables
    >(EDIT_PROFILE_MUTATION, {
        onCompleted,
    });

    const {
        register,
        handleSubmit,
        getValues,
        formState: { isValid },
    } = useForm<IFormProps>({
        mode: "onChange",
        defaultValues: {
            email: userData?.me.email,
        },
    });

    const onSubmit = () => {
        const { email, password } = getValues();

        editProfile({
            variables: {
                input: {
                    email,
                    ...(password !== "" && { password }),
                },
            },
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen mx-auto max-w-screen-xl">
            <h4 className="font-semibold text-2xl mb-3">프로필 수정</h4>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
            >
                <input
                    {...register("email", {
                        pattern: {
                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "이메일 형식이 아닙니다",
                        },
                    })}
                    className="input"
                    type="email"
                    placeholder="Email"
                />
                <input
                    {...register("password")}
                    className="input"
                    type="password"
                    placeholder="Password"
                />
                <Button loading={loading} canClick={isValid} actionText="변경하기" />
            </form>
        </div>
    );
};
