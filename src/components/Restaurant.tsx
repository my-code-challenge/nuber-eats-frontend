interface IRestaurantProps {
    id: number;
    coverImage: string;
    name: string;
    categoryName?: string;
}

const Restaurant: React.FC<IRestaurantProps> = ({ id, coverImage, name, categoryName }) => {
    return (
        <div className="flex flex-col">
            <div
                className="py-28 mb-3 bg-cover bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${coverImage})`,
                }}
            />
            <h3 className="text-xl font-medium">{name}</h3>
            <span className="border-t mt-2 py-2 text-xs opacity-50 border-gray-400">
                {categoryName}
            </span>
        </div>
    );
};

export default Restaurant;
