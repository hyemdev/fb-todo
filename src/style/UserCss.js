import styled from "@emotion/styled";

const SignUpDiv = styled.div`
    form {
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        margin: 0 auto;
        gap: 10px 0;
        label {
            display: block;
            width: 30%;
            font-weight: 700;
        }
        input {
            display: block;
            width: 70%;
            border: 1px solid #e2e2e2;
        }
        .btn-list {
            display: flex;
            justify-content: center;
            gap: 10px;
            text-align: center;
        }
    }
`;

export const LoginDiv = styled.div`
    form {
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        margin: 0 auto;
        gap: 10px 0;
        label {
            display: block;
            width: 30%;
            font-weight: 700;
        }
        input {
            display: block;
            width: 70%;
            border: 1px solid #e2e2e2;
        }
        .btn-list {
            display: flex;
            justify-content: center;
            gap: 10px;
            text-align: center;
        }
    }
`;
export const MyPageDiv = styled.div`
    form {
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: 0 auto;
        gap: 10px 0;
        div {
            display: flex;
            justify-content: flex-start;
            gap: 10px;
            label {
                display: block;
                width: 30%;
                font-weight: 700;
            }
            input {
                display: block;
                width: 60%;
                border: 1px solid #e2e2e2;
            }

            button {
            }
        }
    }
`;
export default SignUpDiv;
