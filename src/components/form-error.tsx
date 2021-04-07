interface IProps {
    errorMessage: string;
}

export const FormError: React.FC<IProps> = ({ errorMessage }) => (
    <span className="error">{errorMessage}</span>
);
