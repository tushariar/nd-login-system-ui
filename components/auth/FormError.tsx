export default function FormError({ errors, field }: {
    errors: FormError[];
    field: string;
}) {
    const error = errors.find((error) => error.field === field);

    if (error) {
        return (
            <p className="text-red-500">
                {error.message}
            </p>
        );
    }
}
