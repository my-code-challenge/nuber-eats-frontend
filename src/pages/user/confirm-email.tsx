import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import { useMe } from "../../hooks/useMe";
import { useQueryString } from "../../hooks/useQueryString";
import {
    verifyEmailMutation,
    verifyEmailMutationVariables,
} from "../../__generated__/verifyEmailMutation";

const VERIFY_EMAIL_MUTATION = gql`
    mutation verifyEmailMutation($input: VerifyEmailInput!) {
        verifyEmail(input: $input) {
            ok
            error
        }
    }
`;

export const ConfirmEmail = () => {
    const history = useHistory();
    const code = useQueryString("code");
    const client = useApolloClient();
    const { data: userData } = useMe();

    const onCompleted = (data: verifyEmailMutation) => {
        const {
            verifyEmail: { ok },
        } = data;
        if (ok && userData) {
            /** caching[writeFragment] docs : https://www.apollographql.com/docs/react/caching/cache-interaction/ */
            client.writeFragment({
                id: `User:${userData.me.id}`,
                fragment: gql`
                    fragment VerifiedUser on User {
                        verified
                    }
                `,
                data: {
                    verified: true,
                },
            });
        }
    };

    const [verifyEmail, { loading: verifyEmailLoading }] = useMutation<
        verifyEmailMutation,
        verifyEmailMutationVariables
    >(VERIFY_EMAIL_MUTATION, {
        onCompleted,
    });

    useEffect(() => {
        if (!code) {
            alert("검증 실행전 문제가 발생했습니다");
        } else {
            verifyEmail({
                variables: {
                    input: {
                        code,
                    },
                },
            });
        }
        history.push("/");
    }, []);

    return (
        <div className="h-screen flex flex-col items-center justify-center ">
            <h2 className="text-xl mb-1 font-medium">이메일 검증중...</h2>
            <h4 className="text-gray-700 text-base">잠시만 기다려 주세요. 🍔</h4>
        </div>
    );
};
