import { useQuery } from "react-query";

const useTickets = () => {
    const tickets = window.tickets;
    return useQuery(
        "tickets",
        async () => {
            const result = await tickets.tickets.findMany();
            return result;
        },
        {
            initialData: []
        }
    );
};


export { useTickets };