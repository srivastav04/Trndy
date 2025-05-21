import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../apiFunctions";
import OrderCard from "../components/OrderCard";
import store from "../store"
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorComponent from "../components/ErrorComponent";
import EmptyComponent from "../components/EmptyComponent";

export default function OrdersPage() {
    const userId = store((s) => s.userId);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["orders"],
        queryFn: () => getOrders(userId)
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorComponent message={error.message} />;
    if (Array.isArray(data) && data.length === 0) return <EmptyComponent message="No orders found" subMessage={"Order history will be shown here"} />


    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((orderGroup) =>
                orderGroup.orders.map((order) => (
                    <OrderCard key={order._id} order={order} />
                ))
            )}
        </div>
    );
}
