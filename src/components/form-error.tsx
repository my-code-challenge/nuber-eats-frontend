interface IProps {
    errorMessage: string;
}

export const FormError: React.FC<IProps> = ({ errorMessage }) => (
    <span role="alert" className="error">
        {errorMessage}
    </span>
);
